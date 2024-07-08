import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { toKebabCase } from 'src/utils/toKebabCase'

export const Dendogram = () => {
  const [imageExists, setImageExists] = useState(false)
  const kebabCasedProjectName = useSelector((state: State) =>
    toKebabCase(state.project.name)
  )

  useEffect(() => {
    const img = new Image()
    img.src = `${process.env.AWS_STORAGE}/dendogram/${kebabCasedProjectName}-dendogram.svg`
    img.onload = () => setImageExists(true)
    img.onerror = () => setImageExists(false)
  }, [kebabCasedProjectName])

  if (!kebabCasedProjectName) {
    return <Loading />
  }
  if (!imageExists) {
    return <NoData />
  }

  return (
    <div>
      <h2> Species dendogram</h2>
      <p>All species recorded in this project.</p>
      <img
        src={`${process.env.AWS_STORAGE}/dendogram/${kebabCasedProjectName}-dendogram.svg`}
        alt={'species dendogram'}
        style={{ margin: '20px 0px', backgroundColor: 'white' }}
      />
    </div>
  )
}

const Loading = () => (
  <Container> Searching for the project dendogram... </Container>
)

const NoData = () => (
  <Container>
    No species dendogram have been generated for this project.
  </Container>
)

export default Dendogram

const Container = styled.div`
  margin: 16px 8px;
`
