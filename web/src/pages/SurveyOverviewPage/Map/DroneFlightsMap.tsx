import { useEffect, useState } from 'react'

import { initializeMapbox } from 'src/mapbox.config'

export const DroneFlightsMap = () => {
  const [map, setMap] = useState<mapboxgl.Map>()

  useEffect(() => {
    initializeMapbox(
      'drone-flights-map-container',
      setMap,
      [
        -54.47573384080506, -0.0019358806309526244, -64.16146283459103,
        -6.463821341171396,
      ]
    )
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
