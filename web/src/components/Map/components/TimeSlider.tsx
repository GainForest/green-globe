import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useThemeUI } from 'theme-ui'

export const TimeSlider = ({ map }) => {
  const minDate = dayjs('2020-09-01')
  const maxDate = dayjs().subtract(6, 'week').set('date', 1)
  const monthsBetween = maxDate.diff(minDate, 'month')
  const { theme } = useThemeUI()
  const isSatelliteHistoryEnabled = useSelector(
    (state: State) => state.satelliteHistory.enabled
  )
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  const [currentDate, setCurrentDate] = useState<string>(
    maxDate.format('YYYY-MM')
  )

  useEffect(() => {
    const showLatestLayer = () => {
      map.setLayoutProperty(
        `planetLayer${maxDate.format('YYYY-MM')}`,
        'visibility',
        'visible'
      )
    }
    const maxDate = dayjs().subtract(6, 'week').set('date', 1)

    if (map && isSatelliteHistoryEnabled && isFirstRender) {
      map.on('styledata', showLatestLayer)
    }

    // If the user toggles the satellite history on or off
    // we want to show the latest satellite layer available
    if (!isSatelliteHistoryEnabled) {
      setIsFirstRender(true)
      setCurrentDate(maxDate.format('YYYY-MM'))
    }
    return () => {
      if (map) {
        map.off('styledata', showLatestLayer)
      }
    }
  }, [map, isSatelliteHistoryEnabled, maxDate, isFirstRender])

  if (isSatelliteHistoryEnabled) {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundColor: theme.colors.background as string,
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          width: '500px',
          height: '68px',
          padding: '8px',
          bottom: 36,
          left: 8,
        }}
      >
        <input
          style={{ width: '100%', cursor: 'pointer' }}
          className="slider"
          min={0}
          max={monthsBetween}
          defaultValue={monthsBetween}
          step={1}
          type="range"
          onChange={(e) => {
            setIsFirstRender(false)
            map.setLayoutProperty(
              `planetLayer${maxDate.format('YYYY-MM')}`,
              'visibility',
              'none'
            )
            map.setLayoutProperty(
              `planetLayer${currentDate}`,
              'visibility',
              'none'
            )
            const monthsSinceMin = parseInt(e.target.value)
            const newDate = minDate
              .add(monthsSinceMin, 'month')
              .format('YYYY-MM')
            setCurrentDate(newDate)
            map.setLayoutProperty(
              `planetLayer${newDate}`,
              'visibility',
              'visible'
            )
          }}
        ></input>
        <p style={{ fontSize: '0.875em' }}>
          Historical satellite data (Tropical regions only):{' '}
          <b>{dayjs(currentDate, 'YYYY-MM').format('MMMM YYYY')}</b>
        </p>
      </div>
    )
  } else {
    return null
  }
}
