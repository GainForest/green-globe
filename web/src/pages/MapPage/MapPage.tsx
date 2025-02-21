import { useEffect, useState } from 'react'
import { useLocation } from '@redwoodjs/router'

import 'react-loading-skeleton/dist/skeleton.css'
import Map from 'src/components/Map/Map'

const MapPage = ({ projectId, overlay }) => {
  const [mediaSize, setMediaSize] = useState(window.innerWidth)
  const { search } = useLocation()
  const shapefile = new URLSearchParams(search).get('shapefile')
  const showUI = new URLSearchParams(search).get('showUI') !== 'false'

  useEffect(() => {
    const handleResize = () => {
      setMediaSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Map
      projectId={projectId}
      overlay={overlay}
      mediaSize={mediaSize}
      shapefile={shapefile}
      showUI={showUI}
    />
  )
}

export default MapPage
