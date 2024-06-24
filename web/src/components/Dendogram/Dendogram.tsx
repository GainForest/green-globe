import React from 'react'

export const Dendogram = () => {
  return (
    <div>
      <h1> Species Dendogram</h1>
      <p>All species recorded in this project.</p>
      <img
        src={`${process.env.AWS_STORAGE}/dendogram/semifinals_dendogram.png`}
        alt={'species dendogram'}
        style={{ margin: '20px 0px' }}
      />
    </div>
  )
}

export default Dendogram
