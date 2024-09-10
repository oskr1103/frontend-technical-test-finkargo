import React from 'react'
import { CardProps } from './interfaces'

const Card: React.FC<CardProps> = ({
  image,
  name,
  species,
  id,
  status,
  origin,
  gender,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden" key={id}>
      <img src={image} alt={name} className="w-full h-58 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">
          Status: <strong>{status}</strong>
        </p>
        <p className="text-gray-600">
          Specie: <strong>{species}</strong>
        </p>
        <p className="text-gray-600">
          Gender: <strong>{gender}</strong>
        </p>
        <p className="text-gray-600">
          Origin: <strong>{origin.name}</strong>
        </p>
      </div>
    </div>
  )
}

export default Card
