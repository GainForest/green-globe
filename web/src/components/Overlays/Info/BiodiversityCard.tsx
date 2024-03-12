/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { getTreePhotos } from 'src/components/Map/maptreeutils'

import ThemedSkeleton from '../../Map/components/Skeleton'
import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const BiodiversityCard = ({ activeProjectData }) => {
  const [biodiversity, setBiodiversity] = useState([])
  const [measuredData, setMeasuredData] = useState([])
  const [toggle, setToggle] = useState<'Predicted' | 'Measured'>('Predicted')

  useEffect(() => {
    if (!activeProjectData) {
      return
    }
    const { project } = activeProjectData
    if (project) {
      fetch(
        `https://api.mol.org/1.x/spatial/species/list?lang=en&lat=${project.lat}&lng=${project.lon}&radius=150000`
      )
        .then((response) => response.json())
        .then((json) => {
          const biodiversity = json.map((b) => {
            const threatened = b.species.filter(
              (d) =>
                d.redlist === 'CR' ||
                d.redlist === 'EN' ||
                d.redlist === 'VU' ||
                d.redlist === 'EW'
            )
            const numThreatened = threatened.length
            const lowRisk = b.species.filter(
              (d) =>
                d.redlist === 'CD' || d.redlist === 'NT' || d.redlist === 'LC'
            )
            const numLowRisk = lowRisk.length
            const numExtinct = b.species.filter((d) => d.redlist == 'EX').length
            const dataDeficient = b.species.filter(
              (d) => d.redlist === 'DD' || !d.redlist
            )
            const numDataDeficient = dataDeficient.length
            const total = b.species.length
            const threatenedPercentage = (numThreatened + numExtinct) / total
            const lowRiskPercentage = numLowRisk / total
            const dataDeficientPercentage = numDataDeficient / total
            return {
              ...b,
              numExtinct,
              lowRisk,
              numLowRisk,
              dataDeficient,
              numDataDeficient,
              threatened,
              numThreatened,
              threatenedPercentage,
              lowRiskPercentage,
              dataDeficientPercentage,
            }
          })
          const treePlantings = `${project.name
            .toLowerCase()
            //removes whitespace and underscores
            .split(/[\s_]+/)
            .join('-')}-all-tree-plantings.geojson`
          fetch(`${process.env.AWS_STORAGE}/shapefiles/${treePlantings}`)
            .then((response) => response.json())
            .then((json) => {
              const speciesCount = {}
              let total = 0
              const similarityThreshold = 3
              json.features.map((tree) => {
                let species =
                  tree.properties.species || tree.properties.Plant_Name
                if (species) {
                  species = species.trim()
                  species = toTitleCase(species)

                  let isSimilar = false
                  Object.keys(speciesCount).forEach((existingSpecies) => {
                    const distance = stringDistance(species, existingSpecies)
                    if (distance <= similarityThreshold) {
                      isSimilar = true
                      species = existingSpecies
                    }
                  })

                  if (!isSimilar) {
                    const imageUrl = getTreePhotos(tree.properties, project.id)

                    speciesCount[species] = {
                      name: species,
                      count: 1,
                      imageUrl,
                      tallest: parseFloat(
                        tree.properties.height || tree.properties.Height
                      ),
                      shortest: parseFloat(
                        tree.properties.height || tree.properties.Height
                      ),
                      average: parseFloat(
                        tree.properties.height || tree.properties.Height
                      ),
                    }
                  } else {
                    const currObj = speciesCount[species]
                    speciesCount[species] = {
                      ...currObj,
                      count: currObj.count + 1,
                      tallest: Math.max(
                        currObj.tallest,
                        parseFloat(
                          tree.properties.height || tree.properties.Height
                        )
                      ),
                      shortest: Math.min(
                        currObj.shortest,
                        parseFloat(
                          tree.properties.height || tree.properties.Height
                        )
                      ),
                      average:
                        parseFloat(
                          tree.properties.height || tree.properties.Height
                        ) + currObj.average,
                    }
                  }
                } else {
                  if ('Unknown' in speciesCount) {
                    speciesCount['Unknown'].count += 1
                  } else {
                    speciesCount['Unknown'] = {
                      name: 'Unknown',
                      count: 1,
                    }
                  }
                }
                total += 1
              })

              const speciesArray = Object.keys(speciesCount).map((species) => ({
                ...speciesCount[species],
                average:
                  // round to two decimals
                  Math.round(
                    (speciesCount[species].average /
                      speciesCount[species].count) *
                      100
                  ) / 100,
              }))
              setMeasuredData([
                ...measuredData,
                { title: 'Trees', species: speciesArray, total },
              ])
            })
          return setBiodiversity(biodiversity)
        })
    }
  }, [activeProjectData])

  // checks for typos between instances
  const stringDistance = (a, b) => {
    const matrix = []

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          )
        }
      }
    }

    return matrix[b.length][a.length]
  }

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  return (
    <InfoBox>
      <div style={{ margin: '16px 24px' }}>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Predicted', 'Measured']}
        />
        {toggle === 'Predicted' ? (
          <div>
            <h2>Biodiversity Predictions</h2>
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
            biodiversity={biodiversity}
          />
        )}
      </div>
    </InfoBox>
  )
}

const PredictedAnimalsGrid = ({ biodiversity }) => {
  if (biodiversity.length) {
    return (
      <>
        {biodiversity.map((biodiversityGroup) => (
          <div key={biodiversityGroup.title}>
            <h3>Predicted {biodiversityGroup.title}</h3>
            {biodiversityGroup.threatened.map((species) => (
              <div key={species.scientificname}>
                <AnimalPhoto species={species} taxa={biodiversityGroup.title} />
              </div>
            ))}
          </div>
        ))}
      </>
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

const MeasuredDataGrid = ({ measuredData, biodiversity }) => {
  // if data hasn't loaded yet, return skeleton
  if (biodiversity.length > 0) {
    // if data is loaded but no measured data, return "no data" message
    if (measuredData.length > 0) {
      return (
        <>
          {measuredData.map((group) => (
            <div key={group.title}>
              <p>
                {' '}
                Total {group.title.toLowerCase()}: {group.total}
              </p>
              <h3>{group.title}</h3>
              {group.species.map((species) => (
                <div key={species.name}>
                  <MeasuredDataPhoto {...species} />
                </div>
              ))}
            </div>
          ))}
        </>
      )
    } else {
      return <p>There is not yet any measured biodiversity for this project.</p>
    }
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

interface MeasuredSpecies {
  imageUrl: string
  name: string
  shortest: number
  tallest: number
  average: number
  count: number
}

const MeasuredDataPhoto = (species: MeasuredSpecies) => {
  const src = species.imageUrl
    ? species.imageUrl
    : `https://mol.org/static/img/groups/taxa_plants.png`

  return (
    <div style={{ display: 'flex' }}>
      <img
        alt={species.name}
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
        <p style={{ fontSize: '1rem', marginBottom: '0px' }}>{species.name}</p>
        <i style={{ fontSize: '0.75rem', display: 'block' }}>
          Count: {species.count}
        </i>
        {typeof species.tallest === 'number' && !isNaN(species.tallest) && (
          <div>
            <i style={{ fontSize: '0.75rem', display: 'block' }}>
              Tallest: {species.tallest} m
            </i>
            <i style={{ fontSize: '0.75rem', display: 'block' }}>
              Shortest: {species.shortest} m
            </i>
            <i style={{ fontSize: '0.75rem', display: 'block' }}>
              Average: {species.average} m
            </i>
          </div>
        )}
        {/* <RedlistStatus redlist={species.redlist} /> */}
      </div>
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
