import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { menuRepository } from '@/lib/menu-repository'

describe('menuRepository', () => {
  it('exposes the declared menu categories', () => {
    expect(menuRepository.getCategories()).toHaveLength(6)
    expect(menuRepository.getCategories()[0]).toMatchObject({
      id: 'cocktails',
      name: 'Cocktails',
    })
  })

  it('exposes products linked to declared categories', () => {
    const categories = new Set(
      menuRepository.getCategories().map((category) => category.id),
    )

    expect(menuRepository.getProducts()).toHaveLength(43)
    expect(
      menuRepository
        .getProducts()
        .every((product) => categories.has(product.categoryId)),
    ).toBe(true)
  })

  it('returns only products for the requested category', () => {
    const products = menuRepository.getProductsByCategory('combos')

    expect(products.length).toBeGreaterThan(0)
    expect(products.every((product) => product.categoryId === 'combos')).toBe(true)
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
