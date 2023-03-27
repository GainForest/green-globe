import { InfoBox } from './InfoBox'
import { ToggleButton } from './ToggleButton'

export const WildlifeCard = ({ activeFeature, activeProjectData }) => {
  const projectId = activeFeature?.properties?.projectId
  const projectName = activeFeature?.properties?.name
    ?.toLowerCase()
    .split(' ')
    .join('-')
  const cameraPhoto =
    activeProjectData?.project?.assets?.filter(
      (d) =>
        d.classification.includes('Camera Traps') && d.awsCID.includes('.jpg')
    )?.[0] || ''
  const cameraVideo =
    activeProjectData?.project?.assets?.filter(
      (d) =>
        d.classification.includes('Camera Traps') && d.awsCID.includes('.mp4')
    )?.[0] || ''

  return (
    <InfoBox>
      <ToggleButton />
      <img
        alt="wildlife-camera"
        src={`https://gainforest-transparency-dashboard.s3.amazonaws.com/camera-traps/${projectName}-1.jpg`}
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'cover',
          paddingTop: '20px',
        }}
      />
      <p>
        {projectName}
        For more, visit the{' '}
        <a href={`https://gainforest.app/data/${projectId}`}>
          transparency dashboard
        </a>
        .
      </p>
    </InfoBox>
  )
}
