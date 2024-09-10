import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Paginator from './pagination'
import { ButtonProps } from '../../atoms/Button/interfaces'

vi.mock('../../atoms/Button/Button', () => ({
  __esModule: true,
  default: ({ label, onClick, disabled, variant, active }: ButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={`button-${label}`}
      className={`button ${variant} ${active ? 'active' : ''}`}
    >
      {label}
    </button>
  ),
}))

describe('Paginator', () => {
  it('should render pagination buttons and handle page changes', () => {
    const goToPage = vi.fn()
    render(<Paginator currentPage={5} totalPages={15} goToPage={goToPage} />)

    const previousButton = screen.getByTestId('button-<')
    expect(previousButton).toBeInTheDocument()
    expect(previousButton).not.toBeDisabled()

    const nextButton = screen.getByTestId('button->')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).not.toBeDisabled()

    for (let i = 1; i <= 10; i++) {
      const pageButton = screen.getByTestId(`button-${i}`)
      expect(pageButton).toBeInTheDocument()
      if (i === 5) {
        expect(pageButton).toHaveClass('active')
      }
    }

    fireEvent.click(screen.getByTestId('button-<'))
    expect(goToPage).toHaveBeenCalledWith(4)

    fireEvent.click(screen.getByTestId('button->'))
    expect(goToPage).toHaveBeenCalledWith(6)

    for (let i = 1; i <= 10; i++) {
      fireEvent.click(screen.getByTestId(`button-${i}`))
      expect(goToPage).toHaveBeenCalledWith(i)
    }
  })

  it('should disable the previous button on the first page', () => {
    const goToPage = vi.fn()
    render(<Paginator currentPage={1} totalPages={15} goToPage={goToPage} />)

    const previousButton = screen.getByTestId('button-<')
    expect(previousButton).toBeDisabled()
  })

  it('should disable the next button on the last page', () => {
    const goToPage = vi.fn()
    render(<Paginator currentPage={15} totalPages={15} goToPage={goToPage} />)

    const nextButton = screen.getByTestId('button->')
    expect(nextButton).toBeDisabled()
  })
})
