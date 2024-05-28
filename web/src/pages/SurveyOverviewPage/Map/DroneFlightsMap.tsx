import { useEffect, useState } from 'react'

import { initializeMapbox } from 'src/mapbox.config'

export const DroneFlightsMap = () => {
  const [map, setMap] = useState()

  useEffect(() => {
    initializeMapbox('drone-flights-map-container', setMap)
  }, [])

  return (
    <div
      style={{ height: '40%', width: '40%' }}
      id="drone-flights-map-container"
    />
  )
}
