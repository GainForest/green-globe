import { MetaTags } from '@redwoodjs/web'

import 'react-loading-skeleton/dist/skeleton.css'
import { useAuth } from 'src/auth'
import Map from 'src/components/Map/Map'
import Navbar from 'src/components/Navbar/Navbar'

const MapPage = ({ urlProjectId }) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <MetaTags title="Home" description="Explore GainForest Projects" />

      <div style={{ width: '100vw', height: '100vh' }}>
        <Navbar isAuthenticated={isAuthenticated} />
        <Map urlProjectId={urlProjectId} />
      </div>
    </>
  )
}

export default MapPage
