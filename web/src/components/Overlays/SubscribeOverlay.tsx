import { useState } from 'react'

import { CloseButton } from '../Buttons/Close'
import Button from '../Map/components/RoundedButton'
import { ToggleButton } from '../Map/components/ToggleButton'

export const DonateOverlay = ({ setDisplayDonateOverlay }) => {
  const [toggle, setToggle] = useState<'One-time' | 'Monthly'>('Monthly')
  const [amountChosen, setAmountChosen] = useState<number>(10)

  const link = `${toggle}${amountChosen}`

  const links = {
    Monthly10: 'https://buy.stripe.com/bIYcNTehC7gnaCQ00i',
    Monthly15: 'https://buy.stripe.com/8wM9BHddycAHcKY14o',
    Monthly25: 'https://buy.stripe.com/aEUg052yU44b7qE14n',
    Monthly50: 'https://buy.stripe.com/00gdRX6Pa58f4es28t',
    'One-time10': 'https://buy.stripe.com/9AQ6pv1uQgQXh1e28u',
    'One-time15': 'https://buy.stripe.com/5kA9BHflGgQX12g6oN',
    'One-time25': 'https://buy.stripe.com/aEUcNT1uQ58fdP26oM',
    'One-time50': 'https://buy.stripe.com/7sIaFL0qM44b12g3cC',
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: 4,
        backgroundColor: '#F2EDE3',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        height: '72%',
        width: '400px',
        maxWidth: '100%',
        borderRadius: '0.5em',
        color: 'black',
        textAlign: 'right',
      }}
    >
      <CloseButton
        fontSize={'24px'}
        style={{ marginRight: '16px', marginTop: '12px' }}
        onClick={() => setDisplayDonateOverlay(false)}
      />
      <div
        style={{
          padding: '28px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: '20px' }}>Fund Conservation Basic Income</p>
        <p style={{ fontSize: '12px', textAlign: 'center' }}>
          Help us make conservation and restoration an economically viable
          option. Find out more in our{' '}
          <a href="https://gainforest.substack.com/p/what-is-gainforests-measure-to-earn">
            blog post
          </a>
          .
        </p>

        <br />
        <div>
          <ToggleButton
            active={toggle}
            setToggle={setToggle}
            options={['One-time', 'Monthly']}
          ></ToggleButton>
        </div>
        <br />
        <p style={{ fontSize: '16px' }}>
          Choose a {toggle.toLowerCase()} amount:
        </p>
        <br />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '8px',
          }}
        >
          <Button
            style={{ width: '120px', margin: 0 }}
            active={amountChosen == 10}
            onClick={() => setAmountChosen(10)}
          >
            €10
          </Button>
          <Button
            style={{ width: '120px', margin: 0 }}
            active={amountChosen == 15}
            onClick={() => setAmountChosen(15)}
          >
            €15
          </Button>
          <Button
            style={{ width: '120px', margin: 0 }}
            active={amountChosen == 25}
            onClick={() => setAmountChosen(25)}
          >
            €25
          </Button>
          <Button
            style={{ width: '120px', margin: 0 }}
            active={amountChosen == 50}
            onClick={() => setAmountChosen(50)}
          >
            €50
          </Button>
        </div>
        <a href={links[link]}>
          <Button style={{ width: '240px' }} active={true}>
            Pay now
          </Button>
        </a>
      </div>
    </div>
  )
}

const DonationType = <div style={{ width: '200px' }}></div>
