import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCharacterPagination } from './useCharacterPagination';
import { getCharacters } from '../services/RickAndMortyService';

vi.mock('../services/RickAndMortyService', () => ({
  getCharacters: vi.fn(),
}));

describe('useCharacterPagination hook', () => {
  it('should load characters on initial render', async () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick Sanchez' }, { id: 2, name: 'Morty Smith' }],
      info: { pages: 2 },
    };

    (getCharacters as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useCharacterPagination());

    expect(result.current.characters).toEqual([]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters).toEqual(mockData.results);
    expect(result.current.totalPages).toBe(mockData.info.pages);
  });

  it('should handle page change', async () => {
    const mockDataPage1 = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
      info: { pages: 2 },
    };

    const mockDataPage2 = {
      results: [{ id: 2, name: 'Morty Smith' }],
      info: { pages: 2 },
    };

    (getCharacters as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockDataPage1);
    (getCharacters as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockDataPage2);

    const { result } = renderHook(() => useCharacterPagination());

    await waitFor(() => expect(result.current.characters).toEqual(mockDataPage1.results));

    act(() => {
      result.current.goToPage(2);
    });

    await waitFor(() => expect(result.current.characters).toEqual(mockDataPage2.results));
    expect(result.current.currentPage).toBe(2);
  });

  it('should not go to an invalid page', async () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
      info: { pages: 2 },
    };

    (getCharacters as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useCharacterPagination());

    await waitFor(() => expect(result.current.characters).toEqual(mockData.results));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should handle errors during character loading', async () => {
    (getCharacters as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useCharacterPagination());

    expect(result.current.characters).toEqual([]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters).toEqual([]);
    expect(result.current.totalPages).toBe(1);
  });
});