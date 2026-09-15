export function Header() {
  return (
    <header className='site-header'>
      <a className='brand-mark' href='#top' aria-label='Ir al inicio de HI Ibiza'>
        <img src='/images/brand/hi-ibiza-logo.png' alt='HI Ibiza Cocktails' />
      </a>
      <a className='header-link' href='#menu'>
        Ver carta <span aria-hidden='true'>↓</span>
      </a>
    </header>
  )
}
