/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react'

import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const WildlifeCard = ({ activeProjectData, mediaSize, maximize }) => {
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
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h2>Photos</h2>
        <div style={{ width: '100%', height: '12px' }} />
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Photos', 'Videos']}
        />
        <div
          style={{
            height: '24px',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        />
        {toggle == 'Photos' && (
          <div style={{ flex: '1 1 50%' }}>
            {photoEndpoints?.map((photo) => (
              <PhotoCard key={photo} photoEndpoint={photo} />
            ))}
            {photoEndpoints?.length === 0 && (
              <>This organization has not uploaded any photos.</>
            )}
          </div>
        )}
        {toggle == 'Videos' && (
          <div style={{ flex: '1 1 50%' }}>
            {videoEndpoints?.map((video) => (
              <VideoCard key={video} videoEndpoint={video} />
            ))}
            {videoEndpoints?.length === 0 && (
              <>This organization has not uploaded any videos.</>
            )}
          </div>
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
          height: '280px',
          objectFit: 'cover',
          padding: '20px',
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
          height: '280px',
          objectFit: 'cover',
          paddingTop: '20px',
        }}
        controls
      />
    </>
  )
}
