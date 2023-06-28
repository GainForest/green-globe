import { MetaTags } from '@redwoodjs/web'

import RoundedButton from 'src/components/Map/components/RoundedButton'
import Navbar from 'src/components/Navbar/Navbar'

const LandingPage = () => {
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <Navbar />

      <div style={{ display: 'flex' }}>
        <div style={{ margin: '10% 64px 64px 80px' }}>
          <h1 style={{ fontSize: '3em' }}>
            1.9B hectares of land left to restore and protect.
          </h1>
          <p style={{ fontSize: '1.5em', margin: '48px 0px' }}>
            This is the challenge in front of us.
          </p>
          <a href="/app">
            <RoundedButton active={true} style={{ fontSize: '1.25em' }}>
              Become a steward
            </RoundedButton>
          </a>
        </div>

        <img
          style={{ width: '50%' }}
          src="https://gainforest-images.s3.eu-west-2.amazonaws.com/vidi/landing-earth.png"
        ></img>
      </div>
    </>
  )
}

export default LandingPage
