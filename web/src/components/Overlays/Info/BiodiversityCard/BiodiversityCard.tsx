/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import ThemedSkeleton from 'src/components/Map/components/Skeleton'
import { ToggleButton } from 'src/components/Map/components/ToggleButton'

import { InfoBox } from '../InfoBox'

import { AnimalPhoto } from './AnimalPhoto'
import {
  fetchTreePlantings,
  processBiodiversityData,
} from './biodiversityCardHelpers'
import { MeasuredDataPhoto } from './MeasuredDataPhoto'
export const BiodiversityCard = ({
  activeProjectData,
  mediaSize,
  maximize,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  const [biodiversity, setBiodiversity] = useState([])
  const [measuredData, setMeasuredData] = useState([])
  const [toggle, setToggle] = useState<'Predicted' | 'Measured'>('Predicted')
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'Name' | 'Count'>('Name')

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
          <PredictedAnimalsGrid biodiversity={biodiversity} />
        ) : (
          <MeasuredDataGrid
            measuredData={measuredData}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            handleSpeciesClick={handleSpeciesClick}
            selectedSpecies={selectedSpecies}
          />
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

const MeasuredDataGrid = ({
  sortBy,
  setSortBy,
  measuredData,
  handleSpeciesClick,
  selectedSpecies,
  loading,
  mediaSize,
}) => {
  if (loading) {
    return (
      <>
        <h3>
          <ThemedSkeleton width={'120px'} />
        </h3>
        <div></div>
      </>
    )
  } else {
    if (measuredData.length > 0) {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {measuredData.map((group, idx) => (
            <div style={{ flex: '1 1 50%' }} key={group.title + idx}>
              <div
                style={{
                  border: '1px solid #2f3030',
                  height: '80px',
                  width: '160px',
                  margin: '16px 0px',
                  borderRadius: '10px',
                }}
              >
                <h4 style={{ margin: '16px' }}>
                  Total {group.title.toLowerCase()}
                </h4>
                <h2 style={{ float: 'right', margin: '0 16px' }}>
                  {group.total}
                </h2>
              </div>
              <h3>{group.title}</h3>
              {group.title === 'Trees' && (
                <p style={{ marginTop: '8px' }}>
                  Click a species to highlight them on the map
                </p>
              )}
              <p>Sort By:</p>
              <ToggleButton
                mediaSize={mediaSize}
                active={sortBy}
                setToggle={setSortBy}
                options={['Name', 'Count']}
              />
              {group.species.map((species) => (
                <div
                  className={
                    species.name == selectedSpecies ? null : 'species-button'
                  }
                  key={species.name}
                >
                  <MeasuredDataPhoto
                    {...species}
                    handleSpeciesClick={handleSpeciesClick}
                    selectedSpecies={selectedSpecies}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    } else {
      return <p>There is not yet any measured biodiversity for this project.</p>
    }
  }
}

export const InfoTag = ({ style, children, ...props }) => {
  return (
    <div
      style={{
        width: 'fit-content',
        borderRadius: '5px',
        textAlign: 'center',
        userSelect: 'none',
        border: `1px solid`,
        borderColor: style.color,
        padding: '4px 8px',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          letterSpacing: '0.02em',
          fontSize: '0.75rem',
          color: style.color,
        }}
      >
        {children}
      </div>
    </div>
  )
}
