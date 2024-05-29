import { useDispatch } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { useAuth } from 'src/auth'
import { breakpoints } from 'src/constants'
import { showProfile } from 'src/reducers/overlaysReducer'

import DonateButton from './DonateButton'
import ProfileButton from './ProfileButton'

const Navbar = ({ isAuthenticated, mediaSize }) => {
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
      }}
    >
      <div style={{ width: '88px', paddingLeft: '20px', textAlign: 'center' }}>
        <a className="logo" href="https://gainforest.earth/">
          <img
            style={{ position: 'absolute', left: 5, height: '1.8em' }}
            src={'/gainforestIcon.png'}
            alt="gainforest logo"
          />
          <h3>{logo}</h3>
        </a>
      </div>

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
        }}
      ></div> */}
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
          {mediaSize >= breakpoints.m && (
            <ProfileButton
              onClick={() => dispatch(showProfile())}
            ></ProfileButton>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
