import { useEffect, useState } from 'react'

import { useThemeUI } from 'theme-ui'

import { breakpoints } from 'src/constants'
import { countryToEmoji } from 'src/utils/countryToEmoji'

import ThemedSkeleton from '../../../Map/components/Skeleton'
import { InfoBox } from '../InfoBox'
import { VideoCard } from '../WildlifeCard'

import { ProjectSiteButtons } from './ProjectSiteButtons'

export const ProjectCard = ({
  activeProjectData,
  activeProjectPolygon,
  setActiveProjectPolygon,
  mediaSize,
  maximize,
  handleClick,
}) => {
  const [promoVideo, setPromoVideo] = useState('')

  const { theme } = useThemeUI()

  useEffect(() => {
    const video = activeProjectData?.project?.assets?.find(
      (d) => d.classification == 'Promotional Video'
    )
    if (video) {
      setPromoVideo(video.awsCID)
    } else {
      setPromoVideo('')
    }
  }, [activeProjectData])

  if (!activeProjectData) {
    return (
      <InfoBox mediaSize={mediaSize} maximize={maximize}>
        <ThemedSkeleton />
        <div style={{ margin: '8px 24px' }}>
          <h1>
            <ThemedSkeleton width={'80%'} />
          </h1>
          <p>
            <ThemedSkeleton width={'100px'} />
          </p>
          <p>
            <ThemedSkeleton count={3.5} />
          </p>
        </div>
      </InfoBox>
    )
  }

  return (
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
      <ProjectSplash
        activeProjectData={activeProjectData}
        promoVideo={promoVideo}
        handleClick={handleClick}
      />
      <TextContainer>
        <h1
          style={{
            fontSize:
              mediaSize >= breakpoints.xl
                ? 24
                : mediaSize > breakpoints.m
                ? 22
                : mediaSize > breakpoints.s
                ? 18
                : 16,
          }}
        >
          {activeProjectData?.project?.name || ''}
        </h1>
        <CountryAndArea theme={theme} activeProjectData={activeProjectData} />
        <ProjectSiteButtons
          assets={activeProjectData?.project?.assets}
          activeShapefile={activeProjectPolygon}
          setActiveShapefile={setActiveProjectPolygon}
        />
        <Description activeProjectData={activeProjectData} />
      </TextContainer>
    </InfoBox>
  )
}

const ProjectSplash = ({ activeProjectData, promoVideo, handleClick }) => {
  const splash = activeProjectData?.project?.assets?.filter((d) =>
    d.classification?.includes('Splash')
  )[0]?.awsCID

  if (splash) {
    return (
      <div
        className={promoVideo && 'community-photo'}
        style={{ width: '100%', height: '250px' }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            width: '100%',
            height: '250px',
          }}
          onClick={() => promoVideo && handleClick(promoVideo, 'video')}
        >
          <img
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
            src={`${process.env.AWS_STORAGE}/${splash}`}
            alt="Project Splash"
          />
          {promoVideo && (
            <img
              style={{
                width: '24px',
                height: '24px',
                position: 'absolute',
                left: '16px',
                top: '208px',
                opacity: '75%',
              }}
              src={'/play.png'}
              alt="play"
            />
          )}
        </button>
      </div>
    )
  } else {
    return <ThemedSkeleton height={250} />
  }
}

const TextContainer = ({ children }) => (
  <div style={{ margin: '0 24px' }}>{children}</div>
)

const CountryAndArea = ({ activeProjectData, theme }) => {
  const area = Math.round(activeProjectData?.project?.area / 10000)
  return (
    <p style={{ fontSize: '0.75rem' }}>
      {`${countryToEmoji[activeProjectData?.project?.country]?.emoji}
${countryToEmoji[activeProjectData?.project?.country]?.name}`}
      {area > 0 && (
        <>
          <span
            style={{
              margin: '0 8px',
              color: theme.colors.secondary as string,
            }}
          >
            {'|'}
          </span>
          {area} {area == 1 ? 'hectare' : 'hectares'}
        </>
      )}
    </p>
  )
}

const Description = ({ activeProjectData }) => (
  <>
    <h3>Description</h3>
    <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
      {activeProjectData?.project?.longDescription.replaceAll('\\n', '\n')}
    </p>
  </>
)
