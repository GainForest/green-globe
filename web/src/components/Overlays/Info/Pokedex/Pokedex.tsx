import { useEffect, useState } from 'react'

import { ToggleButton } from 'src/components/Map/components/ToggleButton'

import { InfoBox } from '../InfoBox'

import SpeciesCard from './SpeciesCard'

const Pokedex = ({ activeProjectData, mediaSize }) => {
  const [predictedPlants, setPredictedPlants] = useState([])
  const [toggle, setToggle] = useState<'Predicted' | 'Measured'>('Predicted')

  // const [speciesData, setSpeciesData] = useState([])

  useEffect(() => {
    const getPlantsList = async () => {
      try {
        const response = await fetch(
          `${process.env.AWS_STORAGE}/restor/${activeProjectData.project.name
            .split(' ')
            .join('-')
            .toLowerCase()}.json`
        )
        const data = await response.json()
        setPredictedPlants(data.items)
      } catch (e) {
        console.log(e)
      }
    }
    if (activeProjectData) {
      getPlantsList()
    }
  }, [activeProjectData])

  // useEffect(() => {
  //   const getSpeciesData = async () => {
  //     const res = await Promise.all(
  //       speciesList.map((species) =>
  //         fetch(`${process.env.AWS_STORAGE}/restor/${species.name}.json`)
  //       )
  //     )
  //     setSpeciesData(res)
  //   }
  //   getSpeciesData()
  // }, [speciesList])

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h1>Pokedex</h1>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Predicted', 'Measured']}
        />
        {toggle == 'Predicted' ? (
          <div>
            {predictedPlants?.length && (
              <div>
                <h2>Plants</h2>
                {predictedPlants.slice(0, 5).map((plant) => (
                  <SpeciesCard
                    key={plant.id}
                    species={plant}
                    mediaSize={mediaSize}
                  />
                ))}
                <button>See more Plants</button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </InfoBox>
  )
}
export default Pokedex
