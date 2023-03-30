import { countryToEmoji } from 'src/utils/countryToEmoji'

import { InfoBox } from './InfoBox'

export const ProjectCard = ({ activeProjectData, activeFeature }) => {
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
        <h1>{activeFeature?.properties?.name || ''}</h1>
        <p>
          {`${countryToEmoji[activeProjectData?.project?.country]?.emoji}
      ${countryToEmoji[activeProjectData?.project?.country]?.name}`}
        </p>
        <p>{activeProjectData?.project?.description}</p>
      </div>
    </InfoBox>
  )
}
