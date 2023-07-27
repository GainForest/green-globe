import { useThemeUI } from 'theme-ui'

import { countryToEmoji } from 'src/utils/countryToEmoji'

import Button from '../../../Map/components/Button'
import ThemedSkeleton from '../../../Map/components/Skeleton'
import { InfoBox } from '../InfoBox'

import { ProjectSiteButtons } from './ProjectSiteButtons'

export const ProjectCard = ({
  activeProjectData,
  activeProjectPolygon,
  setActiveProjectPolygon,
}) => {
  const { theme } = useThemeUI()
  if (!activeProjectData) {
    return (
      <InfoBox>
        <ThemedSkeleton height={250} />
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

  const projectId = activeProjectData?.project?.id

  return (
    <InfoBox>
      <ProjectSplash activeProjectData={activeProjectData} />
      <TextContainer>
        <h1>{activeProjectData?.project?.name || ''}</h1>
        <CountryAndArea theme={theme} activeProjectData={activeProjectData} />
        <ProjectSiteButtons
          assets={activeProjectData?.project?.assets}
          activeShapefile={activeProjectPolygon}
          setActiveShapefile={setActiveProjectPolygon}
        />
        <Description activeProjectData={activeProjectData} />
        <a
          href={`https://gainforest.app/overview/${projectId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button>Learn more</Button>
        </a>
      </TextContainer>
    </InfoBox>
  )
}

const ProjectSplash = ({ activeProjectData }) => {
  const splash = activeProjectData?.project?.assets?.filter((d) =>
    d.classification?.includes('Splash')
  )[0]?.awsCID

  if (splash) {
    return (
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