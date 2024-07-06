// This is a bit different as this layer requires dispatching
// to the redux store, and has a slider associating to it.

import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import { useThemeUI } from 'theme-ui'

import { setDisplaySatelliteHistory } from 'src/reducers/satelliteHistoryReducer'

import { LayerIcon, LayerItemContainer, LayerLabel } from './LayerItemStyles'

export const LayerItemHistoricalSatellite = () => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  const satelliteEnabled = useSelector(
    (state: State) => state.satelliteHistory.enabled
  )

  return (
    <LayerItemContainer
      key={'satellite history'}
      onClick={() => {
        if (!satelliteEnabled) {
          dispatch(setDisplaySatelliteHistory(true))
        } else {
          dispatch(setDisplaySatelliteHistory(false))
        }
      }}
    >
      <LayerIcon
        className="material-icons-round"
        isActive={satelliteEnabled}
        theme={theme}
      >
        {satelliteEnabled ? 'toggle_on' : 'toggle_off'}
      </LayerIcon>
      <LayerLabel
        data-tooltip-id={`info-button-clipTip-satellite-history`}
        htmlFor={'satellite history'}
        isActive={satelliteEnabled}
      >
        Satellite History
      </LayerLabel>
      <Tooltip id={`info-button-clipTip-satellite-history`} delayShow={10}>
        Historical monthly satellite data. (Tropical regions only)
      </Tooltip>
    </LayerItemContainer>
  )
}
