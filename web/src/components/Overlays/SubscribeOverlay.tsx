import { useState } from 'react'

import Button from '../Map/components/RoundedButton'
import { ToggleButton } from '../Map/components/ToggleButton'

export const SubscribeOverlay = () => {
  const [toggle, setToggle] = useState<'One-time' | 'Monthly'>('Monthly')
  const [amountChosen, setAmountChosen] = useState<number>(10)

  const link = `${toggle}${amountChosen}`

  const links = {
    Monthly10: 'https://buy.stripe.com/bIYcNTehC7gnaCQ00i',
    Monthly15: 'https://buy.stripe.com/8wM9BHddycAHcKY14o',
    Monthly25: 'https://buy.stripe.com/aEUg052yU44b7qE14n',
    Monthly50: 'https://buy.stripe.com/00gdRX6Pa58f4es28t',
  }

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: '60%',
        width: '100%',
        padding: '50px',
        maxWidth: '1014px',
        backgroundColor: '#F2EDE3',
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
      <div>
        <Button active={amountChosen == 10} onClick={() => setAmountChosen(10)}>
          10
        </Button>
        <Button active={amountChosen == 15} onClick={() => setAmountChosen(15)}>
          15
        </Button>
        <Button active={amountChosen == 25} onClick={() => setAmountChosen(25)}>
          25
        </Button>
        <Button active={amountChosen == 50} onClick={() => setAmountChosen(50)}>
          50
        </Button>
        <Button active={false}>Custom Amount</Button>
      </div>
      <a href={links[link]}>
        <Button active={true}>Pay now</Button>
      </a>
    </div>
  )
}

const DonationType = <div style={{ width: '200px' }}></div>
