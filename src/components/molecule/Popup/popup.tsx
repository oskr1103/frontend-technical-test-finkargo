import { FC } from 'react'
import Card from '../Card/card'
import { Character } from '../../../hooks/interfaces'
import Button from '../../atoms/Button/Button'

interface PopUpProps {
  character: Character
  onClose: () => void
}

const PopUp: FC<PopUpProps> = ({ character, onClose }) => {
  const { id, name, status, origin, species, gender, image } = character
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Card
          id={id}
          image={image}
          name={name}
          status={status}
          origin={origin}
          species={species}
          gender={gender}
        />
        <Button label="close" onClick={onClose} className="mt-5" />
      </div>
    </div>
  )
}

export default PopUp
