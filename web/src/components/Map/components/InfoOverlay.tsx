import { useState } from 'react'

import { Button } from './Button'
import { ProjectCard } from './ProjectCard'
import { WildlifeCard } from './WildlifeCard'

export const InfoOverlay = ({ result, activeFeature }) => {
  const [active, setActive] = useState<number>(1) // The currently active button
  // Position of the buttons go from left to right
  return (
    <div>
      <Button
        buttonIcon={'forest'}
        position={1}
        active={active == 1}
        onClick={() => setActive(1)}
      />
      <Button
        buttonIcon={'photo'}
        position={2}
        active={active == 2}
        onClick={() => setActive(2)}
      />
      <Button
        buttonIcon={'folder'}
        position={3}
        active={active == 3}
        onClick={() => setActive(3)}
      />
      {active == 1 && (
        <ProjectCard result={result} activeFeature={activeFeature} />
      )}
      {active == 2 && <WildlifeCard />}
    </div>
  )
}
