import { useThemeUI } from 'theme-ui'

import { countryToEmoji } from 'src/utils/countryToEmoji'

import { Button } from './Button'
import { InfoBox } from './InfoBox'
import ThemedSkeleton from './Skeleton'

export const ProjectCard = ({ activeProjectData }) => {
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
  const splash = activeProjectData?.project?.assets?.filter((d) =>
    d.classification?.includes('Splash')
  )[0]?.awsCID
  const area = Math.round(activeProjectData?.project?.area / 10000)

  return (
    <InfoBox>
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
      <div style={{ margin: '0 24px' }}>
        <h2>{activeProjectData?.project?.name || ''}</h2>
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

        <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
          {activeProjectData?.project?.longDescription.replaceAll('\\n', '\n')}
        </p>
        <a
          href={`https://gainforest.app/overview/${projectId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button>Learn more</Button>
        </a>
      </div>
    </InfoBox>
  )
}
