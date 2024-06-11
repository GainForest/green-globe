/* eslint-disable jsx-a11y/media-has-caption */
import { useSelector } from 'react-redux'

import { breakpoints } from 'src/constants'

import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const WildlifeCard = ({
  activeProjectData,
  mediaSize,
  toggle,
  setToggle,
  handleClick,
}) => {
  const maximized = useSelector((state: State) => state.overlays.maximized)

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
    <InfoBox mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Media</h1>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Photos', 'Videos']}
          mediaSize={mediaSize}
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
              <PhotoCard
                key={photo}
                photoEndpoint={photo}
                handleClick={handleClick}
                mediaSize={mediaSize}
                maximize={maximized}
              />
            ))}
            {photoEndpoints?.length === 0 && (
              <>This organization has not uploaded any photos.</>
            )}
          </div>
        )}
        {toggle == 'Videos' && (
          <div style={{ flex: '1 1 50%' }}>
            {videoEndpoints?.map((video) => (
              <VideoCard
                key={video}
                videoEndpoint={video}
                handleClick={handleClick}
                mediaSize={mediaSize}
                maximize={maximized}
              />
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

const PhotoCard = ({ photoEndpoint, handleClick, mediaSize, maximize }) => {
  return (
    <div className="community-photo">
      <img src={'/maximize.png'} alt="maximize" className="maximize-icon" />
      <button
        style={{
          padding: '0 0 20px 0',
          border: 0,
          background: 'transparent',
          cursor: 'pointer',
          width: '100%',
        }}
        onClick={() => handleClick(photoEndpoint)}
      >
        <img
          alt="Wildlife camera still"
          src={`${process.env.AWS_STORAGE}/${photoEndpoint}`}
          style={{
            maxWidth: maximize
              ? mediaSize >= breakpoints.xl
                ? '650px'
                : mediaSize >= breakpoints.m
                ? '600px'
                : mediaSize >= breakpoints.s
                ? '600px'
                : '300px'
              : mediaSize >= breakpoints.xl
              ? '300px'
              : mediaSize >= breakpoints.m
              ? '260px'
              : mediaSize >= breakpoints.s
              ? '600px'
              : '300px',
            objectFit: 'cover',
            padding: 0,
          }}
        />
      </button>
    </div>
  )
}

export const VideoCard = ({
  videoEndpoint,
  handleClick,
  mediaSize,
  maximize,
}) => {
  return (
    <div className="community-photo">
      <img src={'/maximize.png'} alt="maximize" className="maximize-icon" />
      <button
        style={{
          padding: '0 0 20px 0',
          border: 0,
          background: 'transparent',
          cursor: 'pointer',
          width: '100%',
        }}
        onClick={() => handleClick(videoEndpoint)}
      >
        <video
          src={`${process.env.AWS_STORAGE}/${videoEndpoint}`}
          style={{
            maxWidth: maximize
              ? mediaSize >= breakpoints.xl
                ? '650px'
                : mediaSize >= breakpoints.m
                ? '600px'
                : mediaSize >= breakpoints.s
                ? '600px'
                : '300px'
              : mediaSize >= breakpoints.xl
              ? '300px'
              : mediaSize >= breakpoints.m
              ? '260px'
              : mediaSize >= breakpoints.s
              ? '600px'
              : '300px',
            objectFit: 'cover',
            padding: 0,
          }}
          controls
        />
      </button>
    </div>
  )
}
