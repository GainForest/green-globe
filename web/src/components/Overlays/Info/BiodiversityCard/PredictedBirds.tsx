import { useEffect, useState } from 'react'

import { KingdomList } from '../Pokedex/KingdomList'

export const PredictedBirds = ({ mediaSize }) => {
  const [predictedBirds, setPredictedBirds] = useState([])

  useEffect(() => {
    fetch(
      `${process.env.AWS_STORAGE}/audio/013-089-Tufted-Tit-Tyrant_predicted.json`
    )
      .then((res) => res.json())
      .then(setPredictedBirds)
  }, [])

  if (predictedBirds) {
    const speciesList: Species[] = predictedBirds[1]?.data
      .filter((d) => d[1] > 1)
      .map((d) => {
        const birdName = d[0]?.replace(/_/g, ' ')
        return {
          scientificName: birdName,
          category: 'Bird',
          awsUrl: undefined,
          iucnCategory: undefined,
        }
      })

    return (
      <div>
        <h2>Predicted Birds</h2>
        <p>
          Birds predicted to be in this region. Audiomoths are installed in this
          region, and the bird sounds are analyzed and predicted with a bird
          sound recognition algorithm.
        </p>
        <KingdomList speciesList={speciesList} mediaSize={mediaSize} />
      </div>
    )
  } else {
    return <div></div>
  }
}
