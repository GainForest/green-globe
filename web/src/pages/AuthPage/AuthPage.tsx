import { useAuth } from 'src/auth'
import Button from 'src/components/Map/components/Button'
import Navbar from 'src/components/Navbar/Navbar'

const AuthPage = () => {
  const { signUp } = useAuth()

  return (
    <>
      <Navbar isAuthenticated={false}></Navbar>
      <div style={{ width: '100vw', textAlign: 'center', marginTop: '25vh' }}>
        <p style={{ color: '#000000', padding: '24px' }}>
          Vidi.eco is currently in development.
        </p>
        <Button onClick={signUp} style={{ margin: '0 auto' }}>
          Log in
        </Button>
      </div>
    </>
  )
}

export default AuthPage
