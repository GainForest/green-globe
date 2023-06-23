// The following values can be changed to control rotation speed:

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 120
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3

const userInteracting = false

export const spinGlobe = (map, spinEnabled) => {
  if (map) {
    const zoom = map.getZoom()
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution
      if (zoom > slowSpinZoom) {
        // Slow spinning at higher zooms
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom)
        distancePerSecond *= zoomDif
      }
      const center = map.getCenter()
      center.lng -= distancePerSecond
      // Smoothly animate the map over one second.
      // When this animation is complete, it calls a 'moveend' event.
      map.easeTo({ center, duration: 1000, easing: (n) => n })
    }
  }
}
