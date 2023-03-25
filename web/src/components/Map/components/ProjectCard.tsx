import { countryToEmoji } from 'src/utils/countryToEmoji'

export const ProjectCard = ({ result, activeFeature }) => {
  return (
    <div
      style={{
        height: '400px',
        width: '300px',
        position: 'absolute',
        padding: '24px',
        bottom: 40,
        left: 40,
        backgroundColor: '#ffffff',
        borderRadius: '0.5em',
      }}
    >
      <h1>{activeFeature?.properties?.name || ''}</h1>
      <p>
        {`${countryToEmoji[result?.project?.country]?.emoji}
      ${countryToEmoji[result?.project?.country]?.name}`}
      </p>
      <p>{result?.project?.description}</p>
    </div>
  )
}
