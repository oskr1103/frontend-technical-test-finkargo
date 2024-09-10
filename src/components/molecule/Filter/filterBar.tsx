import { useState } from 'react'
import PopUp from '../Popup/popup'
import FilterDropdown from '../../atoms/FilterDropdown/filterDropDown'
import TextInput from '../../atoms/TextInput/textInput'
import Button from '../../atoms/Button/Button'
import { getFilteredCharacters } from '../../../services/RickAndMortyService'
import { Character } from '../../../hooks/interfaces'

const FilterBar = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [searchStatus, setSearchStatus] = useState<string[]>([])
  const [searchSpecies, setSearchSpecies] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('')
  const [searchGender, setSearchGender] = useState<string[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )

  const fetchCharacters = async () => {
    try {
      const data = await getFilteredCharacters(
        searchName,
        searchStatus,
        searchSpecies,
        searchType,
        searchGender
      )
      setCharacters(data.results)
    } catch (error) {
      console.error('Error fetching characters:', error)
    }
  }

  const handleCardClick = (character: Character) => {
    setSelectedCharacter(character)
  }

  const handleClosePopUp = () => {
    setSelectedCharacter(null)
  }

  const handleClearFilters = () => {
    setSearchName('')
    setSearchStatus([])
    setSearchSpecies('')
    setSearchType('')
    setSearchGender([])
    setCharacters([])
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <TextInput
            value={searchName}
            onChange={setSearchName}
            placeholder="Search by name"
            className="flex-1"
          />
          <FilterDropdown
            options={['Alive', 'Dead', 'Unknown']}
            selectedOptions={searchStatus}
            onSelectionChange={setSearchStatus}
            label="Status"
            className="flex-1"
          />
          <FilterDropdown
            options={['Female', 'Male', 'Genderless', 'Unknown']}
            selectedOptions={searchGender}
            onSelectionChange={setSearchGender}
            label="Gender"
            className="flex-1"
          />
          <TextInput
            value={searchSpecies}
            onChange={setSearchSpecies}
            placeholder="Species"
            className="flex-1"
          />
          <TextInput
            value={searchType}
            onChange={setSearchType}
            placeholder="Type"
            className="flex-1"
          />
        </div>
        <div className="flex flex-row md:flex-row gap-4 mt-4 md:mt-0">
          <Button label="Search" onClick={fetchCharacters} variant="page" />
          <Button label="Clear" onClick={handleClearFilters} />
        </div>
      </div>
      <ul className="list-none p-0">
        {characters.map((character) => (
          <li
            key={character.id}
            onClick={() => handleCardClick(character)}
            className="p-4 border border-gray-300 rounded mb-2 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center space-x-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="text-lg font-semibold">{character.name}</div>
            </div>
          </li>
        ))}
      </ul>
      {selectedCharacter && (
        <PopUp character={selectedCharacter} onClose={handleClosePopUp} />
      )}
    </div>
  )
}

export default FilterBar
