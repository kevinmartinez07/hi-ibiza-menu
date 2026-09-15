export function Hero() {
  return (
    <header className='hero' aria-labelledby='hero-title'>
      <img
        className='hero-image'
        src='/images/hero/hi-ibiza-hero.jpg'
        alt='Cóctel de frutos rojos en el bar HI Ibiza'
        width={1408}
        height={912}
        fetchPriority='high'
      />
      <div className='hero-overlay' aria-hidden='true' />
      <div className='hero-content'>
        <h1 id='hero-title' className='sr-only'>
          HI Ibiza Cocktails
        </h1>
        <img
          className='hero-brand'
          src='/images/brand/hi-ibiza-logo.png'
          alt='HI Ibiza Cocktails'
          width={1889}
          height={633}
        />
        <p className='eyebrow'>Barrio Obrero · Castilla</p>
        <p className='hero-copy'>Vive la noche. Disfruta el momento.</p>
      </div>
    </header>
  )
}
