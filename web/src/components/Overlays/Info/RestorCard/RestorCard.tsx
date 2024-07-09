import { useEffect, useState } from 'react'

import { Info } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'
import { InfoBox } from 'src/components/Overlays/Info/InfoBox'
import { toKebabCase } from 'src/utils/toKebabCase'

import { BiodiversityChart } from './BiodiversityChart'
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
    console.log(activeProjectData)
  }, [allData, activeProjectData])

  useEffect(() => {
    const loadJsonFiles = async (siteName) => {
      const formattedName = toKebabCase(siteName)
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
      <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
        <h1>Remote Sensing Analysis</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Info size={20} style={{ marginRight: '8px', color: '#669629' }} />
          <p style={{ marginTop: '10px' }}>
            Remote Sensing Analysis queried through Restor.
          </p>
        </div>
      </div>
      <IconBar>
        <IconButton
          buttonIcon={'pets'}
          active={displayedInsight == 'biodiversity'}
          onClick={() => setDisplayedInsight('biodiversity')}
          dataTooltipId={'remote-sensing-biodiversity-insight'}
        />
        <Tooltip id="remote-sensing-evapotranspiration-insight">
          Biodiversity
        </Tooltip>
        <IconButton
          buttonIcon={'forest'}
          active={displayedInsight == 'treeCover'}
          onClick={() => setDisplayedInsight('treeCover')}
          dataTooltipId={'remote-sensing-cover-insight'}
        />
        <Tooltip id="remote-sensing-cover-insight">Land and Tree Cover</Tooltip>

        <IconButton
          buttonIcon={'co2'}
          active={displayedInsight == 'carbon'}
          onClick={() => setDisplayedInsight('carbon')}
          dataTooltipId={'remote-sensing-carbon-insight'}
        />
        <Tooltip id="remote-sensing-carbon-insight">Carbon</Tooltip>

        <IconButton
          buttonIcon={'water_drop'}
          active={displayedInsight == 'water'}
          onClick={() => setDisplayedInsight('water')}
          dataTooltipId={'remote-sensing-evapotranspiration-insight'}
        />
        <Tooltip id="remote-sensing-evapotranspiration-insight">
          Evapotranspiration
        </Tooltip>
      </IconBar>
      {displayedInsight == 'biodiversity' && (
        <BiodiversityChart
          projectArea={activeProjectData?.project?.area}
          chartData={allData}
        />
      )}
      {displayedInsight == 'carbon' && (
        <CarbonChart
          projectArea={activeProjectData?.project?.area}
          chartData={allData?.carbon}
        />
      )}
      {displayedInsight == 'water' && (
        <WaterChart
          projectArea={activeProjectData?.project?.area}
          chartData={allData?.water}
        />
      )}
      {displayedInsight == 'treeCover' && (
        <TreeCoverChart
          projectArea={activeProjectData?.project?.area}
          treeData={allData?.treeCover}
          ecosystemsData={allData?.ecosystems}
          scientificMonitoring={allData?.scientificMonitoring}
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
