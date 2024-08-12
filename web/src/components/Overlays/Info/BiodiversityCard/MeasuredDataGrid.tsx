import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

import { IconButton } from 'src/components/Buttons/IconButton'
import { CanopyInsights } from 'src/components/CanopyInsights/CanopyInsights'
import Dendogram from 'src/components/Dendogram/Dendogram'
import { GeneticInsights } from 'src/components/GeneticInsights/GeneticInsights'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'

import { Pokedex } from '../Pokedex/Pokedex'

import { CircadianRythmn } from './CircadianRythmn'
import { InsectSpy } from './InsectSpy'
// import { MeasuredTreesGrid } from './MeasuredTreesGrid'

export const MeasuredDataGrid = ({ mediaSize }) => {
  const dispatch = useDispatch()
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  return (
    <div>
      <IconBar>
        <IconButton
          buttonIcon={'search'}
          active={infoOverlay.startsWith('biodiversity-observations-pokedex')}
          onClick={() =>
            dispatch(setInfoOverlay('biodiversity-observations-pokedex'))
          }
          dataTooltipId={'biodiversity-observations-pokedex-insight'}
        />
        <Tooltip id="biodiversity-observations-pokedex-insight">
          All Observations
        </Tooltip>
        <IconButton
          buttonIcon={'/icons/dendogram_small'}
          active={infoOverlay.startsWith('biodiversity-observations-dendogram')}
          onClick={() =>
            dispatch(setInfoOverlay('biodiversity-observations-dendogram'))
          }
          dataTooltipId={'biodiversity-observations-dendogram-insight'}
        />
        <Tooltip id="biodiversity-observations-dendogram-insight">
          Species Dendogram
        </Tooltip>
        <IconButton
          buttonIcon={'music_note'}
          active={infoOverlay.startsWith('biodiversity-observations-circadian')}
          onClick={() =>
            dispatch(setInfoOverlay('biodiversity-observations-circadian'))
          }
          dataTooltipId={'biodiversity-observations-circadian-rhythm-insight'}
        />
        <Tooltip
          id="biodiversity-observations-circadian-rhythm-insight"
          place="top"
        >
          Soundscape Insights
        </Tooltip>
        <IconButton
          buttonIcon={'park'}
          active={infoOverlay.startsWith('biodiversity-observations-trees')}
          onClick={() =>
            dispatch(setInfoOverlay('biodiversity-observations-trees'))
          }
          dataTooltipId={'biodiversity-observations-trees-insight'}
        />
        <Tooltip id="biodiversity-observations-trees-insight" place="top">
          Canopy Insights
        </Tooltip>
        <IconButton
          buttonIcon={'bug_report'}
          active={infoOverlay.startsWith('biodiversity-observations-insectspy')}
          onClick={() =>
            dispatch(setInfoOverlay('biodiversity-observations-insectspy'))
          }
          dataTooltipId={'biodiversity-observations-insectspy-insight'}
        />
        <Tooltip id="biodiversity-observations-insectspy-insight">
          Insect Insights
        </Tooltip>
      </IconBar>
      {infoOverlay.startsWith('biodiversity-observations-circadian') && (
        <CircadianRythmn />
      )}
      {infoOverlay.startsWith('biodiversity-observations-insectspy') && (
        <InsectSpy />
      )}
      {infoOverlay.startsWith('biodiversity-observations-trees') && (
        // <MeasuredTreesGrid
        //   measuredData={measuredData}
        //   sortBy={sortBy}
        //   setSortBy={setSortBy}
        //   loading={loading}
        //   handleSpeciesClick={handleSpeciesClick}
        //   selectedSpecies={selectedSpecies}
        // />
        <CanopyInsights />
      )}
      {infoOverlay.startsWith('biodiversity-observations-dendogram') && (
        <Dendogram />
      )}
      {infoOverlay.startsWith('biodiversity-observations-pokedex') && (
        <Pokedex mediaSize={mediaSize} />
      )}
    </div>
  )
}

const IconBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  gap: 6px;
`
