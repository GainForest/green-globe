import { useEffect, useState } from 'react'

import * as d3 from 'd3'
import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'

import { CircadianRythmn } from './CircadianRythmn'
import { IndividualDataGrid } from './IndividualDataGrid'
import { MeasuredTreesGrid } from './MeasuredTreesGrid'

export const MeasuredDataGrid = ({
  mediaSize,
  sortBy,
  setSortBy,
  measuredData,
  loading,
  setLoading,
  handleSpeciesClick,
  selectedSpecies,
}) => {
  const [individuals, setIndividuals] = useState([])

  // Fetch the finals_new.csv, and display each individual in the insect spy.
  useEffect(() => {
    d3.csv(`${process.env.AWS_STORAGE}/insectspy/finals_new.csv`)
      .then(setIndividuals)
      .then(() => setLoading(false))
  }, [])

  return (
    <div>
      <IconBar>
        <IconButton
          buttonIcon={'schedule'}
          active={false}
          mediaSize={mediaSize}
        />
        <IconButton
          buttonIcon={'bug_report'}
          active={false}
          mediaSize={mediaSize}
        />
        <IconButton buttonIcon={'park'} active={false} mediaSize={mediaSize} />
      </IconBar>
      <CircadianRythmn />
      <IndividualDataGrid data={individuals} />
      <MeasuredTreesGrid
        measuredData={measuredData}
        sortBy={sortBy}
        setSortBy={setSortBy}
        loading={loading}
        handleSpeciesClick={handleSpeciesClick}
        selectedSpecies={selectedSpecies}
      />
    </div>
  )
}

const IconBar = styled.div`
width: 100%
height: 40px
& > * {
  margin: 4px
}
`
