export type MenuCategoryId = 'cocktails' | 'cervezas' | 'licores' | 'bebidas' | 'extras'

export type MenuCategory = {
  id: MenuCategoryId
  name: string
  order: number
}

export type MenuProduct = {
  id: string
  categoryId: MenuCategoryId
  name: string
  description?: string
  price?: number
  unit?: string
  image?: string
  featured?: boolean
  available: boolean
}
