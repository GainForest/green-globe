import React from 'react'

import { useSelector } from 'react-redux'

import { toKebabCase } from 'src/utils/toKebabCase'

export const Dendogram = () => {
  const kebabCasedProjectName = useSelector((state: State) =>
    toKebabCase(state.project.name)
  )

  return (
    <div>
      <h2> Species dendogram</h2>
      <p>All species recorded in this project.</p>
      <img
        src={`${process.env.AWS_STORAGE}/dendogram/${kebabCasedProjectName}dendogram.svg`}
        alt={'species dendogram'}
        style={{ margin: '20px 0px', backgroundColor: 'white' }}
      />
    </div>
  )
}

export default Dendogram
