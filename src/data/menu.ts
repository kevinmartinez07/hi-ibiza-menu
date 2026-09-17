import type { MenuProduct } from '@/domain/menu'
import { menuCategories } from '@/data/menu-categories'
import { beerProducts } from '@/data/menu-beers'
import { beverageProducts } from '@/data/menu-beverages'
import { cocktailProducts } from '@/data/menu-cocktails'
import { extraProducts } from '@/data/menu-extras'
import { liquorProducts } from '@/data/menu-liquors'
import { menuImages } from '@/data/menu-images'

export { menuCategories }

const catalogProducts: MenuProduct[] = [
  ...cocktailProducts,
  ...beerProducts,
  ...liquorProducts,
  ...beverageProducts,
  ...extraProducts,
]

export const menuProducts: MenuProduct[] = catalogProducts.map((product) => ({
  ...product,
  image: menuImages[product.id] ?? product.image,
}))
