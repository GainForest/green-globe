import React, { useEffect, useState } from 'react'

import { Info } from 'lucide-react'
import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'
import { ToggleButton } from 'src/components/Map/components/ToggleButton'

import { InfoBox } from '../InfoBox'
import { RestorPredictions } from '../Pokedex/RestorPredictions'

import {
  fetchTreePlantings,
  processBiodiversityData,
} from './biodiversityCardHelpers'
import { MeasuredDataGrid } from './MeasuredDataGrid'
import { PredictedBirds } from './PredictedBirds'

export const BiodiversityCard = ({
  activeProjectData,
  mediaSize,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  const [biodiversity, setBiodiversity] = useState([])
  const [measuredData, setMeasuredData] = useState([])
  const [toggle, setToggle] = useState<'Predictions' | 'Observations'>(
    'Predictions'
  )
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'Name' | 'Count'>('Name')
  const [displayedInsight, setDisplayedInsight] = useState('plants')

  useEffect(() => {
    if (!activeProjectData) {
      return
    }
    const { project } = activeProjectData
    if (project) {
      fetch(`${process.env.AWS_STORAGE}/mol/${project.id}.json`)
        .then((response) => response.json())
        .then((json) => {
          const biodiversity = json.map(processBiodiversityData)
          const treePlantingsEndpoint = `${project.name
            .toLowerCase()
            .split(/[\s_]+/)
            .join('-')}-all-tree-plantings.geojson`

          fetchTreePlantings(
            treePlantingsEndpoint,
            project,
            measuredData,
            setMeasuredData,
            setLoading
          )
          return setBiodiversity(biodiversity)
        })
    }
  }, [activeProjectData])

  useEffect(() => {
    if (sortBy === 'Name') {
      setMeasuredData(
        measuredData.map((group) => ({
          ...group,
          species: group.species.sort((a, b) =>
            a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
          ),
        }))
      )
    } else {
      setMeasuredData(
        measuredData.map((group) => ({
          ...group,
          species: group.species.sort((a, b) => b.count - a.count),
        }))
      )
    }
  }, [sortBy])

  const handleSpeciesClick = (species) => {
    if (selectedSpecies === species) {
      setSelectedSpecies(null)
    } else {
      setSelectedSpecies(species)
    }
  }

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
        <h1 style={{ wordWrap: 'normal', width: '80%', marginBottom: '8px' }}>
          Biodiversity
        </h1>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Predictions', 'Observations']}
        />
        {toggle === 'Predictions' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Info size={20} style={{ marginRight: '8px', color: '#669629' }} />
            <p style={{ marginTop: '10px' }}>
              Species that have been predicted for this site using species
              distribution models.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Info size={20} style={{ marginRight: '8px', color: '#669629' }} />
            <p style={{ marginTop: '10px' }}>
              Species that have been detected and measured for this site using
              observation data.
            </p>
          </div>
        )}
      </div>
      {toggle === 'Predictions' && (
        <IconBar>
          <IconButton
            buttonIcon={'eco'}
            active={displayedInsight === 'plants'}
            onClick={() => setDisplayedInsight('plants')}
          />
          <IconButton
            buttonIcon={'pets'}
            active={displayedInsight === 'birds'}
            onClick={() => setDisplayedInsight('birds')}
          />
        </IconBar>
      )}
      <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
        {toggle === 'Predictions' ? (
          <div>
            {displayedInsight === 'plants' && (
              <RestorPredictions
                mediaSize={mediaSize}
                activeProjectData={activeProjectData}
              />
            )}
            {displayedInsight === 'birds' && (
              <PredictedBirds mediaSize={mediaSize} />
            )}
          </div>
        ) : (
          <div>
            <MeasuredDataGrid
              loading={loading}
              measuredData={measuredData}
              setLoading={setLoading}
              mediaSize={mediaSize}
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedSpecies={selectedSpecies}
              handleSpeciesClick={handleSpeciesClick}
            />
          </div>
        )}
      </div>
    </InfoBox>
  )
}

const IconBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  gap: 6px;
  margin-left: 16px;
  margin-bottom: 16px;
`
