import { useState } from 'react'

import { BiodiversityCard } from './BiodiversityCard'
import { InfoOverlayButton } from './Button'
import { CommunityCard } from './CommunityCard'
import { DiscordCard } from './DiscordCard'
import { ExitProjectView } from './ExitProjectView'
import { ProjectCard } from './ProjectCard'
import { WildlifeCard } from './WildlifeCard'

export const InfoOverlay = ({ activeProjectData, setDisplayOverlay }) => {
  const [active, setActive] = useState<number>(1) // The currently active button
  // Position of the buttons go from left to right
  return (
    <>
      <ExitProjectView setDisplayBox={setDisplayOverlay} />
      <InfoOverlayButton
        buttonIcon={'forest'}
        position={1}
        active={active == 1}
        onClick={() => setActive(1)}
      />
      <InfoOverlayButton
        buttonIcon={'pets'}
        position={2}
        active={active == 2}
        onClick={() => setActive(2)}
      />
      <InfoOverlayButton
        buttonIcon={'photo'}
        position={3}
        active={active == 3}
        onClick={() => setActive(3)}
      />
      <InfoOverlayButton
        buttonIcon={'emoji_people'}
        position={4}
        active={active == 4}
        onClick={() => setActive(4)}
      />
      <InfoOverlayButton
        buttonIcon={'chat'}
        position={5}
        active={active == 5}
        onClick={() => setActive(5)}
      />
      {active == 1 && <ProjectCard activeProjectData={activeProjectData} />}
      {active == 2 && (
        <BiodiversityCard activeProjectData={activeProjectData} />
      )}
      {active == 3 && <WildlifeCard activeProjectData={activeProjectData} />}
      {active == 4 && <CommunityCard activeProjectData={activeProjectData} />}
      {active == 5 && <DiscordCard activeProjectData={activeProjectData} />}
    </>
  )
}
