import { useState, useEffect } from 'react'

import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { HexagonalImage } from 'src/components/HexagonalImage/HexagonalImage'
import { toKebabCase } from 'src/utils/toKebabCase'

// These are taken from the XPRIZE observations table
interface Individual {
  'Filename/Run': string //imageUrl
  class: string
}

export const InsectSpy = () => {
  const [individuals, setIndividuals] = useState<Individual[]>([])
  const kebabCasedProjectName = useSelector((state: State) =>
    toKebabCase(state.project.name)
  )

  // Fetch the finals_new.csv, and display each individual in the insect spy.
  useEffect(() => {
    if (kebabCasedProjectName) {
      d3.csv(
        `${process.env.AWS_STORAGE}/insectspy/${kebabCasedProjectName}/individuals.csv`
      ).then(setIndividuals)
    }
  }, [kebabCasedProjectName])

  if (!kebabCasedProjectName) {
    return <Loading />
  }
  if (individuals.length) {
    return (
      <div>
        <h2> Insect trap </h2>
        <p> Insects detected by our insect trap. </p>
        {individuals.map((d) => (
          <div key={d.class}>
            <HexagonalImage
              key={d.class}
              alt={d.class}
              src={`${process.env.AWS_STORAGE}/insectspy/${kebabCasedProjectName}/${d['Filename/Run']}`}
            />
            {d.class}
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <InsectContainer>
        <h2> Insect Trap </h2>
        An insect trap has not been set up in this region.
      </InsectContainer>
    )
  }
}

const Loading = () => (
  <InsectContainer>Searching for insects...</InsectContainer>
)

const InsectContainer = styled.div`
  margin: 16px 0px;
`
