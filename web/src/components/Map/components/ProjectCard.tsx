import { countryToEmoji } from 'src/utils/countryToEmoji'

import { InfoBox } from './InfoBox'
import ThemedSkeleton from './Skeleton'

export const ProjectCard = ({ activeProjectData }) => {
  if (!activeProjectData) {
    return (
      <InfoBox>
        <ThemedSkeleton height={250} />
      </InfoBox>
    )
  }

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
      <div style={{ margin: '8px 24px' }}>
        <h1>{activeProjectData?.project?.name || ''}</h1>
        <p>
          {`${countryToEmoji[activeProjectData?.project?.country]?.emoji}
      ${countryToEmoji[activeProjectData?.project?.country]?.name}`}
        </p>
        <p>{activeProjectData?.project?.description}</p>
      </div>
    </InfoBox>
  )
}
