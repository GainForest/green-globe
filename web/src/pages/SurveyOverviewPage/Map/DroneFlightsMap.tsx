import { useEffect, useState } from 'react'

import { initializeMapbox } from 'src/mapbox.config'

export const DroneFlightsMap = () => {
  const [map, setMap] = useState()

  useEffect(() => {
    initializeMapbox('drone-flights-map-container', setMap)
  }, [])

  return (
    <div
      style={{
        height: '500px',
        width: '640px',
        maxHeight: '50vh',
        maxWidth: '70vw',
      }}
      id="drone-flights-map-container"
    />
  )
}
