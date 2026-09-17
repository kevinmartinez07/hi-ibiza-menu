import { ArrowDown } from 'lucide-react'

export function Header() {
  return (
    <header className='site-header'>
      <a className='brand-mark' href='#top' aria-label='Ir al inicio de HI Ibiza'>
        <img src='/images/brand/hi-ibiza-logo.webp' alt='' aria-hidden='true' />
      </a>
      <a className='header-link' href='#menu'>
        Ver carta <ArrowDown size={14} aria-hidden='true' />
      </a>
    </header>
  )
}
