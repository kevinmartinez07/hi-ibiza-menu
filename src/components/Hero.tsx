import { siteConfig } from '@/data/site'

export function Hero() {
  return (
    <section className='hero' aria-labelledby='hero-title'>
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
          {siteConfig.name}
        </h1>
        <img
          className='hero-brand'
          src='/images/brand/hi-ibiza-logo.webp'
          alt=''
          aria-hidden='true'
          width={1889}
          height={633}
        />
        <p className='eyebrow'>{siteConfig.locationsLabel}</p>
        <p className='hero-copy'>{siteConfig.heroCopy}</p>
      </div>
    </section>
  )
}
