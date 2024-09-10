import { useCharacterPagination } from '../../../hooks/useCharacterPagination'
import Card from '../../molecule/Card/card'
import SkeletonCard from '../../molecule/Card/skeletonCard'
import Paginator from '../../molecule/Pagination/pagination'

const CharacterLIst = () => {
  const { characters, currentPage, totalPages, goToPage, isLoading } =
    useCharacterPagination()

  return (
    <section>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.map((character) => (
            <Card
              key={character.id}
              id={character.id}
              name={character.name}
              species={character.species}
              image={character.image}
              status={character.status}
              origin={character.origin}
              gender={character.gender}
            />
          ))}
        </div>
      )}

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </section>
  )
}

export default CharacterLIst
