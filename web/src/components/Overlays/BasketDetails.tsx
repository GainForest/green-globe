import { useDispatch, useSelector } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { CloseButton } from 'src/components/Buttons/Close'
import { hideBasket } from 'src/reducers/overlaysReducer'

import RoundedButton from '../Map/components/RoundedButton'

export const BasketDetails = () => {
  const dispatch = useDispatch()
  const { theme } = useThemeUI()
  const showBasket = useSelector((state: State) => state.overlays.basket)

  const ecosystems = [
    {
      type: 'Forest Protection',
      name: 'Defensores del Chaco, Paraguay',
      projectId: 1,
      price: 10,
      selectedh3: ['1', '2', '3'],
      image: '/defensoresHexagon.png',
    },
    {
      type: 'Mangrove Restoration',
      name: 'Oceanus Conservation, Philippines',
      projectId: 24,
      price: 10,
      selectedh3: ['5', '7'],
      image: '/oceanusHexagon.png',
    },
  ]

  if (!showBasket) {
    return <></>
  } else {
    return (
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          width: '400px',
          right: '0px',
          top: '0px',
          backgroundColor: theme.colors.background as string,
          zIndex: 2,
          padding: '24px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ margin: '0' }}>Your ecosystem cart</h1>
          <CloseButton onClick={() => dispatch(hideBasket())} />
        </div>
        <div>
          {ecosystems.map((ecosystem) => (
            <EcosystemInBasket
              key={ecosystem.projectId}
              ecosystem={ecosystem}
            />
          ))}
        </div>

        <Overview ecosystems={ecosystems}></Overview>
        <a href="https://buy.stripe.com/eVa7tz8Xi44b4es5km">
          <RoundedButton style={{ width: '100%' }}>
            Purchase plots{' '}
          </RoundedButton>
        </a>
      </div>
    )
  }
}

const EcosystemInBasket = ({ ecosystem }: { ecosystem: Ecosystem }) => {
  return (
    <div style={{ display: 'flex', margin: '24px 8px' }}>
      <EcosystemPicture ecosystem={ecosystem} />
      <EcosystemInfo ecosystem={ecosystem} />
    </div>
  )
}

const EcosystemPicture = ({ ecosystem }) => {
  return (
    <div
      style={{
        height: '120px',
        width: '120px',
        backgroundColor: '#F5F7F9',
        clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
      }}
    >
      <img src={ecosystem.image}></img>
    </div>
  )
}

const EcosystemInfo = ({ ecosystem }: { ecosystem: Ecosystem }) => {
  return (
    <div style={{ width: '180px', padding: '8px 16px' }}>
      <h3
        style={{
          fontSize: '12px',
          margin: '0',
          color: '#8C8C8C',
          fontWeight: 300,
        }}
      >
        {ecosystem.type}
      </h3>
      <h1 style={{ fontSize: '14px', margin: '0' }}>{ecosystem.name}</h1>
      <h3
        style={{
          fontSize: '12px',
          margin: '0',
          color: '#8C8C8C',
          fontWeight: 300,
        }}
      >
        ${ecosystem.price},00 / month
      </h3>
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <span style={{ margin: '0px 12px' }}>
          {ecosystem.selectedh3.length}
        </span>
        <span style={{ cursor: 'pointer' }}>
          <TrashCanSvg />
        </span>
      </div>
    </div>
  )
}

const Overview = ({ ecosystems }) => {
  const PRICE = 10

  const numHexagons =
    ecosystems
      .map((ecosystem) => ecosystem.selectedh3.length)
      .reduce((acc, curr) => acc + curr, 0) * PRICE

  return (
    <div>
      <h2>Overview</h2>
      <p style={{ display: 'flex', justifyContent: 'space-between' }}>
        Total
        <span style={{ right: '4px' }}>${numHexagons},00 </span>
      </p>
    </div>
  )
}

const TrashCanSvg = ({ onClick }) => (
  <div onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
    </svg>
  </div>
)
