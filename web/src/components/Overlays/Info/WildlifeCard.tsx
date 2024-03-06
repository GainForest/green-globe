/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useEffect } from 'react'

import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const WildlifeCard = ({ activeProjectData }) => {
  const [toggle, setToggle] = useState<'Photos' | 'Videos'>('Photos')

  const projectId = activeProjectData?.project?.id
  const photos = activeProjectData?.project?.assets?.filter(
    (d) =>
      (d.classification.includes('Camera Traps') ||
        d.classification.includes('Community Photos')) &&
      d.awsCID.includes('.jpg')
  )
  const photoEndpoints = photos?.map((photo) => photo.awsCID)
  const videos = activeProjectData?.project?.assets?.filter(
    (d) =>
      d.classification.includes('Camera Traps') && d.awsCID.includes('.mp4')
  )
  const videoEndpoints = videos?.map((video) => video.awsCID || '')

  return (
    <InfoBox>
      <div style={{ margin: '16px 24px' }}>
        <h2>Photos</h2>
        <div style={{ width: '100%', height: '12px' }} />
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Photos', 'Videos']}
        />
        <div style={{ height: '24px', width: '100%' }} />
        {toggle == 'Photos' && (
          <>
            {photoEndpoints?.map((photo) => (
              <PhotoCard key={photo} photoEndpoint={photo} />
            ))}
            {photoEndpoints?.length === 0 ? (
              <>This organization has not uploaded any photos.</>
            ) : (
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
            )}
          </>
        )}
        {toggle == 'Videos' && (
          <>
            {videoEndpoints?.map((video) => (
              <VideoCard key={video} videoEndpoint={video} />
            ))}
            {videoEndpoints?.length === 0 ? (
              <>This organization has not uploaded any videos.</>
            ) : (
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
            )}
          </>
        )}
      </div>
    </InfoBox>
  )
}

const PhotoCard = ({ photoEndpoint }) => {
  return (
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
    </>
  )
}

const VideoCard = ({ videoEndpoint }) => {
  return (
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
    </>
  )
}
