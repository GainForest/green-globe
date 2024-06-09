/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import ThemedSkeleton from 'src/components/Map/components/Skeleton'
import { ToggleButton } from 'src/components/Map/components/ToggleButton'

import { InfoBox } from '../InfoBox'

import {
  fetchTreePlantings,
  processBiodiversityData,
} from './biodiversityCardHelpers'
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

interface Species {
  image_url: string
  common: string
  family: string
  family_common: string
  scientificname: string
  redlist: string
}

const AnimalPhoto = ({ species, taxa }: { species: Species; taxa: string }) => {
  const src = species.image_url
    ? species.image_url
    : `https://mol.org/static/img/groups/taxa_${
        !taxa.includes('(')
          ? taxa.toLowerCase()
          : taxa.split(' ')[0].toLowerCase()
      }.png`

  return (
    <div style={{ display: 'flex' }}>
      <img
        alt={species.common}
        src={src}
        style={{
          objectFit: 'cover',
          clipPath:
            'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
          height: '120px',
          width: '120px',
        }}
      />
      <div style={{ margin: '12px 0 0 24px' }}>
        <p style={{ fontSize: '1rem', marginBottom: '0px' }}>
          {species.common}
        </p>
        <i style={{ fontSize: '0.75rem' }}>{species.scientificname}</i>
        <RedlistStatus redlist={species.redlist} />
      </div>
    </div>
  )
}

interface DataAndHandler {
  imageUrl: string
  name: string
  shortest: number
  tallest: number
  average: number
  count: number
  handleSpeciesClick: (name: string) => void
  selectedSpecies: string
}

const MeasuredDataPhoto = (props: DataAndHandler) => {
  const src = props.imageUrl
    ? props.imageUrl
    : `https://mol.org/static/img/groups/taxa_plants.png`

  return (
    <div
      className={props.name == props.selectedSpecies ? null : 'species-button'}
      style={{
        display: 'flex',
        backgroundColor:
          props.name == props.selectedSpecies ? '#4a4a4a' : '#22252a',
        position: 'relative',
        padding: '10px',
      }}
    >
      <button
        className={
          props.name == props.selectedSpecies ? null : 'species-button'
        }
        style={{
          display: 'flex',
          backgroundColor:
            props.name == props.selectedSpecies ? '#4a4a4a' : '#22252a',
          border: 'none',
          cursor: 'pointer',
          flex: '1',
        }}
        onClick={() => props.handleSpeciesClick(props.name)}
      >
        <img
          alt={props.name}
          src={src}
          style={{
            objectFit: 'cover',
            clipPath:
              'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
            height: '120px',
            width: '120px',
            minWidth: '120px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '24px',
            flex: '1',
            position: 'relative',
          }}
        >
          <p style={{ color: 'white', fontSize: '1rem', marginBottom: '4px' }}>
            {props.name}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
              fontSize: '0.75rem',
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(+50%)',
              textAlign: 'right',
            }}
          >
            <span>Count: {props.count}</span>
            {typeof props.tallest === 'number' && !isNaN(props.tallest) && (
              <>
                <span>Tallest: {props.tallest} m</span>
                <span>Shortest: {props.shortest} m</span>
                <span>Average: {props.average} m</span>
              </>
            )}
          </div>
          {/* <RedlistStatus redlist={props.redlist} /> */}
        </div>
      </button>
    </div>
  )
}

const RedlistStatus = ({ redlist }) => {
  const colors = {
    EX: 'black',
    EW: 'black',
    RE: '#bc85d9', // purple
    CR: '#f07071', // red
    EN: '#ea9755', // orange
    VU: '#d4c05e', // yellow
    LR: '#d4c05e', // yellow
    NT: '#67962A', // green
    LC: '#67962A', // green
    DD: '#a9b4c4', // grey
  }
  const color = colors[redlist]
  const redlistStatus = redlist ? redlist : 'Not Evaluated'
  return (
    <InfoTag key="redlist-status" style={{ color, marginTop: '8px' }}>
      {translations[redlistStatus]}
    </InfoTag>
  )
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

const translations = {
  ['EX']: 'Extinct',
  ['EW']: 'Extinct in The Wild',
  ['RE']: 'Regionally Extinct',
  ['CR']: 'Critically Endangered',
  ['EN']: 'Endangered',
  ['VU']: 'Vulnerable',
  ['LR']: 'Lower Risk',
  ['NT']: 'Near Threatened',
  ['LC']: 'Least Concern',
  ['DD']: 'Data Deficient',
  ['Not Evaluated']: 'Not Evaluated',
}
