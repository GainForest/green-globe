/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { showBasket } from 'src/reducers/overlaysReducer'
import { incrementBasketByAmount } from 'src/reducers/shopReducer'

import RoundedButton from '../../Map/components/RoundedButton'

import { InfoBox } from './InfoBox'

export const fetchWhatThreeWords = async (clickedCoords, setWhatThreeWords) => {
  fetch(
    `https://api.what3words.com/v3/convert-to-3wa?coordinates=${clickedCoords.lat}%2C${clickedCoords.lon}&key=${process.env.WHAT3WORDS}`
  )
    .then((res) => res.json())
    .then((response) => setWhatThreeWords(response.words))
}

export const HexagonCard = ({ numHexagons }) => {
  const [whatThreeWords, setWhatThreeWords] = useState(undefined)
  const clickedCoordinates = useSelector(
    (state: State) => state.display.clickedCoordinates
  )
  const numPlots = numHexagons.current
  const dispatch = useDispatch()

  useEffect(() => {
    fetchWhatThreeWords(clickedCoordinates, setWhatThreeWords)
  }, [clickedCoordinates])

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
        <p style={{ fontSize: '14px' }}>
          <b>Current Steward: </b> <br />
          @forestboy17 (May 2023 - October 2023)
        </p>
        {/* <p style={{ fontSize: '14px' }}>Plot 4 / 200</p> */}
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
        <div style={{ marginLeft: '12px' }}>
          {/* <p style={{ fontSize: '14px' }}>Forest type: Semiarid</p>
          <p style={{ fontSize: '14px' }}>Area: 0.25 hectares</p> */}

          <p style={{ fontSize: '14px' }}>
            By funding this plot, you are contributing towards protecting 0.25
            hectares of forest for one month.
          </p>

          <p>What do I get for my stewardship?</p>
          <p style={{ fontSize: '14px' }}>- Benefit 1</p>
          <p style={{ fontSize: '14px' }}>- Benefit 2</p>
          <p style={{ fontSize: '14px' }}>- Benefit 3</p>
        </div>

        {/* <p style={{ color: '#000000', fontSize: '12px' }}>
          <span style={{ color: '#E11F26' }}>{'/// '}</span>
          {whatThreeWords}
        </p> */}

        <RoundedButton
          onClick={() => {
            dispatch(showBasket())
            dispatch(incrementBasketByAmount(numPlots))
          }}
        >
          Add {numPlots > 1 ? numPlots : ''} plot{numPlots > 1 ? 's' : ''} to my
          ecosytem
        </RoundedButton>
      </div>
    </InfoBox>
  )
}
