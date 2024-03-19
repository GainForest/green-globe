import { useDispatch } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { useAuth } from 'src/auth'
import { showProfile } from 'src/reducers/overlaysReducer'

import DonateButton from './DonateButton'
import ProfileButton from './ProfileButton'

const Navbar = ({ isAuthenticated, style }) => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  const location = window.location.origin
  const logo = location.includes('vidi') ? 'vidi.eco' : 'gainforest'
  const { logOut } = useAuth()

  return (
    <div
      style={{
        display: 'flex',
        height: '52px',
        width: '100vw',
        padding: '14px 24px',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondaryBackground as string,
        ...style,
      }}
    >
      <div style={{ width: '88px', textAlign: 'center' }}>
        <h3>{logo}</h3>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <DonateButton isLoggedIn={isAuthenticated} />
      </div>
      {isAuthenticated && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <button
            style={{
              border: 'none',
              backgroundColor: theme.colors.secondaryBackground as string,
              color: '#8c8c8c',
              margin: '0 10px 4px 0',
              cursor: 'pointer',
            }}
            onClick={() => logOut({ returnTo: process.env.AUTH0_REDIRECT_URI })}
          >
            Log Out
          </button>
          <ProfileButton
            onClick={() => dispatch(showProfile())}
          ></ProfileButton>
        </div>
      )}
    </div>
  )
}

export default Navbar
