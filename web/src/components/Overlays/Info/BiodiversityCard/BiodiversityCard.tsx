/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { SOUNDSCAPE_PATHS } from 'config/soundscape_paths.js'
import * as d3 from 'd3'
import ThemedSkeleton from 'src/components/Map/components/Skeleton'
import { ToggleButton } from 'src/components/Map/components/ToggleButton'

import { InfoBox } from '../InfoBox'

import { AnimalPhoto } from './AnimalPhoto'
import {
  fetchTreePlantings,
  processBiodiversityData,
} from './biodiversityCardHelpers'
import { IndividualDataGrid } from './IndividualDataGrid'
import { MeasuredDataGrid } from './MeasuredDataGrid'
import { PredictedBirds } from './PredictedBirds'

export const BiodiversityCard = ({
  activeProjectData,
  mediaSize,
  maximize,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  const [biodiversity, setBiodiversity] = useState([])
  const [measuredData, setMeasuredData] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [toggle, setToggle] = useState<'Predicted' | 'Measured'>('Predicted')
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'Name' | 'Count'>('Name')

  // Fetch the finals_new.csv, and display each individual in the insect spy.
  useEffect(() => {
    d3.csv(`${process.env.AWS_STORAGE}/insectspy/finals_new.csv`)
      .then(setIndividuals)
      .then(() => setLoading(false))
  }, [])

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
            //removes whitespace and underscores
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

  // checks for typos between instances

  const handleSpeciesClick = (species) => {
    if (selectedSpecies === species) {
      setSelectedSpecies(null)
    } else {
      setSelectedSpecies(species)
    }
  }

  return (
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h1 style={{ wordWrap: 'normal', width: '80%', marginBottom: '8px' }}>
          Biodiversity
        </h1>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Predicted', 'Measured']}
        />
        {toggle === 'Predicted' ? (
          <div>
            <p>
              Predicted distribution of species habitats within 150km of the
              project area.
            </p>
            <p
              style={{
                fontSize: 10,
              }}
            >
              Data provided by <a href="https://mol.org/">Map of Life</a>
            </p>
          </div>
        ) : (
          <div>
            <h2>Measured Biodiversity</h2>
            <p>
              Species that have been measured for all the sites in this
              organization.
            </p>
          </div>
        )}
      </div>
      <div style={{ margin: '16px 24px' }}>
        {toggle === 'Predicted' ? (
          <div>
            <LiquicertBadgeFromCID pathCID='bafkreiaw45kqjymlycpiukfmnix2b63pmyxxoz6ctw7zmjspkr2utwqmku'/>
            <PredictedBirds />
            <PredictedAnimalsGrid biodiversity={biodiversity} />
          </div>
        ) : (
          <div>
            <h1>Circadian Rythmn</h1>
            <div>
              <p> Measured activity of different frequencies in the forest. </p>
            </div>
            {SOUNDSCAPE_PATHS.map((path) => (
              <img src={`${process.env.AWS_STORAGE}/${path}`} />
            ))}
            <IndividualDataGrid data={individuals} />
            <MeasuredDataGrid
              measuredData={measuredData}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              handleSpeciesClick={handleSpeciesClick}
              selectedSpecies={selectedSpecies}
            />
          </div>
        )}
      </div>
    </InfoBox>
  )
}

const PredictedAnimalsGrid = ({ biodiversity }) => {
  if (biodiversity.length) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {biodiversity.map((biodiversityGroup, idx) => (
          <div key={biodiversityGroup.title + idx} style={{ flex: '1 1 50%' }}>
            <h3>Predicted {biodiversityGroup.title}</h3>
            {biodiversityGroup.threatened.map((species) => (
              <div key={species.scientificname}>
                <AnimalPhoto species={species} taxa={biodiversityGroup.title} />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <>
        <h3>
          <ThemedSkeleton width={'120px'} />
        </h3>
        <div></div>
      </>
    )
  }
}
