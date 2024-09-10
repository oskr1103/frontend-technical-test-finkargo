import CharacterLIst from '../components/organis/CharacterList/characterList'
import Logo from '../assets/logo.png'
import FilterBar from '../components/molecule/Filter/filterBar'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <img
        src={Logo}
        alt="Rick and Morty Logo"
        className="mx-auto my-4 w-1/2 sm:w-1/3 md:w-1/4"
      />
      <FilterBar />
      <CharacterLIst />
    </div>
  )
}

export default Home
