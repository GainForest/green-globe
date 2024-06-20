import React, { useState } from 'react'

import { Line, Bar } from 'react-chartjs-2'
import Modal from 'react-modal'

const chartComponents = {
  line: Line,
  bar: Bar,
}

export const SmallChart = ({ type, data, options }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  Modal.setAppElement('#redwood-app')

  const handleClick = () => {
    setModalIsOpen(true)
  }
  const ChartComponent = chartComponents[type]

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '500px',
      height: '300px',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: 'white',
      padding: 0,
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 4,
    },
  }

  return (
    <div onClick={handleClick} style={{ height: '300px', pointer: 'cursor' }}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <ChartComponent data={data} options={options} />
      </Modal>
      <ChartComponent data={data} options={options} />
    </div>
  )
}
