import type { MenuProduct } from '@/domain/menu'
import { liquorBottleProducts } from '@/data/menu-liquors-bottles'
import { liquorServingProducts } from '@/data/menu-liquors-servings'

const liquorProductOrder = [
  'botella-aguardiente-azul',
  'garrafa-aguardiente-azul',
  'media-aguardiente-azul',
  'litro-aguardiente-azul',
  'botella-aguardiente-manzanares',
  'garrafa-aguardiente-manzanares',
  'litro-aguardiente-manzanares',
  'media-aguardiente-manzanares',
  'media-aguardiente-nectar',
  'botella-aguardiente-real-amarillo',
  'botella-aguardiente-rojo',
  'garrafa-aguardiente-rojo',
  'media-aguardiente-rojo',
  'litro-aguardiente-rojo',
  'botella-aguardiente-verde',
  'garrafa-aguardiente-verde',
  'litro-aguardiente-verde',
  'media-aguardiente-verde',
  'botella-baileys',
  'media-baileys',
  'botella-buchanans-deluxe',
  'media-buchanans-deluxe',
  'botella-buchanans-master',
  'botella-don-julio-70-anos',
  'botella-don-julio-blanco',
  'botella-jack-daniels',
  'media-jack-daniels',
  'botella-jagermeister',
  'media-jagermeister',
  'botella-old-parr',
  'media-old-parr',
  'botella-ron-15-anos',
  'botella-ron-5-anos',
  'media-ron-5-anos',
  'botella-ron-8-anos',
  'media-ron-8-anos',
  'botella-ron-esencial',
  'garrafa-ron-esencial',
  'media-ron-esencial',
  'botella-ron-tradicional',
  'garrafa-ron-tradicional',
  'media-ron-tradicional',
  'botella-tequila-herradura',
  'botella-tequila-jimador-reposado',
  'botella-tequila-jose-cuervo',
  'media-tequila-jose-cuervo',
  'botella-vodka-absolut',
  'botella-vodka-smirnoff-lulo',
  'smirnoff-manzana-verde-personal',
  'smirnoff-rojo-personal',
  'tequila-clase-azul',
] as const

const allLiquorProducts = [...liquorBottleProducts, ...liquorServingProducts]
const productsById = new Map(allLiquorProducts.map((product) => [product.id, product]))

export const liquorProducts: MenuProduct[] = liquorProductOrder.flatMap((id) => {
  const product = productsById.get(id)
  return product ? [product] : []
})
