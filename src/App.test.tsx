import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { App } from '@/App'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
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
    const navigation = screen.getByRole('navigation', { name: /categorías del menú/i })
    expect(
      within(navigation).getByRole('link', { name: /^Cócteles$/i }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Cervezas' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Licores' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Bebidas' }),
    ).toBeInTheDocument()
    expect(within(navigation).getByRole('link', { name: 'Extras' })).toBeInTheDocument()
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
    expect(screen.getAllByText(/20\.000/).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Lychee Martini' })).toBeInTheDocument()
    expect(screen.getAllByText('No disponible').length).toBe(5)
  })

  it('updates the active category when a category is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    const navigation = screen.getByRole('navigation', { name: /categorías del menú/i })
    const extrasLink = within(navigation).getByRole('link', { name: 'Extras' })
    await user.click(extrasLink)

    expect(extrasLink).toHaveAttribute('aria-current', 'location')
  })

  it('filters products and categories from the search field', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /buscar productos/i }),
      'Buchanan',
    )

    expect(
      screen.getByRole('heading', { name: 'Botella Buchanan’s Deluxe' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Media Buchanan’s Deluxe' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Mojito' })).not.toBeInTheDocument()
    const navigation = screen.getByRole('navigation', { name: /categorías del menú/i })
    expect(
      within(navigation).queryByRole('link', { name: 'Cócteles' }),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(screen.getByRole('heading', { name: 'Mojito' })).toBeInTheDocument()
  })

  it('matches products without requiring accents', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /buscar productos/i }),
      'aguila',
    )

    expect(screen.getByRole('heading', { name: 'Águila' })).toBeInTheDocument()
  })

  it('keeps footer links limited to visible categories while searching', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByRole('searchbox', { name: /buscar productos/i }),
      'Buchanan',
    )

    const footerNavigation = screen.getByRole('navigation', {
      name: 'Secciones del menú',
    })
    expect(
      within(footerNavigation).getByRole('link', { name: 'Licores' }),
    ).toBeInTheDocument()
    expect(
      within(footerNavigation).queryByRole('link', { name: 'Cócteles' }),
    ).not.toBeInTheDocument()
  })

  it('switches to a reading-friendly menu view', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /lectura/i }))

    expect(screen.getByRole('button', { name: /lectura/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.queryByRole('img', { name: 'Águila' })).not.toBeInTheDocument()
  })

  it('shows a back-to-top control after scrolling', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<App />)

    expect(
      screen.queryByRole('button', { name: /volver arriba/i }),
    ).not.toBeInTheDocument()

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 600 })
    fireEvent.scroll(window)

    const backToTop = screen.getByRole('button', { name: /volver arriba/i })
    expect(backToTop).toBeInTheDocument()

    await user.click(backToTop)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('opens product details with keyboard activation', async () => {
    render(<App />)

    const productAction = screen.getByRole('button', {
      name: 'Abrir detalles de Mojito',
    })

    productAction.focus()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(productAction)

    expect(screen.getByRole('dialog', { name: /mojito/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Cerrar detalle del producto' }),
    ).toBeInTheDocument()

    const closeButton = screen.getByRole('button', {
      name: 'Cerrar detalle del producto',
    })
    closeButton.focus()
    fireEvent.keyDown(closeButton, { key: 'Tab' })
    expect(document.activeElement).toBe(closeButton)

    fireEvent.click(closeButton)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
