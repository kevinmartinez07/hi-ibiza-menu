import type { MenuCategory, MenuProduct } from '@/domain/menu'
import { ProductCard } from '@/components/ProductCard'

type MenuSectionProps = {
  category: MenuCategory
  products: MenuProduct[]
}

export function MenuSection({ category, products }: MenuSectionProps) {
  const featuredProduct = products.find((product) => product.featured)
  const regularProducts = products.filter((product) => !product.featured)

  return (
    <section
      className='menu-section'
      id={category.id}
      aria-labelledby={`${category.id}-title`}
    >
      <div className='section-heading'>
        <span className='section-number'>
          {String(category.order).padStart(2, '0')}
        </span>
        <h2 id={`${category.id}-title`}>{category.name}</h2>
        <span className='heading-line' aria-hidden='true' />
      </div>
      {featuredProduct ? <ProductCard product={featuredProduct} /> : null}
      <div className='menu-list'>
        {regularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
