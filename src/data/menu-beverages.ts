import type { MenuProduct } from '@/domain/menu'

export const beverageProducts: MenuProduct[] = [
  { id: 'agua', categoryId: 'bebidas', name: 'Agua', price: 5000, available: true },
  {
    id: 'electrolit',
    categoryId: 'bebidas',
    name: 'Electrolit',
    price: 15000,
    available: true,
  },
  {
    id: 'gaseosa',
    categoryId: 'bebidas',
    name: 'Gaseosa',
    price: 5000,
    available: true,
  },
  {
    id: 'gatorade',
    categoryId: 'bebidas',
    name: 'Gatorade',
    price: 10000,
    image: '/images/products/gatorade.webp',
    available: true,
  },
  {
    id: 'micheladas-saborizadas',
    categoryId: 'bebidas',
    name: 'Micheladas Saborizadas',
    price: 12000,
    available: true,
  },
  {
    id: 'red-bull',
    categoryId: 'bebidas',
    name: 'Red Bull',
    price: 15000,
    image: '/images/products/redbull.webp',
    available: true,
  },
  { id: 'soda', categoryId: 'bebidas', name: 'Soda', price: 5000, available: true },
  {
    id: 'soda-michelada',
    categoryId: 'bebidas',
    name: 'Soda Michelada',
    price: 10000,
    available: true,
  },
  {
    id: 'sodas-saborizadas',
    categoryId: 'bebidas',
    name: 'Sodas Saborizadas',
    description: 'Sandía, cereza, mango biche, maracuyá y lychee',
    price: 10000,
    available: true,
  },
]
