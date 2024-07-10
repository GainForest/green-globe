import { useState } from 'react'

import Modal from 'react-modal'

export const ModalWrapper = ({
  FirstComponent,
  ModalComponent = FirstComponent,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  Modal.setAppElement('#redwood-app')
  const handleClick = () => {
    setModalIsOpen(true)
  }

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      minWidth: '80vw',
      minHeight: '80vh',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f5f3ef',
      padding: 0,
      overflow: 'hidden',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 4,
    },
  }

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <div style={{ cursor: 'pointer' }} onClick={handleClick}>
        <FirstComponent />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
      >
        <ModalComponent />
      </Modal>
    </div>
  )
}
