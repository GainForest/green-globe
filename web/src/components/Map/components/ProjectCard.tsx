import { countryToEmoji } from 'src/utils/countryToEmoji'

import { InfoBox } from './InfoBox'
import ThemedSkeleton from './Skeleton'

export const ProjectCard = ({ activeProjectData }) => {
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
        <p>
          {`${countryToEmoji[activeProjectData?.project?.country]?.emoji}
      ${countryToEmoji[activeProjectData?.project?.country]?.name}`}
        </p>
        <p>{activeProjectData?.project?.description}</p>
        <a
          href={`https://gainforest.app/overview/${projectId}`}
          target="_blank"
          rel="noreferrer"
        >
          <button
            style={{
              marginTop: '12px',
              border: 'none',
              borderRadius: '0.5em',
              backgroundColor: '#67962A',
              cursor: 'pointer',
              textAlign: 'center',
              color: '#ffffff',
              height: '40px',
              width: '150px',
            }}
          >
            Learn more
          </button>
        </a>
      </div>
    </InfoBox>
  )
}
