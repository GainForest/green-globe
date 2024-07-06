import React from 'react'

export const Dendogram = () => {
  return (
    <div>
      <h2> Species dendogram</h2>
      <p>All species recorded in this project.</p>
      <img
        src={`${process.env.AWS_STORAGE}/dendogram/semifinals_dendogram.svg`}
        alt={'species dendogram'}
        style={{ margin: '20px 0px', backgroundColor: 'white' }}
      />
    </div>
  )
}

export default Dendogram
