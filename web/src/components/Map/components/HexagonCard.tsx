/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { InfoBox } from './InfoBox'

export const fetchWhatThreeWords = async (clickedCoords, setWhatThreeWords) => {
  fetch(
    `https://api.what3words.com/v3/convert-to-3wa?coordinates=${clickedCoords.lat}%2C${clickedCoords.lon}&key=${process.env.WHAT3WORDS}`
  )
    .then((res) => res.json())
    .then((response) => setWhatThreeWords(response.words))
}

export const HexagonCard = ({ clickedCoords }) => {
  const [whatThreeWords, setWhatThreeWords] = useState(undefined)

  useEffect(() => {
    fetchWhatThreeWords(clickedCoords, setWhatThreeWords)
  }, [clickedCoords])

  return (
    <InfoBox>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '12px' }}>
        <p style={{ color: '#000000' }}>
          <span style={{ color: '#E11F26' }}>{'/// '}</span>
          {whatThreeWords}
        </p>
        <div
          style={{
            height: '250px',
            width: '250px',
            border: '1px solid #000000',
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
        <button>Add plot to my ecosytems</button>
      </div>
    </InfoBox>
  )
}
