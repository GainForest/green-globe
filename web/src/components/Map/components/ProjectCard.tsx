import { countryToEmoji } from 'src/utils/countryToEmoji'

import { InfoBox } from './InfoBox'

export const ProjectCard = ({ activeProjectData, activeFeature }) => {
  return (
    <InfoBox>
      <h1>{activeFeature?.properties?.name || ''}</h1>
      <p>
        {`${countryToEmoji[activeProjectData?.project?.country]?.emoji}
      ${countryToEmoji[activeProjectData?.project?.country]?.name}`}
      </p>
      <p>{activeProjectData?.project?.description}</p>
    </InfoBox>
  )
}
