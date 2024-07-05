import { useState } from 'react'

import { breakpoints } from 'src/constants'

import Button from '../Map/components/Button'
import { DonateOverlay } from '../Overlays/SubscribeOverlay'

const DonateButton = ({ isLoggedIn, mediaSize }) => {
  const [displayDonateOverlay, setDisplayDonateOverlay] =
    useState<boolean>(false)

  return (
    <>
      <a href="https://docs.google.com/document/d/1-UA8gvXdK607oqJ0smxbJZJnDNxvcj7o/edit">
        <Button
          style={{
            position: 'absolute',
            right: !isLoggedIn
              ? '20px'
              : mediaSize < breakpoints.m
              ? '100px'
              : '180px',
            height: '32px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '140px',
            backgroundColor: '#ea9755',
          }}
          onClick={() => setDisplayDonateOverlay(true)}
        >
          Biodiversity report
        </Button>
      </a>

      {/* {displayDonateOverlay && (
        <DonateOverlay setDisplayDonateOverlay={setDisplayDonateOverlay} />
      )} */}
    </>
  )
}

export default DonateButton
