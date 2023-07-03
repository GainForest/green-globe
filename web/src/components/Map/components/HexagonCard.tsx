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
      <br />
      <p style={{ color: '#FFFFFF' }}>{whatThreeWords}</p>

      <video
        width="200"
        height="200"
        autoPlay
        loop
        src="https://gainforest-transparency-dashboard.s3.amazonaws.com/nftree-video/defensores-del-chaco-video.mp4"
      />
    </InfoBox>
  )
}
