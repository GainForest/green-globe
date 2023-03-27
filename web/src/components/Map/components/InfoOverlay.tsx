import { useState } from 'react'

import { Button } from './Button'
import { ExitProjectView } from './ExitProjectView'
import { ProjectCard } from './ProjectCard'
import { WildlifeCard } from './WildlifeCard'

export const InfoOverlay = ({ result, activeFeature, setDisplayOverlay }) => {
  const [active, setActive] = useState<number>(1) // The currently active button
  const projectId = activeFeature?.properties?.projectId
  // Position of the buttons go from left to right
  return (
    <>
      <ExitProjectView setDisplayBox={setDisplayOverlay} />
      <Button
        buttonIcon={'forest'}
        position={1}
        active={active == 1}
        onClick={() => {
          setActive(1)
        }}
      />
      <Button
        buttonIcon={'photo'}
        position={2}
        active={active == 2}
        onClick={() => setActive(2)}
      />
      {active == 1 && (
        <ProjectCard result={result} activeFeature={activeFeature} />
      )}
      {active == 2 && <WildlifeCard projectId={projectId} />})
    </>
  )
}
