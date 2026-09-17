export const siteConfig = {
  name: 'HI Ibiza Cocktails',
  menuIntro: 'Nuestra carta',
  search: {
    label: 'Buscar productos en la carta',
    placeholder: 'Buscar productos',
    clearLabel: 'Limpiar búsqueda',
    emptyMessage: (query: string) => `No encontramos productos con “${query}”.`,
  },
  heroCopy: 'Vive la noche. Disfruta el momento.',
  tagline: 'Donde cada noche tiene su propio brillo.',
  locations: [
    {
      name: 'Barrio Obrero',
      href: 'https://www.google.com/maps/search/?api=1&query=HI+Ibiza+Barrio+Obrero',
    },
    {
      name: 'Castilla',
      href: 'https://www.google.com/maps/search/?api=1&query=HI+Ibiza+Castilla',
    },
  ],
  locationsLabel: 'Barrio Obrero · Castilla',
  instagram: {
    label: 'Instagram · @hi_ibiza_cocktails',
    href: 'https://www.instagram.com/hi_ibiza_cocktails/',
  },
  openingHours: 'Jue — Dom · 5 PM a 4 AM',
} as const
