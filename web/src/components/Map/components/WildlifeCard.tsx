import { InfoBox } from './InfoBox'
import { ToggleButton } from './ToggleButton'

export const WildlifeCard = ({ projectId }) => {
  return (
    <InfoBox>
      <ToggleButton />
      <img
        alt="wildlife-camera"
        src={
          'https://gainforest-transparency-dashboard.s3.amazonaws.com/camera-traps/kayapo-project-2.jpg'
        }
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'cover',
          paddingTop: '20px',
        }}
      />
      <p>
        For more, visit the{' '}
        <a href={`https://gainforest.app/data/${projectId}`}>
          transparency dashboard
        </a>
        .
      </p>
    </InfoBox>
  )
}
