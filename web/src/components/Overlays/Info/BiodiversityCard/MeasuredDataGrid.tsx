import { useState } from 'react'

import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'
import Dendogram from 'src/components/Dendogram/Dendogram'

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
    'circadian' | 'trees' | 'insectspy' | 'pokedex' | 'dendogram'
  >('circadian')

  return (
    <div>
      <IconBar>
        <IconButton
          buttonIcon={'search'}
          active={displayedInsight == 'pokedex'}
          onClick={() => setDisplayedInsight('pokedex')}
          dataTooltipId={'biodiversity-pokedex-insight'}
        />
        <Tooltip id="biodiversity-pokedex-insight">All Observations</Tooltip>
        <IconButton
          buttonIcon={'/icons/dendogram_small'}
          active={displayedInsight == 'dendogram'}
          onClick={() => setDisplayedInsight('dendogram')}
          dataTooltipId={'biodiversity-dendogram-insight'}
        />
        <Tooltip id="biodiversity-dendogram-insight">Species Dendogram</Tooltip>
        <IconButton
          buttonIcon={'music_note'}
          active={displayedInsight == 'circadian'}
          onClick={() => setDisplayedInsight('circadian')}
          dataTooltipId={'biodiversity-circadian-rhythm-insight'}
        />
        <Tooltip id="biodiversity-circadian-rhythm-insight" place="top">
          Circadian Rhythm
        </Tooltip>
        <IconButton
          buttonIcon={'bug_report'}
          active={displayedInsight == 'insectspy'}
          onClick={() => setDisplayedInsight('insectspy')}
          dataTooltipId={'biodiversity-insectspy-insight'}
        />
        <Tooltip id="biodiversity-insectspy-insight">InsectSpy</Tooltip>
        {/* <IconButton
          buttonIcon={'park'}
          active={displayedInsight == 'trees'}
          onClick={() => setDisplayedInsight('trees')}
        /> */}
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
      {displayedInsight == 'dendogram' && <Dendogram />}
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
