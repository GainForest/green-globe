import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import 'react-loading-skeleton/dist/skeleton.css'
import { useAuth } from 'src/auth'
import Map from 'src/components/Map/Map'
import Navbar from 'src/components/Navbar/Navbar'

const MapPage = ({ urlProjectId }) => {
  const { isAuthenticated } = useAuth()

  // Check user-agent string if the user is on mobile but not on ipad.
  const mobileRegex = /\b(Android|webOS|iPhone|BlackBerry|Windows Phone)\b/

  if (mobileRegex.test(navigator.userAgent)) {
    return (
      <>
        <MetaTags title="Home" description="Explore GainForest Projects" />

        <div style={{ width: '100vw', height: '100vh' }}>
          <Navbar isAuthenticated={isAuthenticated} />
          <h1>
            Mobile is not supported yet. Please visit{' '}
            <a href="https://www.data.gainforest.app">
              https://www.data.gainforest.app
            </a>
          </h1>
        </div>
      </>
    )
  }

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
