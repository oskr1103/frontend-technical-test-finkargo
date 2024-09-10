export interface CardProps {
  id: number
  image: string
  name: string
  species: string
  status: string
  origin: Location
  gender: string
}

interface Location{
    name: string
}