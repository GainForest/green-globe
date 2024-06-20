import { useState } from 'react'

import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'

import { Pokedex } from '../Pokedex/Pokedex'

import { CircadianRythmn } from './CircadianRythmn'
import { InsectSpy } from './InsectSpy'
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
  const [displayedInsight, setDisplayedInsight] = useState<
    'circadian' | 'trees' | 'insectspy' | 'pokedex'
  >('circadian')

  return (
    <div>
      <IconBar>
        <IconButton
          buttonIcon={'schedule'}
          active={displayedInsight == 'circadian'}
          onClick={() => setDisplayedInsight('circadian')}
        />
        <IconButton
          buttonIcon={'bug_report'}
          active={displayedInsight == 'insectspy'}
          onClick={() => setDisplayedInsight('insectspy')}
        />
        {/* <IconButton
          buttonIcon={'park'}
          active={displayedInsight == 'trees'}
          onClick={() => setDisplayedInsight('trees')}
        /> */}
        <IconButton
          buttonIcon={'search'}
          active={displayedInsight == 'pokedex'}
          onClick={() => setDisplayedInsight('pokedex')}
        />
      </IconBar>
      {displayedInsight == 'circadian' && <CircadianRythmn />}
      {displayedInsight == 'insectspy' && <InsectSpy />}
      {displayedInsight == 'trees' && (
        <MeasuredTreesGrid
          measuredData={measuredData}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
          handleSpeciesClick={handleSpeciesClick}
          selectedSpecies={selectedSpecies}
        />
      )}
      {displayedInsight == 'pokedex' && <Pokedex mediaSize={mediaSize} />}
    </div>
  )
}

const IconBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  gap: 6px;
`
