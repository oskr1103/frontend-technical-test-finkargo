import { useState, useEffect } from 'react';
import { getCharacters } from '../services/RickAndMortyService';
import { Character } from './interfaces';

export const useCharacterPagination = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadCharacters = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await getCharacters(page);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { characters, currentPage, totalPages, goToPage, isLoading };
};