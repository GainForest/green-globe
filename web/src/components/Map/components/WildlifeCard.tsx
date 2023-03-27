/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react'

import { InfoBox } from './InfoBox'
import { ToggleButton } from './ToggleButton'

export const WildlifeCard = ({ activeFeature, activeProjectData }) => {
  const [toggle, setToggle] = useState<'photo' | 'video'>('photo')

  const projectId = activeFeature?.properties?.projectId
  const wildlifePhoto =
    activeProjectData?.project?.assets?.filter(
      (d) =>
        d.classification.includes('Camera Traps') && d.awsCID.includes('.jpg')
    )?.[0]?.awsCID || ''
  const wildlifeVideo =
    activeProjectData?.project?.assets?.filter(
      (d) =>
        d.classification.includes('Camera Traps') && d.awsCID.includes('.mp4')
    )?.[0]?.awsCID || ''

  return (
    <InfoBox>
      <ToggleButton active={toggle} setToggle={setToggle} />
      {wildlifePhoto.length ? (
        <>
          <img
            alt="Wildlife camera still"
            src={`${process.env.AWS_STORAGE}/${wildlifePhoto}`}
            style={{
              width: '100%',
              height: '280px',
              objectFit: 'cover',
              paddingTop: '20px',
            }}
          />
          <p>
            {wildlifePhoto}
            For more, visit the{' '}
            <a href={`https://gainforest.app/data/${projectId}`}>
              transparency dashboard
            </a>
            .
          </p>
        </>
      ) : (
        'This project has not uploaded a wildlife photo.'
      )}
      {wildlifeVideo.length ? (
        <>
          <video
            src={`${process.env.AWS_STORAGE}/${wildlifeVideo}`}
            style={{
              width: '100%',
              height: '280px',
              objectFit: 'cover',
              paddingTop: '20px',
            }}
          />
          <p>
            {wildlifePhoto}
            For more, visit the{' '}
            <a href={`https://gainforest.app/data/${projectId}`}>
              transparency dashboard
            </a>
            .
          </p>
        </>
      ) : (
        'This project has not uploaded a wildlife video.'
      )}
    </InfoBox>
  )
}
