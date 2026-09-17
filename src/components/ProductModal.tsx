import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { MenuProduct } from '@/domain/menu'
import { formatPrice } from '@/lib/format-price'

type ProductModalProps = {
  product: MenuProduct
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const isClosingRef = useRef(false)
  const onCloseRef = useRef(onClose)
  const previousBodyOverflow = useRef('')
  const [isClosing, setIsClosing] = useState(false)
  onCloseRef.current = onClose

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return

    isClosingRef.current = true
    setIsClosing(true)
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    closeTimerRef.current = window.setTimeout(
      () => onCloseRef.current(),
      prefersReducedMotion ? 0 : 180,
    )
  }, [])

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    previousBodyOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
      document.body.style.overflow = previousBodyOverflow.current
    }
  }, [requestClose])

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (!focusableElements?.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      className={`product-modal-backdrop${isClosing ? ' is-closing' : ''}`}
      role='presentation'
      onClick={requestClose}
    >
      <section
        ref={modalRef}
        className={`product-modal${isClosing ? ' is-closing' : ''}`}
        role='dialog'
        aria-modal='true'
        aria-labelledby='product-modal-title'
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        <button
          ref={closeButtonRef}
          className='product-modal-close'
          type='button'
          aria-label='Cerrar detalle del producto'
          onClick={requestClose}
        >
          <X size={22} aria-hidden='true' />
        </button>
        {product.image ? (
          <div className='product-modal-media'>
            <img src={product.image} alt={product.name} />
          </div>
        ) : null}
        <div className='product-modal-details'>
          <p className='featured-label'>Detalle del producto</p>
          <h2 id='product-modal-title'>{product.name}</h2>
          {product.price !== undefined ? (
            <p className='product-modal-price'>{formatPrice(product.price)}</p>
          ) : null}
          {product.unit ? <p className='product-modal-unit'>{product.unit}</p> : null}
          {product.description ? (
            <p className='product-modal-description'>{product.description}</p>
          ) : null}
          {!product.available ? <p className='availability'>No disponible</p> : null}
        </div>
      </section>
    </div>
  )
}
