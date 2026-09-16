import { siteConfig } from '@/data/site'
import { Clock3, Instagram, MapPin } from 'lucide-react'
import { menuCategories } from '@/data/menu'

export function Footer() {
  return (
    <footer className='site-footer'>
      <div className='footer-main'>
        <div className='footer-brand'>
          <p className='footer-eyebrow'>Nos vemos de noche</p>
          <p className='footer-kicker'>{siteConfig.name}</p>
          <p className='footer-tagline'>{siteConfig.tagline}</p>
          <a
            className='footer-social'
            href={siteConfig.instagram.href}
            target='_blank'
            rel='noreferrer'
            aria-label={siteConfig.instagram.label}
          >
            <span className='footer-social-icon' aria-hidden='true'>
              <Instagram size={18} strokeWidth={1.8} />
            </span>
            <span>{siteConfig.instagram.label.replace('Instagram · ', '')}</span>
          </a>
        </div>
        <div className='footer-column'>
          <p className='footer-section-title'>Explora la carta</p>
          <nav className='footer-nav' aria-label='Secciones del menú'>
            {menuCategories.map((category) => (
              <a href={`#${category.id}`} key={category.id}>
                {category.name}
              </a>
            ))}
          </nav>
        </div>
        <div className='footer-column'>
          <p className='footer-section-title'>Encuéntranos</p>
          <div className='footer-details'>
            {siteConfig.locations.map((location) => (
              <a
                className='footer-location'
                href={location.href}
                key={location.name}
                target='_blank'
                rel='noreferrer'
              >
                <MapPin size={16} aria-hidden='true' />
                <span>{location.name}</span>
              </a>
            ))}
            <span className='footer-hours'>
              <Clock3 size={16} aria-hidden='true' />
              <span>{siteConfig.openingHours}</span>
            </span>
          </div>
        </div>
      </div>
      <p className='footer-note'>Jue — Dom · La noche empieza a las 5 PM</p>
    </footer>
  )
}
