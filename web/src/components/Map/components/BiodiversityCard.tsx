/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'

import { InfoBox } from './InfoBox'
import { ToggleButton } from './ToggleButton'

export const BiodiversityCard = ({ activeProjectData }) => {
  const [toggle, setToggle] = useState<'photo' | 'video'>('photo')
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
        <h2>Biodiversity prediction</h2>
        <p>
          Predicted distribution of species habitats within 150km of the project
          area.
        </p>
      </div>
      <div style={{ margin: '16px 24px' }}>
        <PredictedAnimalsGrid biodiversity={biodiversity} />
      </div>
      <div style={{ margin: '16px 24px' }}>
        <h2>Observed Wildlife</h2>
        <ToggleButton active={toggle} setToggle={setToggle} />
        <div style={{ height: '24px', width: '100%' }} />
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
                <AnimalPhoto species={species} />
                {/* <Heading as="h2">{s.scientificname + ' '}</Heading> */}
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
          <Skeleton />
        </h3>
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

const AnimalPhoto = ({ species }: { species: Species }) => {
  return (
    <img
      alt={species.common}
      src={species.image_url}
      style={{
        objectFit: 'cover',
        clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
        height: '120px',
        width: '120px',
      }}
    />
  )
}
