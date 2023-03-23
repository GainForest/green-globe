import { useEffect } from 'react'

import { initializeMapboxConfig } from 'src/mapbox.config'
import 'mapbox-gl/dist/mapbox-gl.css'

export const Map = () => {
  // Initialize Map
  useEffect(() => {
    initializeMapboxConfig('map-container')
  }, [])

  return <div style={{ height: '100%', width: '100%' }} id="map-container" />
}

export default Map
