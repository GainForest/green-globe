import { useEffect, useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import 'react-loading-skeleton/dist/skeleton.css'
import { useAuth } from 'src/auth'
import Map from 'src/components/Map/Map'
import Navbar from 'src/components/Navbar/Navbar'

const MapPage = ({ urlProjectId, initialOverlay }) => {
  const { isAuthenticated } = useAuth()

  const [mediaSize, setMediaSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setMediaSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <MetaTags title="Home" description="Explore GainForest Projects" />

      <div style={{ width: '100vw', height: '100vh' }}>
        <Navbar isAuthenticated={isAuthenticated} mediaSize={mediaSize} />
        <Map initialOverlay={initialOverlay} mediaSize={mediaSize} />
      </div>
    </>
  )
}

export default MapPage
