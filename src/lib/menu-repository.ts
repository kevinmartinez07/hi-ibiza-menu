import { menuCategories, menuProducts } from '@/data/menu'
import type { MenuCategory, MenuCategoryId, MenuProduct } from '@/domain/menu'

export const menuRepository = {
  getCategories(): readonly MenuCategory[] {
    return menuCategories
  },

  getProducts(): readonly MenuProduct[] {
    return menuProducts
  },

  getProductsByCategory(categoryId: MenuCategoryId): readonly MenuProduct[] {
    return menuProducts.filter((product) => product.categoryId === categoryId)
  },
}
