import { SOUNDSCAPE_PATHS } from 'config/soundscape_paths.js'

export const CircadianRythmn = () => {
  return (
    <>
      <h1>Circadian Rythmn</h1>
      <div>
        <p> Measured activity of different frequencies in the forest. </p>
      </div>
      {SOUNDSCAPE_PATHS.map((path) => (
        <img
          key={path}
          src={`${process.env.AWS_STORAGE}/${path}`}
          alt={`circadian rythmn for ${path}`}
        />
      ))}
    </>
  )
}
