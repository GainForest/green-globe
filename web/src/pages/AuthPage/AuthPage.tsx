import { useAuth } from 'src/auth'

const AuthPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  return (
    <>
      {/* MetaTags, h1, paragraphs, etc. */}

      <p>{JSON.stringify({ isAuthenticated })}</p>
      <button onClick={signUp}>sign up</button>
    </>
  )
}

export default AuthPage
