import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { fetchEDNALocations } from 'src/components/Map/mapfetch'
import { addEDNASourceAndLayers } from 'src/components/Map/maputils'
import { addFlightPathSourceAndLayer } from 'src/components/Map/sourcesAndLayers/flightPath'
import { initializeMapbox } from 'src/mapbox.config'

const SEMIFINALS_BOUNDARIES = [
  103.82236016772544, 1.357013978514786, 103.81457510747856, 1.3517848524943759,
]

export const DroneFlightsMap = () => {
  const [map, setMap] = useState<mapboxgl.Map>()

  const [ednaLocations, setEDNALocations] = useState()

  useEffect(() => {
    fetchEDNALocations(setEDNALocations)
  }, [])

  useEffect(() => {
    initializeMapbox(
      'drone-flights-map-container',
      setMap,
      SEMIFINALS_BOUNDARIES
    )
  }, [])

  useEffect(() => {
    if (map && ednaLocations) {
      map.on('load', () => {
        addFlightPathSourceAndLayer(map)
        addEDNASourceAndLayers(map, ednaLocations)
      })
      map.on('moveend', () => {
        console.log(map.getBounds())
      })
    }
  }, [map, ednaLocations])

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
