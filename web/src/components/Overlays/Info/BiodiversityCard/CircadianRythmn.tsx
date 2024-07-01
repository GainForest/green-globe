import { SOUNDSCAPE_PATHS } from 'config/soundscape_paths.js'
import React, { useMemo } from 'react';

import { AudioPlayer } from 'src/components/Buttons/AudioPlayer'
import CircularBarChart from 'src/components/CircularBarChart'
import CircularLineChart from 'src/components/CircularLineChart'
import CircularMultiLineChartWithCSVLoader from 'src/components/CircularMultiLineChart'


export const CircadianRythmn = () => {

  const sampleMultiData = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      time: (i / 100) * 24,
      freq1: Math.random() * 100,
      freq2: Math.random() * 1000,
      freq3: Math.random() * 5000,
      hi: Math.random() * 10000,
      freq5: Math.random() * 2000
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
          {/* <img
            src={`${process.env.AWS_STORAGE}/${path}`}
            alt={`circadian rythmn for ${path}`}
          /> */}
          <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: '600px', margin: 'auto' }}>
            <CircularBarChart csvPath={`${process.env.AWS_STORAGE}/pmn/max_results_final.csv`}/>
          </div>
          <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: '600px', margin: 'auto' }}>
            <CircularMultiLineChartWithCSVLoader csvPath={`${process.env.AWS_STORAGE}/pmn/median_results_final.csv`}/>
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
