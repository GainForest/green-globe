import { SOUNDSCAPE_PATHS } from 'config/soundscape_paths.js'
import React, { useMemo } from 'react';

import { AudioPlayer } from 'src/components/Buttons/AudioPlayer'
import CircularBarChart from 'src/components/CircularBarChart'

export const CircadianRythmn = () => {
  const sampleData = useMemo(() => {
    return Array.from({ length: 2000 }, (_, i) => ({
      time: (i / 2000) * 24,
      value: Math.floor(Math.random() * 10000),
      frequency: Math.floor(Math.random() * 10000)
    }));
  }, []);

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
          <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: '600px', margin: 'auto' }}>
            <CircularBarChart data={sampleData} maxFixedValue={15000}/>
          </div>
          <AudioPlayer
            label="Tyrant"
            src={`${process.env.AWS_STORAGE}/audio/013-089-Tufted-Tit-Tyrant.mp3`}
          />
        </div>
      ))}
    </>
  )
}
