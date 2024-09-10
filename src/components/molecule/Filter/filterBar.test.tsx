import { describe, it, beforeEach, vi, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FilterBar from './filterBar'
import { getFilteredCharacters } from '../../../services/RickAndMortyService'

vi.mock('../../../services/RickAndMortyService', () => ({
  getFilteredCharacters: vi.fn(),
}))

const mockGetFilteredCharacters = vi.mocked(getFilteredCharacters)

describe('FilterBar', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    mockGetFilteredCharacters.mockReset()
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockGetFilteredCharacters.mockReset()
  })

  afterEach(() => {
    errorSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it('should render input fields and buttons correctly', () => {
    render(<FilterBar />)

    expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Species')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('should clear filters when Clear button is clicked', () => {
    render(<FilterBar />)
    fireEvent.change(screen.getByPlaceholderText('Search by name'), {
      target: { value: 'Rick' },
    })
    fireEvent.change(screen.getByPlaceholderText('Species'), {
      target: { value: 'Human' },
    })
    fireEvent.change(screen.getByPlaceholderText('Type'), {
      target: { value: 'Unknown' },
    })

    fireEvent.click(screen.getByText('Clear'))

    expect(screen.getByPlaceholderText('Search by name')).toHaveValue('')
    expect(screen.getByPlaceholderText('Species')).toHaveValue('')
    expect(screen.getByPlaceholderText('Type')).toHaveValue('')
  })

  it('should open and close popup on character click', async () => {
    const mockCharacters = [
      {
        id: 1,
        name: 'Rick Sanchez',
        image: 'rick.jpg',
        origin: { name: 'Earth' },
      },
      {
        id: 2,
        name: 'Morty Smith',
        image: 'morty.jpg',
        origin: { name: 'Earth' },
      },
    ]
    mockGetFilteredCharacters.mockResolvedValue({ results: mockCharacters })
    render(<FilterBar />)
    fireEvent.click(screen.getByText('Search'))
    await waitFor(() => {
      const characterNames = screen.getAllByText('Rick Sanchez')
      expect(characterNames.length).toBeGreaterThan(0)
    })
    fireEvent.click(screen.getByText('Rick Sanchez'))

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /close/i }))
    })
  })

  it('should handle errors when fetching characters', async () => {
    mockGetFilteredCharacters.mockRejectedValueOnce(new Error('Network error'))

    render(<FilterBar />)
    fireEvent.click(screen.getByText('Search'))
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalledWith(
        'Error fetching characters:',
        expect.any(Error)
      )
    })
  })
})
