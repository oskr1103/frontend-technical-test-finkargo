import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import SkeletonCard from './skeletonCard'

describe('SkeletonCard Component', () => {
  it('should render the SkeletonCard component correctly', () => {
    render(<SkeletonCard />)

    const imagePlaceholder = screen.getByTestId('image-placeholder')
    expect(imagePlaceholder).toBeInTheDocument()
    expect(imagePlaceholder).toHaveClass(
      'w-full h-48 bg-gray-200 animate-pulse'
    )
    const textPlaceholder1 = screen.getByTestId('text-placeholder-1')
    const textPlaceholder2 = screen.getByTestId('text-placeholder-2')
    const textPlaceholder3 = screen.getByTestId('text-placeholder-3')

    expect(textPlaceholder1).toBeInTheDocument()
    expect(textPlaceholder2).toBeInTheDocument()
    expect(textPlaceholder3).toBeInTheDocument()

    expect(textPlaceholder1).toHaveClass('h-4 bg-gray-200 animate-pulse')
    expect(textPlaceholder2).toHaveClass('h-4 bg-gray-200 animate-pulse')
    expect(textPlaceholder3).toHaveClass('h-4 bg-gray-200 animate-pulse')
  })
})
