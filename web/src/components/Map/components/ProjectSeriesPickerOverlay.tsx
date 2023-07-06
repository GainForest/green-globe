import { useState } from 'react'

import { useThemeUI } from 'theme-ui'

import { addMarkers } from '../maputils'

export const ProjectSeriesPickerOverlay = ({
  map,
  dispatch,
  markers,
  projectPolygons,
  setActiveProject,
  setMarkers,
}) => {
  const { theme } = useThemeUI()
  const [gainForestDisplayed, setGainForestDisplayed] = useState<boolean>(true)

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
                dispatch,
                projectPolygons,
                'gainforest',
                setActiveProject
              )
              setMarkers([...markers, ...newMarkers])
            }
            setGainForestDisplayed(!gainForestDisplayed)
          }}
        />
        Display GainForest Projects
      </p>
    </div>
  )
}
