import { useEffect, useState } from 'react'

import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'
import { InfoBox } from 'src/components/Overlays/Info/InfoBox'

import { RestorPredictions } from '../Pokedex/RestorPredictions'

import { CarbonChart } from './CarbonChart'
import { TreeCoverChart } from './TreeCoverChart'
import { WaterChart } from './WaterChart'
export const RestorCard = ({ mediaSize, activeProjectData }) => {
  const [displayedInsight, setDisplayedInsight] = useState('biodiversity')
  const [allData, setAllData] = useState({
    carbon: {},
    biodiversity: {},
    ecoregionsBiomes: {},
    environment: {},
    water: {},
    ecosystems: {},
    scientificMonitoring: {},
    treeCover: {},
  })

  useEffect(() => {
    const loadJsonFiles = async (siteName) => {
      const formattedName = siteName.replace(/ /g, '-').toLowerCase()
      const baseURL = `${process.env.AWS_STORAGE}/restor/chartData/${formattedName}`
      const jsonFiles = {
        carbon: 'carbon.json',
        biodiversity: 'biodiversity.json',
        ecoregionsBiomes: 'ecoregions_biomes.json',
        environment: 'environment.json',
        water: 'water.json',
        // ecosystems: 'ecosystems.json',
        scientificMonitoring: 'scientific_monitoring.json',
        treeCover: 'tree_cover.json',
      }
      try {
        const dataPromises = Object.entries(jsonFiles).map(([key, file]) =>
          fetch(`${baseURL}/${file}`).then((response) =>
            response.json().then((data) => ({ [key]: data[key] }))
          )
        )
        const responses = await Promise.all(dataPromises)
        const combinedData = responses.reduce(
          (acc, data) => ({ ...acc, ...data }),
          {}
        )
        setAllData(combinedData)
      } catch (error) {
        console.error('Error loading JSON files:', error)
      }
    }

    loadJsonFiles(activeProjectData?.project?.name)
  }, [activeProjectData])
  return (
    <InfoBox mediaSize={mediaSize}>
      <h1 style={{ marginLeft: '16px', marginBottom: '8px' }}>Restor Data</h1>
      <IconBar>
        <IconButton
          buttonIcon={'eco'}
          active={displayedInsight == 'biodiversity'}
          onClick={() => setDisplayedInsight('biodiversity')}
        />
        <IconButton
          buttonIcon={'co2'}
          active={displayedInsight == 'carbon'}
          onClick={() => setDisplayedInsight('carbon')}
        />

        <IconButton
          buttonIcon={'water_drop'}
          active={displayedInsight == 'water'}
          onClick={() => setDisplayedInsight('water')}
        />
        <IconButton
          buttonIcon={'forest'}
          active={displayedInsight == 'treeCover'}
          onClick={() => setDisplayedInsight('treeCover')}
        />
      </IconBar>
      {displayedInsight == 'biodiversity' && (
        <RestorPredictions
          activeProjectData={activeProjectData}
          mediaSize={mediaSize}
        />
      )}
      {displayedInsight == 'carbon' && (
        <CarbonChart chartData={allData?.carbon} />
      )}
      {displayedInsight == 'water' && <WaterChart chartData={allData?.water} />}
      {displayedInsight == 'treeCover' && (
        <TreeCoverChart chartData={allData?.treeCover} />
      )}
    </InfoBox>
  )
}
const IconBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  gap: 6px;
  margin-left: 16px;
`
