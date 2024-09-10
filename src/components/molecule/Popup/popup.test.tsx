import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Character } from '../../../hooks/interfaces'
import PopUp from './popup'

vi.mock('../Card/card', () => ({
  default: vi.fn(() => <div>Card Mock</div>),
}))

vi.mock('../../atoms/Button/Button', () => ({
  default: vi.fn(
    ({ label, onClick }: { label: string; onClick: () => void }) => (
      <div onClick={onClick}>{label}</div>
    )
  ),
}))

describe('PopUp component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    origin: {
      name: 'Earth',
      url: 'https://example.com',
    },
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/rick.png',
  }

  it('should render the character details and close button', () => {
    const mockOnClose = vi.fn()

    render(<PopUp character={mockCharacter} onClose={mockOnClose} />)
    expect(screen.getByText('Card Mock')).toBeInTheDocument()
    expect(screen.getByText('close')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn()

    render(<PopUp character={mockCharacter} onClose={mockOnClose} />)
    fireEvent.click(screen.getByText('close'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
