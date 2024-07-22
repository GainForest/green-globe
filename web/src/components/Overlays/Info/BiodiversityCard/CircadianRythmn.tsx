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
  const [filesExist, setFilesExist] = useState(false)

  useEffect(() => {
    if (projectName) {
      const kebabCasedProjectName = toKebabCase(projectName)
      setKebabCasedProjectName(kebabCasedProjectName)
    }
  }, [projectName])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/listS3Objects?folder=pmn&projectName=${kebabCasedProjectName}`
        )
        const data = await response.json()
        if (data.length > 0) {
          setFilesExist(true)
        }
      } catch (e) {
        console.log('cannot fetch from AWS :', e)
      }
    }
    if (kebabCasedProjectName) {
      fetchData()
    }
  }, [kebabCasedProjectName])

  if (!kebabCasedProjectName) {
    return (
      <CircadianContainer>Searching for the soundscape...</CircadianContainer>
    )
  } else if (!filesExist) {
    return (
      <CircadianContainer>
        No soundscape has been generated for this project.
      </CircadianContainer>
    )
  } else {
    return (
      <>
        <div style={{ marginBottom: '16px' }}>
          <h2>Soundscape</h2>
          <p> Measured soundscape of different frequencies.</p>
        </div>
        <h3>Raft 1 (Maximum)</h3>
        <div>
          <BarCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final_r1.csv`}
          />
        </div>
        <h3>Raft 2 (Maximum)</h3>
        <div>
          <BarCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final_r2.csv`}
          />
        </div>
        <h3>Raft 3 (Maximum)</h3>
        <div>
          <BarCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final_r3.csv`}
          />
        </div>
        <h3>Raft Communication (Maximum)</h3>
        <div>
          <BarCircadianRhythmChart
            csvPath={`${process.env.AWS_STORAGE}/pmn/${kebabCasedProjectName}/max_results_final_rc.csv`}
          />
        </div>
        {/* <AudioPlayer
          label="Sample"
          src={`${process.env.AWS_STORAGE}/audio/${kebabCasedProjectName}/sample.mp3`}
        /> */}
      </>
    )
  }
}

const CircadianContainer = styled.div`
  margin: 16px 0px;
`
