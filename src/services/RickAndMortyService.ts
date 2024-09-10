import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/character`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getFilteredCharacters = async (
  name?: string,
  status?: string[],
  species?: string,
  type?: string,
  gender?: string[],
) => {
  try {
    const params = {
      ...(name && { name }),
      ...(status?.length && { status }),
      ...(species && { species }),
      ...(type && { type }),
      ...(gender?.length && { gender }),
    };

    const response = await axios.get(`${BASE_URL}/character`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered characters:', error);
    throw error;
  }
};