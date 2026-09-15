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
})
