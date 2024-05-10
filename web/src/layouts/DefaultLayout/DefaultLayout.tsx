import { useEffect, useState } from 'react'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar/Navbar'
import Sidebar from 'src/components/Sidebar/Sidebar'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated } = useAuth()

  const [mediaSize, setMediaSize] = useState(window.innerWidth)
  const [sidebarIsActive, setSidebarIsActive] = useState(false)

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
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbar isAuthenticated={isAuthenticated} mediaSize={mediaSize} />
      <div
        style={{
          height: 'calc(100vh - 52px)',
          display: 'flex',
          width: '100%',
        }}
      >
        <Sidebar active={sidebarIsActive} handleClick={handleMenuClick} />
        <main
          style={{
            flexGrow: 1,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
