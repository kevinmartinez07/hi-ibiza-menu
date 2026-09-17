import type { MenuProduct } from '@/domain/menu'

export const extraProducts: MenuProduct[] = [
  {
    id: 'bonfiest',
    categoryId: 'extras',
    name: 'Bonfiest',
    price: 10000,
    available: true,
  },
  { id: 'halls', categoryId: 'extras', name: 'Halls', price: 5000, available: true },
  {
    id: 'salchicha-zenu',
    categoryId: 'extras',
    name: 'Salchicha Zenú',
    price: 9000,
    available: true,
  },
  {
    id: 'trident',
    categoryId: 'extras',
    name: 'Trident',
    price: 5000,
    available: true,
  },
  { id: 'vape', categoryId: 'extras', name: 'Vape', price: 60000, available: true },
]
