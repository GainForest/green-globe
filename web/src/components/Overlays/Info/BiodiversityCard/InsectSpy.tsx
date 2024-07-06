import { useState, useEffect } from 'react'

import * as d3 from 'd3'

import { HexagonalImage } from 'src/components/HexagonalImage/HexagonalImage'

// These are taken from the XPRIZE observations table
interface Individual {
  'Filename/Run': string //imageUrl
  class: string
}

export const InsectSpy = () => {
  const [individuals, setIndividuals] = useState<Individual[]>([])

  // Fetch the finals_new.csv, and display each individual in the insect spy.
  useEffect(() => {
    d3.csv(
      `${process.env.AWS_STORAGE}/insectspy/xprize-finals-dry-run/individuals.csv`
    ).then(setIndividuals)
  }, [])

  if (individuals.length) {
    return (
      <div>
        <h2> Insect trap </h2>
        <p> Insects detected by our insect trap. </p>
        {individuals.map((d) => (
          <div key={d.class}>
            <HexagonalImage
              key={d.class}
              alt={d.class}
              src={`${process.env.AWS_STORAGE}/insectspy/xprize-finals-dry-run/${d['Filename/Run']}`}
            />
            {d.class}
          </div>
        ))}
      </div>
    )
  } else {
    return <div></div>
  }
}
