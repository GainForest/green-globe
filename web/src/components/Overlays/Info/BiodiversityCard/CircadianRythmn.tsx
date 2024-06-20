import { SOUNDSCAPE_PATHS } from 'config/soundscape_paths.js'

import { AudioPlayer } from 'src/components/Buttons/AudioPlayer'
export const CircadianRythmn = () => {
  return (
    <>
      <h1>Circadian Rythmn</h1>
      <div>
        <p> Measured activity of different frequencies in the forest. </p>
      </div>
      {SOUNDSCAPE_PATHS.map((path) => (
        <div key={path}>
          <img
            src={`${process.env.AWS_STORAGE}/${path}`}
            alt={`circadian rythmn for ${path}`}
          />
          <AudioPlayer
            label="Tyrant"
            src={`${process.env.AWS_STORAGE}/audio/Tufted Tit Tyrant.mp3`}
          />
        </div>
      ))}
    </>
  )
}
