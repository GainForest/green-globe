import Button from '../Map/components/Button'

const DonateButton = () => {
  return (
    <a href={'https://donate.stripe.com/bIYdRX0qM8kr5iw9AR'}>
      <Button
        style={{
          height: '32px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '80px',
          backgroundColor: '#ea9755',
        }}
      >
        Donate
      </Button>
    </a>
  )
}

export default DonateButton
