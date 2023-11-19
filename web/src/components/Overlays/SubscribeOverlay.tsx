import { useState } from 'react'

import Button from '../Map/components/RoundedButton'
import { ToggleButton } from '../Map/components/ToggleButton'

export const SubscribeOverlay = () => {
  const [toggle, setToggle] = useState<'One-time' | 'Monthly'>('Monthly')

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: '60%',
        width: '100%',
        padding: '50px',
        maxWidth: '1014px',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        borderRadius: '0.5em',
        overflowY: 'auto',
        color: 'black',
        zIndex: '4',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['One-time', 'Monthly']}
        ></ToggleButton>
      </div>
      Choose a {toggle.toLowerCase()} amount
      <Button>10</Button>
      <Button active={false}>15</Button>
      <Button active={false}>25</Button>
      <Button active={false}>50</Button>
      <Button active={false}>Custom Amount</Button>
    </div>
  )
}

const DonationType = <div style={{ width: '200px' }}></div>
