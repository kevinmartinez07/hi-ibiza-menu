import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '@/App'

describe('App', () => {
  it('renders the HI Ibiza heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /hi ibiza cocktails/i }),
    ).toBeInTheDocument()
  })
})
