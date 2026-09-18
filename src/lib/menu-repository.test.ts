import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { menuRepository } from '@/lib/menu-repository'

describe('menuRepository', () => {
  it('exposes the declared menu categories', () => {
    expect(menuRepository.getCategories()).toHaveLength(5)
    expect(menuRepository.getCategories()[0]).toMatchObject({
      id: 'cocktails',
      name: 'Cócteles',
    })
  })

  it('exposes products linked to declared categories', () => {
    const categories = new Set(
      menuRepository.getCategories().map((category) => category.id),
    )

    expect(menuRepository.getProducts()).toHaveLength(95)
    expect(
      menuRepository
        .getProducts()
        .every((product) => categories.has(product.categoryId)),
    ).toBe(true)
  })

  it('returns only products for the requested category', () => {
    const products = menuRepository.getProductsByCategory('extras')

    expect(products.length).toBeGreaterThan(0)
    expect(products.every((product) => product.categoryId === 'extras')).toBe(true)
  })

  it('keeps liquor presentations together', () => {
    const liquorIds = menuRepository
      .getProductsByCategory('licores')
      .map((product) => product.id)

    expect(liquorIds.indexOf('botella-buchanans-deluxe')).toBe(
      liquorIds.indexOf('media-buchanans-deluxe') - 1,
    )
    expect(liquorIds.indexOf('botella-aguardiente-azul')).toBe(0)

    expect(
      menuRepository.getProducts().filter((product) =>
        ['litro-aguardiente-azul', 'litro-aguardiente-rojo'].includes(product.id),
      ),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'litro-aguardiente-azul',
          price: 140000,
          image: '/images/products/litro-aguardiente-azul.webp',
        }),
        expect.objectContaining({
          id: 'litro-aguardiente-rojo',
          price: 140000,
          image: '/images/products/litro-aguardiente-rojo.webp',
        }),
      ]),
    )
  })

  it('allows pending products without a price', () => {
    const lycheeMartini = menuRepository
      .getProducts()
      .find((product) => product.id === 'lychee-martini')

    expect(lycheeMartini).toMatchObject({ available: false })
    expect(lycheeMartini?.price).toBeUndefined()
  })

  it('keeps a price on every available product', () => {
    expect(
      menuRepository
        .getProducts()
        .filter((product) => product.available)
        .every((product) => product.price !== undefined),
    ).toBe(true)
  })

  it('maps every product image to a public asset', () => {
    const productsWithImages = menuRepository
      .getProducts()
      .filter((product) => product.image)

    expect(
      productsWithImages.every((product) =>
        existsSync(join(process.cwd(), 'public', product.image!.slice(1))),
      ),
    ).toBe(true)
  })
})
