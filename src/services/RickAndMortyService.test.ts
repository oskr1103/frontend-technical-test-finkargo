import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCharacters, getFilteredCharacters } from './RickAndMortyService'; 

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

describe('API Functions', () => {
  it('should fetch characters successfully', async () => {
    const mockData = { results: [{ id: 1, name: 'Rick Sanchez' }] };
    mock.onGet('https://rickandmortyapi.com/api/character', { params: { page: 1 } }).reply(200, mockData);
    const data = await getCharacters();
    expect(data).toEqual(mockData);
  });

  it('should fetch filtered characters successfully', async () => {
    const mockData = { results: [{ id: 1, name: 'Morty Smith' }] };
    mock
      .onGet('https://rickandmortyapi.com/api/character', {
        params: { name: 'Morty', status: ['Alive'], species: 'Human', type: 'Male', gender: ['Male'] },
      })
      .reply(200, mockData);

    const data = await getFilteredCharacters('Morty', ['Alive'], 'Human', 'Male', ['Male']);
    expect(data).toEqual(mockData);
  });

  it('should handle errors properly in getCharacters', async () => {
    mock.onGet('https://rickandmortyapi.com/api/character', { params: { page: 1 } }).reply(500);

    await expect(getCharacters()).rejects.toThrow();
  });

  it('should handle errors properly in getFilteredCharacters', async () => {
    mock
      .onGet('https://rickandmortyapi.com/api/character', {
        params: { name: 'Morty', status: ['Alive'], species: 'Human', type: 'Male', gender: ['Male'] },
      })
      .reply(500);

    await expect(getFilteredCharacters('Morty', ['Alive'], 'Human', 'Male', ['Male'])).rejects.toThrow();
  });
});