import React from 'react'

export const Dendogram = () => {
  return (
    <img
      src={`${process.env.AWS_STORAGE}/dendogram/semifinals_dendogram.png`}
      alt={'species dendogram'}
      style={{ margin: '20px 0px' }}
    />
  )
}

export default Dendogram
