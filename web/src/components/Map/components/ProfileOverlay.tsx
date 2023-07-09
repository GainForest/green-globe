import { useDispatch, useSelector } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { hideBasket } from 'src/reducers/overlaysReducer'

export const ProfileOverlay = () => {
  const dispatch = useDispatch()
  const { theme } = useThemeUI()
  const showBasket = useSelector((state: State) => state.overlays.basket)

  return (
    <div
      style={{
        position: 'absolute',
        height: '100vh',
        width: showBasket ? '400px' : '0px',
        right: '0px',
        top: '0px',
        backgroundColor: theme.colors.background as string,
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
        <h1 style={{ margin: '0' }}>My ecosystems</h1>
        <CloseButton onClick={() => dispatch(hideBasket())} />
      </div>
    </div>
  )
}

const CloseButton = ({ onClick }) => {
  return (
    <div
      style={{
        fontSize: '24px',
        lineHeight: '36px',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      className="material-icons-round"
      onClick={onClick}
    >
      close
    </div>
  )
}
