import { useDispatch } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { showBasket } from 'src/reducers/overlaysReducer'

import ProfileButton from '../Map/components/ProfileButton'
import ShoppingCartButton from '../Map/components/ShoppingCartButton'

const Navbar = () => {
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
      }}
    >
      <h3>vidi.eco</h3>
      <div style={{ width: '50px', display: 'flex', gap: '12px' }}>
        <ProfileButton
          onClick={() => console.log('it b clicked')}
        ></ProfileButton>
        <ShoppingCartButton
          onClick={() => dispatch(showBasket())}
        ></ShoppingCartButton>
      </div>
    </div>
  )
}

export default Navbar
