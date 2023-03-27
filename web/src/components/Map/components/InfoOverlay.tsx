import { useState } from 'react'

import { Button } from './Button'
import { ExitProjectView } from './ExitProjectView'
import { ProjectCard } from './ProjectCard'
import { WildlifeCard } from './WildlifeCard'

export const InfoOverlay = ({ result, activeFeature }) => {
  const [active, setActive] = useState<number>(1) // The currently active button
  const [minimized, setMinimized] = useState<boolean>(false)
  // Position of the buttons go from left to right
  return (
    <div>
      {
        <>
          {!minimized && <ExitProjectView setDisplayBox={setMinimized} />}{' '}
          <Button
            buttonIcon={'forest'}
            position={1}
            minimized={minimized}
            active={active == 1}
            onClick={() => {
              setActive(1)
              setMinimized(false)
            }}
          />
          <Button
            buttonIcon={'photo'}
            position={2}
            minimized={minimized}
            active={active == 2}
            onClick={() => setActive(2)}
          />
          <Button
            buttonIcon={'folder'}
            position={3}
            minimized={minimized}
            active={active == 3}
            onClick={() => setMinimized(true)}
          />
        </>
      }
      {!minimized && (
        <>
          {active == 1 && (
            <ProjectCard
              result={result}
              activeFeature={activeFeature}
              setDisplayBox={setMinimized}
            />
          )}
          {active == 2 && <WildlifeCard />}
        </>
      )}
    </div>
  )
}
