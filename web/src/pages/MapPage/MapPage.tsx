import { useEffect, useState } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import Map from 'src/components/Map/Map'

const MapPage = ({ urlProjectId, initialOverlay }) => {
  const [mediaSize, setMediaSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setMediaSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Map
      urlProjectId={urlProjectId}
      initialOverlay={initialOverlay}
      mediaSize={mediaSize}
    />
  )
}

export default MapPage
