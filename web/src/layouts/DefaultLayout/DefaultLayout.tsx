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

  useEffect(() => {
    const handleResize = () => {
      setMediaSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbar isAuthenticated={isAuthenticated} mediaSize={mediaSize} />
      <div
        style={{
          height: 'calc(100vh - 52px)',
          width: 'calc(100%-52px)',
          display: 'flex',
        }}
      >
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout
