import { menuCategories, menuProducts } from '@/data/menu'
import type { MenuCategory, MenuProduct } from '@/domain/menu'

export const menuRepository = {
  getCategories(): MenuCategory[] {
    return menuCategories
  },

  getProducts(): MenuProduct[] {
    return menuProducts
  },
}
