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
          width: '400px',
          position: 'absolute',
          height: '200px',
          bottom: '16px',
          backgroundColor: theme.colors.background as string,
          left: '20px',
        }}
      >
        <h3>Legend</h3>
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
