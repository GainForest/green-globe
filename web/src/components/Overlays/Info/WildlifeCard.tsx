/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react'

import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const WildlifeCard = ({ activeProjectData }) => {
  const [toggle, setToggle] = useState<'photo' | 'video'>('photo')

  const projectId = activeProjectData?.project?.id
  const photoEndpoint =
    activeProjectData?.project?.assets?.filter(
      (d) =>
        d.classification.includes('Camera Traps') && d.awsCID.includes('.jpg')
    )?.[0]?.awsCID || ''
  const videoEndpoint =
    activeProjectData?.project?.assets?.filter(
      (d) =>
        d.classification.includes('Camera Traps') && d.awsCID.includes('.mp4')
    )?.[0]?.awsCID || ''

  return (
    <InfoBox>
      <div style={{ margin: '16px 24px' }}>
        <h2>Observed Wildlife</h2>
        <div style={{ width: '100%', height: '12px' }} />
        <ToggleButton active={toggle} setToggle={setToggle} />
        <div style={{ height: '24px', width: '100%' }} />
        {toggle == 'photo' && (
          <PhotoCard projectId={projectId} photoEndpoint={photoEndpoint} />
        )}
        {toggle == 'video' && (
          <VideoCard projectId={projectId} videoEndpoint={videoEndpoint} />
        )}
      </div>
    </InfoBox>
  )
}

const PhotoCard = ({ projectId, photoEndpoint }) => {
  return photoEndpoint.length ? (
    <>
      <img
        alt="Wildlife camera still"
        src={`${process.env.AWS_STORAGE}/${photoEndpoint}`}
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'cover',
          paddingTop: '20px',
        }}
      />
      <p>
        For more, visit the{' '}
        <a
          href={`${process.env.GAINFOREST_ENDPOINT}/data/${projectId}`}
          target="_blank"
          rel="noreferrer"
        >
          transparency dashboard
        </a>
        .
      </p>
    </>
  ) : (
    <>This project has not uploaded any wildlife photos.</>
  )
}

const VideoCard = ({ projectId, videoEndpoint }) => {
  return videoEndpoint.length ? (
    <>
      <video
        src={`${process.env.AWS_STORAGE}/${videoEndpoint}`}
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'cover',
          paddingTop: '20px',
        }}
        controls
      />
      <p>
        For more, visit the{' '}
        <a
          href={`${process.env.GAINFOREST_ENDPOINT}/data/${projectId}`}
          target="_blank"
          rel="noreferrer"
        >
          transparency dashboard
        </a>
        .
      </p>
    </>
  ) : (
    <>This project has not uploaded any wildlife videos.</>
  )
}
