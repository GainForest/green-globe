import { useState } from 'react'

import dayjs from 'dayjs'

export const TimeSlider = ({ map }) => {
  const minDate = dayjs('2020-09-01')
  const maxDate = dayjs().subtract(6, 'week').set('date', 1)
  const monthsBetween = maxDate.diff(minDate, 'month')

  const [currentDate, setCurrentDate] = useState<string>(
    maxDate.format('MMM YYYY')
  )

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        width: '500px',
        height: '48px',
        padding: '8px',
        bottom: 40,
        right: 40,
      }}
    >
      <input
        style={{ width: '100%' }}
        min={0}
        max={monthsBetween}
        step={1}
        type="range"
        onChange={(e) => {
          const monthsSinceMin = parseInt(e.target.value)
          const newDate = minDate
            .add(monthsSinceMin, 'month')
            .format('MMM YYYY')
          setCurrentDate(newDate)
          map.setLayoutProperty(
            `planetLayer${newDate}`,
            'visibility',
            'visible'
          )
          map.setLayoutProperty(
            `planetLayer${currentDate}`,
            'visibility',
            'none'
          )
        }}
      ></input>
      Satellite imagery date (Tropical regions only): {currentDate}
    </div>
  )
}
