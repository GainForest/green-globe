import { Button } from './ProjectButtons'
import { ProjectCard } from './ProjectCard'

export const InfoOverlay = ({ result, activeFeature }) => {
  return (
    <div>
      <Button buttonIcon={'forest'} position={1} active={true} />
      <Button buttonIcon={'photo'} position={2} active={false} />
      <Button buttonIcon={'folder'} position={3} active={false} />
      <ProjectCard result={result} activeFeature={activeFeature} />
    </div>
  )
}
