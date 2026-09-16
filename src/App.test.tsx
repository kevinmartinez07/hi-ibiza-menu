import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '@/App'

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('renders the HI Ibiza heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /hi ibiza cocktails/i }),
    ).toBeInTheDocument()
  })

  it('renders the menu navigation and all categories', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /categorías del menú/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^Cocktails$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Cervezas' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Licores' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Botellas' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Combos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sin alcohol' })).toBeInTheDocument()
  })

  it('renders the site header and menu call to action', () => {
    render(<App />)

    expect(
      screen.getByRole('link', { name: /ir al inicio de hi ibiza/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver carta/i })).toHaveAttribute(
      'href',
      '#menu',
    )
  })

  it('renders catalog products and formatted prices', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Mojito' })).toBeInTheDocument()
    expect(screen.getByText(/22\.000/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ibiza Sunset' })).toBeInTheDocument()
  })
})
