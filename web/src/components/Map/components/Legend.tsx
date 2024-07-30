import { useSelector } from 'react-redux'
import { useThemeUI } from 'theme-ui'

import { State } from 'src/types'

import { LegendName, legendMap } from '../legends/legendMap'

export const Legend = () => {
  const { theme } = useThemeUI()
  const legendName: LegendName = useSelector(
    (state: State) => state.overlays.legendName
  )

  if (legendName) {
    return (
      <div
        style={{
          width: '380px',
          position: 'absolute',
          height: '140px',
          bottom: '16px',
          backgroundColor: theme.colors.background as string,
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3 style={{ width: '100%', textAlign: 'left' }}>Legend</h3>
        <DynamicLegend legendName={legendName} />
      </div>
    )
  } else {
    return null
  }
}

const DynamicLegend = ({ legendName }) => {
  const Component = legendMap[legendName]
  return Component ? <Component /> : null
}
