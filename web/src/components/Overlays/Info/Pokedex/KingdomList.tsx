import { useState } from 'react'

import SpeciesCard from './SpeciesCard'

export const KingdomList = ({ speciesList = [], mediaSize }) => {
  const [activeSpeciesName, setActiveSpeciesName] = useState(null)

  if (speciesList?.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
      {speciesList.map((species) => (
        <SpeciesCard
          key={species.scientificName}
          species={species}
          mediaSize={mediaSize}
          activeSpeciesName={activeSpeciesName}
          setActiveSpeciesName={setActiveSpeciesName}
        />
      ))}
    </div>
  )
}
