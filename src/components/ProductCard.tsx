import type { MenuProduct } from '@/domain/menu'
import { formatPrice } from '@/lib/format-price'

type ProductCardProps = {
  product: MenuProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const content = (
    <>
      <div className='product-heading'>
        <h3>{product.name}</h3>
        <p className='product-price'>{formatPrice(product.price)}</p>
      </div>
      <p className='product-description'>{product.description}</p>
      {!product.available ? <span className='availability'>No disponible</span> : null}
    </>
  )

  if (!product.image) {
    return <article className='menu-row'>{content}</article>
  }

  if (product.featured) {
    return (
      <article className='featured-drink'>
        <img
          src={product.image}
          alt={product.name}
          width={1200}
          height={912}
          loading='lazy'
        />
        <div className='featured-overlay' aria-hidden='true' />
        <div className='featured-info'>
          <p className='featured-label'>Signature cocktail</p>
          {content}
        </div>
      </article>
    )
  }

  return (
    <article className='product-card'>
      <img
        className='product-card-bg'
        src={product.image}
        alt=''
        aria-hidden='true'
        width={1200}
        height={900}
        loading='lazy'
      />
      <img
        className='product-card-img'
        src={product.image}
        alt={product.name}
        width={1200}
        height={900}
        loading='lazy'
      />
      <div className='featured-overlay' aria-hidden='true' />
      <div className='featured-info'>{content}</div>
    </article>
  )
}
