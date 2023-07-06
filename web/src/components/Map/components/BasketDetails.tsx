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
      <h3
        style={{
          fontSize: '12px',
          margin: '0',
          color: '#8C8C8C',
          fontWeight: 300,
        }}
      >
        $10,00 / month
      </h3>
      <div style={{ marginTop: '24px' }}>
        <span style={{ cursor: 'pointer' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
          </svg>
        </span>
      </div>
    </div>
  )
}

const Overview = () => {
  return (
    <div>
      <h2>Overview</h2>
      <p style={{ display: 'flex' }}>
        Total
        <span style={{ right: '4px' }}>$70,00</span>
      </p>
    </div>
  )
}
