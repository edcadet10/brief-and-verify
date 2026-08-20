import axe from 'axe-core'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { LearnerProvider } from '../context/LearnerContext'
import { CheckInPage } from '../pages/CheckInPage'
import { LandingPage } from '../pages/LandingPage'

const renderPage = (page: React.ReactNode) =>
  render(
    <MemoryRouter>
      <LearnerProvider>{page}</LearnerProvider>
    </MemoryRouter>,
  )

describe('critical page accessibility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it.each([
    ['landing page', <LandingPage />],
    ['check-in profile', <CheckInPage />],
  ])('has no automatically detectable violations on the %s', async (_name, page) => {
    const { container } = renderPage(page)
    const results = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    })

    expect(results.violations).toEqual([])
  })

  it('states its core promise without requiring an account', () => {
    renderPage(<LandingPage />)

    expect(screen.getByRole('heading', { name: /use ai/i, level: 1 })).toBeVisible()
    expect(screen.getByText('No account')).toBeVisible()
    expect(
      screen
        .getAllByRole('link', { name: /take the 3-minute check-in/i })
        .every((link) => link.getAttribute('href') === '/check-in'),
    ).toBe(true)
  })
})
