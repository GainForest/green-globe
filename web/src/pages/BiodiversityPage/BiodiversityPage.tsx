import { useEffect, useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

const BiodiversityPage = () => {
  const [observations, setObservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.AWS_STORAGE}/observations/semifinals.json`)
        .then((response) => response.json())
        .then((res) => setObservations(res))
    }
    fetchData()
  }, [])

  return (
    <>
      <MetaTags title="Biodiversity" description="Biodiversity page" />

      <h1>Species Richness</h1>
      <div>
        {observations &&
          observations.map((d) => (
            <div key={d.scientificName}>{d.scientificName}</div>
          ))}
      </div>
    </>
  )
}

export default BiodiversityPage
