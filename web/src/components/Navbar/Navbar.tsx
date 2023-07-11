import { useDispatch } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { showBasket, showProfile } from 'src/reducers/overlaysReducer'

import ProfileButton from './ProfileButton'
import ShoppingCartButton from './ShoppingCartButton'

const Navbar = ({ isAuthenticated, style }) => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  return (
    <div
      style={{
        display: 'flex',
        height: '48px',
        width: '100vw',
        padding: '12px 24px',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondaryBackground as string,
        ...style,
      }}
    >
      <h3>vidi.eco</h3>
      {isAuthenticated && (
        <div
          style={{
            width: '50%',
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <ProfileButton
            onClick={() => dispatch(showProfile())}
          ></ProfileButton>
          <ShoppingCartButton
            onClick={() => dispatch(showBasket())}
          ></ShoppingCartButton>
        </div>
      )}
    </div>
  )
}

export default Navbar
