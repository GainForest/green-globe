import { useState } from 'react'

import { ToggleButton } from '../Map/components/ToggleButton'

export const SubscribeOverlay = () => {
  const [toggle, setToggle] = useState<'One-time' | 'Monthly'>('Monthly')

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: '60%',
        width: '100%',
        padding: '10%',
        maxWidth: '1014px',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        borderRadius: '0.5em',
        overflowY: 'auto',
        color: 'black',
        zIndex: '4',
      }}
    >
      Your donation
      <ToggleButton
        active={toggle}
        setToggle={setToggle}
        options={['One-time', 'Monthly']}
      ></ToggleButton>
      <div>One-time</div>
      <div>Monthly</div>
    </div>
  )
}

const DonationType = <div style={{ width: '200px' }}></div>
