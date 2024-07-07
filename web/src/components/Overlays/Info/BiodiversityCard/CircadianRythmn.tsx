import React, { useEffect, useMemo, useState } from 'react'

import axios from 'axios'
import { SOUNDSCAPE_PATHS } from 'config/soundscape_paths.js'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { AudioPlayer } from 'src/components/Buttons/AudioPlayer'
import { toKebabCase } from 'src/utils/toKebabCase'

import {
  MaximumCircadianRhythmChart,
  MedianCircadianRhythmChart,
} from './CircadianRythmnChart'

export const CircadianRythmn = () => {
  const projectName = useSelector((state: State) => state.project.name)
  const [kebabCasedProjectName, setKebabCasedProjectName] = useState<string>()

  useEffect(() => {
    if (projectName) {
      const kebabCasedProjectName = toKebabCase(projectName)
      setKebabCasedProjectName('hoho')
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
        <MaximumCircadianRhythmChart
          csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final.csv`}
        />
        <MedianCircadianRhythmChart
          csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/median_results_final.csv`}
        />
        <AudioPlayer
          label="Sample"
          src={`${process.env.AWS_STORAGE}/audio/013-089-Tufted-Tit-Tyrant.mp3`}
        />
      </>
    )
  }
}

const CircadianContainer = styled.div`
  margin: 16px 0px;
`
