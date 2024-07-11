import { useEffect, useState } from 'react'

import * as d3 from 'd3'
import { useSelector } from 'react-redux'

import { toKebabCase } from 'src/utils/toKebabCase'

import { KingdomList } from '../Pokedex/KingdomList'

export const PredictedAnimals = ({ mediaSize }) => {
  // const [predictedBirds, setPredictedBirds] = useState([])
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  const kebabCasedProjectName = useSelector((state: any) =>
    toKebabCase(state.project.name)
  )

  useEffect(() => {
    const getCsv = async () => {
      const data = await d3.csv(
        `${process.env.AWS_STORAGE}/predictions/${kebabCasedProjectName}.csv`
      )
      const kingdoms = {}
      data.forEach((d) => {
        const kingdom = d.Type
        if (kingdom in kingdoms) {
          kingdoms[kingdom].push({
            ...d,
            category: kingdom,
            scientificName: d['Species'],
          })
        } else {
          kingdoms[kingdom] = [
            { ...d, category: kingdom, scientificName: d['Species'] },
          ]
        }
      })
      const kingdomsArray = Object.entries(kingdoms).map(([name, data]) => ({
        name,
        data,
      }))
      setPredictions(kingdomsArray)
      setLoading(false)
    }
    getCsv()
  }, [])

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (Object.keys(predictions).length == 0) {
    return (
      <div>
        <p>No data found.</p>
      </div>
    )
  }

  // useEffect(() => {
  //   fetch(
  //     `${process.env.AWS_STORAGE}/audio/013-089-Tufted-Tit-Tyrant_predicted.json`
  //   )
  //     .then((res) => res.json())
  //     .then(setPredictedBirds)
  // }, [])

  // if (predictedBirds) {
  //   const speciesList: Species[] = predictedBirds[1]?.data
  //     .filter((d) => d[1] > 1)
  //     .map((d) => {
  //       const birdName = d[0]?.replace(/_/g, ' ')
  //       return {
  //         scientificName: birdName,
  //         category: 'Bird',
  //         awsUrl: undefined,
  //         iucnCategory: undefined,
  //       }
  //     })

  return (
    <div>
      <h2>Predicted Animals</h2>
      <p>Animals predicted to exist in this region.</p>
      <p>
        Audiomoths are installed in this region, and the bird sounds are
        analyzed and predicted with a bird sound recognition algorithm.
      </p>
      {Object.keys(predictions).length > 0 &&
        Object.keys(predictions).map((type) => (
          <div key={type}>
            <h2>Predicted {predictions[type].name}s</h2>
            <div>
              <p className="text-lg font-semibold mb-2">
                Total {predictions[type].name}s predicted:{' '}
                {predictions[type].data.length}
              </p>
              <KingdomList
                speciesList={predictions[type].data.slice(0, 4)}
                mediaSize={mediaSize}
              />
              <button
                onClick={() => openModal(predictions[type].data)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#669629',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginTop: '8px',
                  padding: '0',
                }}
              >
                See more {predictions[type].name}s
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
