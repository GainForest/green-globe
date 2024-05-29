import { useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

import { fetchEDNALocations } from 'src/components/Map/mapfetch'
import { addEDNASourceAndLayers } from 'src/components/Map/maputils'
import { addFlightPathSourceAndLayer } from 'src/components/Map/sourcesAndLayers/flightPath'
import { initializeMapbox } from 'src/mapbox.config'

const SEMIFINALS_BOUNDARIES = [
  103.83082429098584, 1.3640090963940423, 103.80628944617558,
  1.3475293623401257,
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
