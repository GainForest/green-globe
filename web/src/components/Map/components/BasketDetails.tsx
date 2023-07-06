import RoundedButton from './RoundedButton'

export const BasketDetails = ({ showBasket, setShowBasket }) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100vh',
        width: showBasket ? '400px' : '0px',
        right: '0px',
        top: '0px',
        backgroundColor: '#ffffff',
        zIndex: 2,
        padding: showBasket ? '24px 32px' : '0px',
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
        <div
          style={{
            fontSize: '24px',
            lineHeight: '36px',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          className="material-icons-round"
          onClick={() => setShowBasket(false)}
        >
          close
        </div>
      </div>
      <HexagonInBasket />
      <Overview></Overview>
      <RoundedButton style={{ width: '100%' }}> Purchase plots </RoundedButton>
    </div>
  )
}

const HexagonInBasket = () => {
  return (
    <div style={{ display: 'flex', margin: '24px 8px' }}>
      <HexagonEcosystem />
      <EcosystemInfo />
    </div>
  )
}

const HexagonEcosystem = () => {
  return (
    <div
      style={{
        height: '120px',
        width: '120px',
        backgroundColor: '#F5F7F9',
        clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
      }}
    ></div>
  )
}

const EcosystemInfo = () => {
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
        Forest Protection
      </h3>
      <h1 style={{ fontSize: '14px', margin: '0' }}>
        Defensores del Chaco, Paraguay
      </h1>
    </div>
  )
}

const Overview = () => {
  return (
    <div>
      <h2>Overview</h2>
      <p>Total</p>
    </div>
  )
}
