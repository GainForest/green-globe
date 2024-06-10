import { useEffect, useState } from 'react'

import { HexagonalImage } from 'src/components/HexagonalImage/HexagonalImage'

export const PredictedBirds = () => {
  const [predictedBirds, setPredictedBirds] = useState([])

  useEffect(() => {
    fetch(
      `${process.env.AWS_STORAGE}/audio/013-089-Tufted-Tit-Tyrant_predicted.json`
    )
      .then((res) => res.json())
      .then(setPredictedBirds)
  }, [])

  if (predictedBirds) {
    return (
      <div>
        <h1>Predicted Birds</h1>
        {predictedBirds[1]?.data
          .filter((d) => d[1] > 1)
          .map((d) => (
            <div>
              <p key={d[1]}>
                {d[0].replace(/_/g, ' ')} - {d[1]}%
              </p>
            </div>
          ))}
      </div>
    )
  } else {
    return <div></div>
  }
}
