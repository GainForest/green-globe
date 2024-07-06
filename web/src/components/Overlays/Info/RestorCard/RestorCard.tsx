import { useEffect, useState } from 'react'

import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'
import { InfoBox } from 'src/components/Overlays/Info/InfoBox'

import { RestorPredictions } from '../Pokedex/RestorPredictions'

import { Info } from 'lucide-react'

import { CarbonChart } from './CarbonChart'
import { TreeCoverChart } from './TreeCoverChart'
import { WaterChart } from './WaterChart'
export const RestorCard = ({ mediaSize, activeProjectData }) => {
  const [displayedInsight, setDisplayedInsight] = useState('carbon')
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
    console.log(allData)
  }, [allData])

  useEffect(() => {
    const loadJsonFiles = async (siteName) => {
      let formattedName = siteName
        .replace(/[\s-]+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0
            ? match.toLowerCase()
            : match.toUpperCase().replace(/\s+/g, '')
        ) // Convert to camelCase
      if (formattedName == 'inhaãBé') {
        formattedName = 'inhaaBe'
      }
      console.log(formattedName)
      const baseURL = `${process.env.AWS_STORAGE}/restor/chartData/${formattedName}`
      const jsonFiles = {
        carbon: 'carbon.json',
        biodiversity: 'biodiversity.json',
        ecoregionsBiomes: 'ecoregions_biomes.json',
        environment: 'environment.json',
        water: 'water.json',
        ecosystems: 'ecosystems.json',
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
      <div style={{ marginLeft: '16px', marginBottom: '8px' }}><h1>Remote Sensing Analysis</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Info size={20} style={{ marginRight: '8px', color: '#669629' }} />
          <p style={{ marginTop: '10px' }}>
            Remote Sensing Analysis queried through Restor.
          </p>
        </div>
      </div>
      <IconBar>
        {/* <IconButton
          buttonIcon={'eco'}
          active={displayedInsight == 'biodiversity'}
          onClick={() => setDisplayedInsight('biodiversity')}
        /> */}
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
        <TreeCoverChart
          treeData={allData?.treeCover}
          ecosystemsData={allData?.ecosystems}
        />
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
