import { useState } from 'react'

import dayjs from 'dayjs'
import { useThemeUI } from 'theme-ui'

export const TimeSlider = ({ map }) => {
  const minDate = dayjs('2020-09-01')
  const maxDate = dayjs().subtract(6, 'week').set('date', 1)
  const monthsBetween = maxDate.diff(minDate, 'month')
  const { theme } = useThemeUI()

  const [currentDate, setCurrentDate] = useState<string>(
    maxDate.format('YYYY-MM')
  )

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
          map.setLayoutProperty(
            `planetLayer${currentDate}`,
            'visibility',
            'none'
          )
          const monthsSinceMin = parseInt(e.target.value)
          const newDate = minDate.add(monthsSinceMin, 'month').format('YYYY-MM')
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
}
