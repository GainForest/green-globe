import { useDispatch, useSelector } from 'react-redux'

import { breakpoints } from 'src/constants'
import { setMaximized } from 'src/reducers/overlaysReducer'

import { UnstyledButton } from './UnstyledButton'

export const MaximizeButton = ({ style, mediaSize }) => {
  const dispatch = useDispatch()
  const maximized = useSelector((state: State) => state.overlays.maximized)

  const height =
    mediaSize >= breakpoints.xl
      ? '36px'
      : mediaSize > breakpoints.m
      ? '34px'
      : mediaSize > breakpoints.s
      ? '30px'
      : '28px'

  const width =
    mediaSize >= breakpoints.xl
      ? '36px'
      : mediaSize > breakpoints.m
      ? '34px'
      : mediaSize > breakpoints.s
      ? '30px'
      : '28px'

  const fontSize =
    mediaSize < breakpoints.s
      ? '16px'
      : mediaSize < breakpoints.m
      ? '18px'
      : mediaSize < breakpoints.xl
      ? '22px'
      : '24px'

  const lineHeight =
    mediaSize < breakpoints.s
      ? '30px'
      : mediaSize < breakpoints.m
      ? '32px'
      : mediaSize < breakpoints.xl
      ? '36px'
      : '38px'

  const bottom =
    mediaSize >= breakpoints.xl
      ? 'calc(60vh - 6px)'
      : mediaSize > breakpoints.m
      ? 'calc(60vh - 4px)'
      : mediaSize > breakpoints.s
      ? 'calc(60vh)'
      : 'calc(60vh)'

  const right = mediaSize > breakpoints.m ? 50 : 46
  const maxedRight = mediaSize > breakpoints.m ? 100 : 46

  const maxedTop =
    mediaSize >= breakpoints.m ? 59 : mediaSize > breakpoints.s ? 100 : 100

  return (
    <UnstyledButton
      style={{
        zIndex: 3,
        textAlign: 'center',
        right: maximized ? maxedRight : right,
        bottom: maximized ? null : bottom,
        top: maximized ? maxedTop : null,
        height: height,
        width: width,
        ...style,
      }}
      onClick={() => dispatch(setMaximized(!maximized))}
    >
      <div
        style={{
          fontSize: fontSize,
          lineHeight: lineHeight,
        }}
        className="material-icons-round"
      >
        <img
          alt="maximize"
          style={{ width: '80%', height: 'auto', paddingBottom: '4px' }}
          src="/maximize.png"
        />
      </div>
    </UnstyledButton>
  )
}
