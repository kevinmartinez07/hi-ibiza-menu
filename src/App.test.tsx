import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    const navigation = screen.getByRole('navigation', { name: /categorías del menú/i })
    expect(
      within(navigation).getByRole('link', { name: /^Cocktails$/i }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Cervezas' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Licores' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Botellas' }),
    ).toBeInTheDocument()
    expect(within(navigation).getByRole('link', { name: 'Combos' })).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Sin alcohol' }),
    ).toBeInTheDocument()
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

  it('updates the active category when a category is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    const navigation = screen.getByRole('navigation', { name: /categorías del menú/i })
    const combosLink = within(navigation).getByRole('link', { name: 'Combos' })
    await user.click(combosLink)

    expect(combosLink).toHaveAttribute('aria-current', 'location')
  })

  it('switches to a reading-friendly menu view', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /lectura/i }))

    expect(screen.getByRole('button', { name: /lectura/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.queryByRole('img', { name: 'Águila Original' }),
    ).not.toBeInTheDocument()
  })
})
