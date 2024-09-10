import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterLIst from './characterList'
import { useCharacterPagination } from '../../../hooks/useCharacterPagination'

vi.mock('../../../hooks/useCharacterPagination', () => ({
  useCharacterPagination: vi.fn(),
}))

vi.mock('../../molecule/Card/card', () => ({
  default: () => <div>Card</div>,
}))

vi.mock('../../molecule/Card/skeletonCard', () => ({
  default: () => <div>SkeletonCard</div>,
}))

vi.mock('../../molecule/Pagination/pagination', () => ({
  default: () => <div>Paginator</div>,
}))

describe('CharacterLIst', () => {
  it('should render loading skeleton cards when data is loading', () => {
    ;(useCharacterPagination as ReturnType<typeof vi.fn>).mockReturnValue({
      characters: [],
      currentPage: 1,
      totalPages: 1,
      goToPage: vi.fn(),
      isLoading: true,
    })

    render(<CharacterLIst />)

    const skeletonCards = screen.getAllByText('SkeletonCard')
    expect(skeletonCards).toHaveLength(12)
  })

  it('should render character cards when data is loaded', () => {
    ;(useCharacterPagination as ReturnType<typeof vi.fn>).mockReturnValue({
      characters: [
        {
          id: 1,
          name: 'Rick',
          species: 'Human',
          image: 'rick.png',
          status: 'Alive',
        },
      ],
      currentPage: 1,
      totalPages: 1,
      goToPage: vi.fn(),
      isLoading: false,
    })

    render(<CharacterLIst />)

    expect(screen.getByText('Card')).toBeInTheDocument()
  })

  it('should render paginator with correct props', () => {
    ;(useCharacterPagination as ReturnType<typeof vi.fn>).mockReturnValue({
      characters: [],
      currentPage: 1,
      totalPages: 3,
      goToPage: vi.fn(),
      isLoading: false,
    })

    render(<CharacterLIst />)

    expect(screen.getByText('Paginator')).toBeInTheDocument()
  })
})
