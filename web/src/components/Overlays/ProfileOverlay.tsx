import { useDispatch, useSelector } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { CloseButton } from 'src/components/Buttons/Close'
import { hideProfile, showProfile } from 'src/reducers/overlaysReducer'

export const ProfileOverlay = () => {
  const dispatch = useDispatch()
  const { theme } = useThemeUI()
  const showBasket = useSelector((state: State) => state.overlays.profile)

  if (!showProfile) {
    return <></>
  } else {
    return (
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          width: '400px',
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
          <CloseButton onClick={() => dispatch(hideProfile())} />
        </div>
      </div>
    )
  }
}
