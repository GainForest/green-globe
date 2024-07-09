import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { AudioPlayer } from 'src/components/Buttons/AudioPlayer'
import { toKebabCase } from 'src/utils/toKebabCase'

import {
  BarCircadianRhythmChart,
  LineCircadianRhythmChart,
} from './CircadianRythmnChart'

export const CircadianRythmn = () => {
  const projectName = useSelector((state: State) => state.project.name)
  const [kebabCasedProjectName, setKebabCasedProjectName] = useState<string>()

  useEffect(() => {
    if (projectName) {
      const kebabCasedProjectName = toKebabCase(projectName)
      setKebabCasedProjectName(kebabCasedProjectName)
    }
  }, [projectName])

  if (!kebabCasedProjectName) {
    return (
      <CircadianContainer>Searching for the soundscape...</CircadianContainer>
    )
  } else {
    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <h2>Soundscape</h2>
          <p> Measured soundscape of different frequencies.</p>
        </div>
        <h3>Soundscape (Maximum)</h3>
        <div>
          <BarCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final.csv`}
          />
          <LineCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final.csv`}
          />
        </div>
        <h3>Soundscape (Median)</h3>
        <div>
          <BarCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/median_results_final.csv`}
          />
          <LineCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/median_results_final.csv`}
          />
        </div>
        <AudioPlayer
          label="Sample"
          src={`${process.env.AWS_STORAGE}/audio/${kebabCasedProjectName}/sample.mp3`}
        />
      </>
    )
  }
}

const CircadianContainer = styled.div`
  margin: 16px 0px;
`
