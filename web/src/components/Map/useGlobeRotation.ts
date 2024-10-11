import { useEffect, useRef } from 'react'

import mapboxgl from 'mapbox-gl'

import { spinGlobe } from './maprotate'

export const useGlobeRotation = (map: mapboxgl.Map | undefined) => {
  const isGlobeSpinningRef = useRef(true)

  useEffect(() => {
    if (!map) return

    const startSpin = () => {
      spinGlobe(map, isGlobeSpinningRef.current)
    }

    const onMoveEnd = () => {
      startSpin()
    }

    const onInteraction = () => {
      isGlobeSpinningRef.current = false
    }

    // Start the initial spin
    startSpin()

    // Set up event listeners
    map.on('moveend', onMoveEnd)
    map.on('mousedown', onInteraction)
    map.on('touchstart', onInteraction)

    // Clean up
    return () => {
      map.off('moveend', onMoveEnd)
      map.off('mousedown', onInteraction)
      map.off('touchstart', onInteraction)
    }
  }, [map])
}
