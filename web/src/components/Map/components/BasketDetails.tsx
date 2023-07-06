import RoundedButton from './RoundedButton'

export const BasketDetails = ({ showBasket, setShowBasket }) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: '100vh',
        width: showBasket ? '360px' : '0px',
        right: '2px',
        top: '2px',
        backgroundColor: '#ffffff',
        zIndex: 2,
        padding: showBasket ? '12px 16px' : '0px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: '0' }}>Your ecosystem cart</h2>
        <button onClick={() => setShowBasket(false)}> X </button>
      </div>

      <RoundedButton> Purchase plots </RoundedButton>
    </div>
  )
}
