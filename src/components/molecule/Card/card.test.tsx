import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './card'

describe('Card Component', () => {
  const cardProps = {
    id: 1,
    image: 'https://example.com/image.jpg',
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    origin: {
      name: 'Earth (C-137)',
    },
    gender: 'Male',
  }

  it('should render the Card component correctly', () => {
    render(<Card {...cardProps} />)

    const image = screen.getByAltText(cardProps.name)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', cardProps.image)

    const name = screen.getByText(cardProps.name)
    expect(name).toBeInTheDocument()

    const speciesText = screen.getByText((content) =>
      content.startsWith('Specie:')
    )
    expect(speciesText).toBeInTheDocument()

    const statusText = screen.getByText((content) =>
      content.startsWith('Status:')
    )
    expect(statusText).toBeInTheDocument()
  })
})
