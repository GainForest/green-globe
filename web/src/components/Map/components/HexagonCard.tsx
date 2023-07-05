/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { InfoBox } from './InfoBox'
import RoundedButton from './RoundedButton'

export const fetchWhatThreeWords = async (clickedCoords, setWhatThreeWords) => {
  fetch(
    `https://api.what3words.com/v3/convert-to-3wa?coordinates=${clickedCoords.lat}%2C${clickedCoords.lon}&key=${process.env.WHAT3WORDS}`
  )
    .then((res) => res.json())
    .then((response) => setWhatThreeWords(response.words))
}

export const HexagonCard = ({ clickedCoords, numHexagons }) => {
  const [whatThreeWords, setWhatThreeWords] = useState(undefined)
  const numPlots = numHexagons.current

  useEffect(() => {
    fetchWhatThreeWords(clickedCoords, setWhatThreeWords)
  }, [clickedCoords])

  return (
    <InfoBox>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '6px 24px',
        }}
      >
        <h2>Defensores del Chaco</h2>
        <p style={{ fontSize: '14px' }}>Plot 4 / 200</p>
        <div style={{ position: 'relative', height: '250px' }}>
          <div
            style={{
              height: '250px',
              width: '250px',
              backgroundColor: '#F5F7F9',
              clipPath:
                'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
              margin: '0 auto',
            }}
          >
            <video
              style={{
                textAlign: 'center',
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              width="170"
              height="170"
              autoPlay
              loop
              src="https://gainforest-transparency-dashboard.s3.amazonaws.com/nftree-video/defensores-del-chaco-video.mp4"
            />
          </div>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              clipPath:
                'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
            }}
          ></div>
        </div>

        <p style={{ color: '#000000', fontSize: '12px' }}>
          <span style={{ color: '#E11F26' }}>{'/// '}</span>
          {whatThreeWords}
        </p>
        <RoundedButton>
          Add {numPlots > 1 ? numPlots : ''} plot{numPlots > 1 ? 's' : ''} to my
          ecosytems
        </RoundedButton>
      </div>
    </InfoBox>
  )
}
