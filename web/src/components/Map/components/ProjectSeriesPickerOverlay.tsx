import { useState } from 'react'

import { useThemeUI } from 'theme-ui'

import { addMarkers } from '../maputils'

export const ProjectSeriesPickerOverlay = ({
  map,
  markers,
  projectPolygons,
  verraPolygons,
  setActiveProjectPolygon,
  setActiveProject,
  setDisplayOverlay,
  setMarkers,
}) => {
  const { theme } = useThemeUI()
  const [gainForestDisplayed, setGainForestDisplayed] = useState<boolean>(true)
  const [verraDisplayed, setVerraDisplayed] = useState<boolean>(false)

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'pointer',
        width: '240px',
        height: '68px',
        backgroundColor: theme.colors.background as string,
        position: 'absolute',
        bottom: 210,
        right: 8,
        borderRadius: '8px',
        padding: '4px 8px',
      }}
    >
      <p style={{ fontSize: '0.75rem' }}>
        <input
          defaultChecked
          type="checkbox"
          onClick={() => {
            if (gainForestDisplayed) {
              markers.forEach((marker) => {
                if (marker._element.className.includes('gainforest')) {
                  marker.remove()
                }
              })
            } else {
              const newMarkers = addMarkers(
                map,
                projectPolygons,
                'gainforest',
                setActiveProjectPolygon,
                setActiveProject,
                setDisplayOverlay
              )
              setMarkers([...markers, ...newMarkers])
            }
            setGainForestDisplayed(!gainForestDisplayed)
          }}
        />
        Display GainForest Projects
      </p>
      <p style={{ fontSize: '0.75rem' }}>
        <input
          type="checkbox"
          onClick={() => {
            if (verraDisplayed) {
              markers.forEach((marker) => {
                if (marker._element.className.includes('verra')) {
                  marker.remove()
                }
              })
            } else {
              const newMarkers = addMarkers(
                map,
                verraPolygons,
                'verra',
                setActiveProjectPolygon,
                setActiveProject,
                setDisplayOverlay
              )
              setMarkers([...markers, ...newMarkers])
            }
            setVerraDisplayed(!verraDisplayed)
          }}
        />
        Display Verra Projects
      </p>
    </div>
  )
}
