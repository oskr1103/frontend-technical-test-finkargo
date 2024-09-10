import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders the button and handles click event', () => {
    const handleClick = vi.fn()
    render(<Button label="Click me" onClick={handleClick} />)

    const button = screen.getByText(/Click me/i)
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies default variant styles when variant is not specified', () => {
    render(<Button label="Default Variant" onClick={() => {}} />)

    const button = screen.getByText(/Default Variant/i)
    expect(button).toHaveClass('bg-blue-100 text-blue-600 hover:bg-blue-400')
  })

  it('applies page variant styles when variant is "page"', () => {
    render(<Button label="Page Variant" onClick={() => {}} variant="page" />)

    const button = screen.getByText(/Page Variant/i)
    expect(button).toHaveClass(
      'border bg-white text-blue-600 hover:bg-blue-100'
    )
  })

  it('applies active styles when variant is "page" and active is true', () => {
    render(
      <Button
        label="Active Page Variant"
        onClick={() => {}}
        variant="page"
        active={true}
      />
    )

    const button = screen.getByText(/Active Page Variant/i)
    expect(button).toHaveClass('border bg-blue-400 text-white')
  })

  it('is disabled when the disabled prop is true', () => {
    render(
      <Button label="Disabled Button" onClick={() => {}} disabled={true} />
    )

    const button = screen.getByText(/Disabled Button/i)
    expect(button).toBeDisabled()
  })
})
