import SpeciesCard from './SpeciesCard'
export const KingdomList = ({ speciesList = [], mediaSize }) => {
  if (speciesList?.length === 0) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {speciesList.map((species) => (
        <SpeciesCard
          key={species.scientificName}
          species={species}
          mediaSize={mediaSize}
        />
      ))}
    </div>
  )
}
