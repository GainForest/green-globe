import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { fetchEDNALocations } from 'src/components/Map/mapfetch'
import { addEDNASourceAndLayers } from 'src/components/Map/sourcesAndLayers/edna'
import { addFlightPathSourceAndLayer } from 'src/components/Map/sourcesAndLayers/flightPath'
import { initializeMapbox } from 'src/mapbox.config'

const SEMIFINALS_BOUNDARIES = [
  103.82236016772544, 1.357013978514786, 103.81457510747856, 1.3517848524943759,
]

export const DroneFlightsMap = () => {
  const [map, setMap] = useState<mapboxgl.Map>()
  const [sourcesAndLayersLoaded, setSourcesAndLayersLoaded] = useState()

  useEffect(() => {
    if (sourcesAndLayersLoaded) {
      fetchEDNALocations(map)
    }
  }, [map, sourcesAndLayersLoaded])

  useEffect(() => {
    initializeMapbox(
      'drone-flights-map-container',
      setMap,
      SEMIFINALS_BOUNDARIES
    )
  }, [])

  useEffect(() => {
    if (map) {
      map.on('load', () => {
        addFlightPathSourceAndLayer(map)
        addEDNASourceAndLayers(map)
        setSourcesAndLayersLoaded(map)
      })
    }
  }, [map])

  return (
    <div
      style={{
        height: '500px',
        width: '60vw',
        maxHeight: '50vh',
        maxWidth: '70vw',
      }}
      id="drone-flights-map-container"
    />
  )
}
