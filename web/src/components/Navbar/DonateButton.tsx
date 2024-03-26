import { useState } from 'react'

import { breakpoints } from 'src/constants'

import Button from '../Map/components/Button'
import { DonateOverlay } from '../Overlays/SubscribeOverlay'

const DonateButton = ({ isLoggedIn, mediaSize }) => {
  const [displayDonateOverlay, setDisplayDonateOverlay] =
    useState<boolean>(false)

  return (
    <>
      <Button
        style={{
          position: 'absolute',
          right: !isLoggedIn
            ? '60px'
            : mediaSize < breakpoints.m
            ? '100px'
            : '240px',
          height: '32px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '80px',
          backgroundColor: '#ea9755',
        }}
        onClick={() => setDisplayDonateOverlay(true)}
      >
        Donate
      </Button>
      {displayDonateOverlay && (
        <DonateOverlay setDisplayDonateOverlay={setDisplayDonateOverlay} />
      )}
    </>
  )
}

export default DonateButton
