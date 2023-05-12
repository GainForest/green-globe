/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { InfoBox } from './InfoBox'
import ThemedSkeleton from './Skeleton'

export const BiodiversityCard = ({ activeProjectData }) => {
  const [biodiversity, setBiodiversity] = useState([])

  useEffect(() => {
    if (!activeProjectData) return
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
          return setBiodiversity(biodiversity)
        })
    }
  }, [activeProjectData])

  return (
    <InfoBox>
      <div style={{ margin: '16px 24px' }}>
        <h2>Biodiversity Predictions</h2>
        <p>
          Predicted distribution of species habitats within 150km of the project
          area.
        </p>
      </div>
      <div style={{ margin: '16px 24px' }}>
        <PredictedAnimalsGrid biodiversity={biodiversity} />
      </div>
    </InfoBox>
  )
}

const PredictedAnimalsGrid = ({ biodiversity }) => {
  if (biodiversity.length) {
    return (
      <>
        {biodiversity.map((biodiversityGroup) => (
          <>
            <h3 key={biodiversityGroup.title}>
              Predicted {biodiversityGroup.title}
            </h3>
            {biodiversityGroup.threatened.map((species) => (
              <div key={species.name}>
                <AnimalPhoto species={species} taxa={biodiversityGroup.title} />
                {/* <RedlistStatus redlist={s.redlist} /> */}
              </div>
            ))}
          </>
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
