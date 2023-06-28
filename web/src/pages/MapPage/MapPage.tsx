import { MetaTags } from '@redwoodjs/web'

import Map from 'src/components/Map/Map'

import 'react-loading-skeleton/dist/skeleton.css'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Explore GainForest Projects" />

      <div style={{ width: '100vw', height: '100vh' }}>
        <Map />
      </div>
    </>
  )
}

export default HomePage
