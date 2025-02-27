import { useLocation } from '@redwoodjs/router'
import { useEffect, useState } from 'react'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar/Navbar'
// import Sidebar from 'src/components/Sidebar/Sidebar'

type DefaultLayoutProps = {
  children?: React.ReactNode,
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated } = useAuth()

  const { search } = useLocation()
  const showNavbar = new URLSearchParams(search).get('showUI') !== 'false';

  const [mediaSize, setMediaSize] = useState(window.innerWidth)
  const [sidebarIsActive, setSidebarIsActive] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setMediaSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMenuClick = () => {
    setSidebarIsActive((active) => !active)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}>
      {showNavbar && <Navbar isAuthenticated={isAuthenticated} mediaSize={mediaSize} />}
      <div
        style={{
          height: `calc(100vh - ${showNavbar ? '52px' : '0px'})`,
          display: 'flex',
          width: '100%',
        }}
      >
        {/* <Sidebar active={sidebarIsActive} handleClick={handleMenuClick} /> */}
        <main
          style={{
            flexGrow: 1,
            height: '100%',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
