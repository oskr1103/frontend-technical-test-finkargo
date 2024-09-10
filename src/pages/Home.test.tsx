import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './Home'

vi.mock('../components/organis/CharacterList/characterList', () => ({
  default: () => <div>Mocked Character List</div>,
}))

vi.mock('../components/molecule/Filter/filterBar', () => ({
  default: () => <div>Mocked Filter Bar</div>,
}))

vi.mock('../assets/logo.png', () => ({
  default: 'mocked-logo.png',
}))

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the Home component correctly', () => {
    render(<Home />)
    const logo = screen.getByAltText('Rick and Morty Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'mocked-logo.png')
    expect(screen.getByText('Mocked Character List')).toBeInTheDocument()
    expect(screen.getByText('Mocked Filter Bar')).toBeInTheDocument()
  })
})
