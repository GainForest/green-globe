/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { breakpoints } from 'src/constants'
import { setFullscreenOverlay } from 'src/reducers/fullscreenOverlayReducer'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'

import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const MediaCard = ({
  activeProjectData,
  mediaSize,
  toggle,
  setToggle,
}) => {
  const [photoEndpoints, setPhotoEndpoints] = useState([])
  const [videoEndpoints, setVideoEndpoints] = useState([])
  const maximized = useSelector((state: State) => state.overlays.maximized)
  const isOverlayActive = useSelector((state: State) => state.overlays.active)
  const dispatch = useDispatch()
  const infoOverlay = useSelector((state: State) => state.overlays.info)

  const useToggle = (action) => {
    if (action == 'Photos') {
      dispatch(setInfoOverlay('media-photos'))
    } else {
      dispatch(setInfoOverlay('media-videos'))
    }
    setToggle(action)
  }

  useEffect(() => {
    const setEndpoints = async () => {
      let videos = []
      let photos = []
      const photoLinks = activeProjectData?.project?.assets?.filter(
        (d) =>
          (d.classification.includes('Camera Traps') ||
            d.classification.includes('Community Photos')) &&
          (d.awsCID.includes('.jpg') ||
            d.awsCID.includes('.JPG') ||
            d.awsCID.includes('.jpeg') ||
            d.awsCID.includes('.png') ||
            d.awsCID.includes('.gif'))
      )
      photos = photoLinks?.map((photo) => photo.awsCID)
      const videoLinks = activeProjectData?.project?.assets?.filter(
        (d) =>
          d.classification.includes('Camera Traps') && d.awsCID.includes('.mp4')
      )
      videos = videoLinks?.map((video) => video.awsCID || '')

      setPhotoEndpoints(photos)
      setVideoEndpoints(videos)
    }
    setEndpoints()
  }, [activeProjectData])

  const onMediaClick = ({ endpoint, type }) => {
    dispatch(setFullscreenOverlay({ source: endpoint, active: true }))
    const filepath = endpoint.split('/')
    dispatch(setInfoOverlay(`media-${type}-${filepath[filepath.length - 1]}`))
  }

  //
  useEffect(() => {
    if (photoEndpoints?.length > 0 || videoEndpoints?.length > 0) {
      const urlSlug = infoOverlay.split('-')
      if (urlSlug.length > 2 && !isOverlayActive) {
        let source
        const filename = urlSlug[urlSlug.length - 1]
        if (toggle == 'Photos') {
          for (const photo of photoEndpoints) {
            if (photo.includes(filename)) {
              source = photo
            }
          }
        } else {
          for (const video in videoEndpoints) {
            if (video.includes(filename)) {
              source = video
            }
          }
        }
        if (source) {
          dispatch(setFullscreenOverlay({ source, active: true }))
        } else {
          dispatch(setInfoOverlay(`media-${toggle.toLowerCase()}`))
        }
      }
    }
  }, [
    photoEndpoints,
    videoEndpoints,
    dispatch,
    isOverlayActive,
    infoOverlay,
    toggle,
  ])

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
        <h1 style={{ marginBottom: '8px' }}>Images & Videos</h1>
        <ToggleButton
          active={toggle}
          setToggle={useToggle}
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
        {infoOverlay.startsWith('media-photos') && (
          <div style={{ flex: '1 1 50%' }}>
            {photoEndpoints?.map((photo) => (
              <PhotoCard
                key={photo}
                photoEndpoint={photo}
                mediaSize={mediaSize}
                maximize={maximized}
                onMediaClick={onMediaClick}
              />
            ))}
            {photoEndpoints?.length === 0 && (
              <>This organization has not uploaded any photos.</>
            )}
          </div>
        )}
        {infoOverlay.startsWith('media-videos') && (
          <div style={{ flex: '1 1 50%' }}>
            {videoEndpoints?.map((video) => (
              <VideoCard
                key={video}
                videoEndpoint={video}
                mediaSize={mediaSize}
                maximize={maximized}
                onMediaClick={onMediaClick}
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

const PhotoCard = ({ photoEndpoint, mediaSize, maximize, onMediaClick }) => {
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
        onClick={() => {
          onMediaClick({ endpoint: photoEndpoint, type: 'photo' })
        }}
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
  mediaSize,
  maximize,
  onMediaClick,
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
        onClick={() => onMediaClick({ endpoint: videoEndpoint, type: 'video' })}
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
