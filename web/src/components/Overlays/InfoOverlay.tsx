import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { toggleFullscreenOverlay } from 'src/reducers/fullscreenOverlayReducer'
import { setInfoOverlay } from 'src/reducers/overlaysReducer'

import { ExitButton } from '../Map/components/ExitButton'
import { MaximizeButton } from '../Map/components/MaximizeButton'

import { BiodiversityCard } from './Info/BiodiversityCard/BiodiversityCard'
import { ChatCard } from './Info/ChatCard'
import { CommunityCard } from './Info/CommunityCard'
import { DownloadCard } from './Info/DownloadCard'
import { InfoOverlayButton } from './Info/InfoOverlayButton'
import { LogbookCard } from './Info/LogbookCard'
import { MediaCard } from './Info/MediaCard'
import { ActiveSpeciesCard } from './Info/Pokedex/ActiveSpeciesCard'
import { KingdomList } from './Info/Pokedex/KingdomList'
import { ProjectCard } from './Info/ProjectCard/ProjectCard'
import { RestorCard } from './Info/RestorCard/RestorCard'

export const InfoOverlay = ({
  activeProjectData,
  activeProjectPolygon,
  // numHexagons,
  setActiveProjectPolygon,
  mediaSize,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState<'Photos' | 'Videos'>('Photos')

  const infoOverlay = useSelector((state: State) => state.overlays.info)
  const fullScreenOverlay = useSelector(
    (state: State) => state.fullscreenOverlay
  )
  const { source, type, component, props, active } = fullScreenOverlay

  const handleClick = () => {
    dispatch(toggleFullscreenOverlay())
  }

  return (
    <>
      {active && (
        <ImageOverlay
          toggle={toggle}
          endpoint={source}
          fileType={type}
          contentProps={props}
          ContentComponent={component}
        />
      )}
      <MaximizeButton mediaSize={mediaSize} style={null} />
      <ExitButton
        mediaSize={mediaSize}
        onClick={() => dispatch(setInfoOverlay('null'))}
        style={null}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        description={'Project Info'}
        buttonIcon={'star'}
        position={2}
        active={infoOverlay.startsWith('info')}
        onClick={() => dispatch(setInfoOverlay('info'))}
      />
      {/* <InfoOverlayButton
        mediaSize={mediaSize}
        description={'AI Assistant'}
        buttonIcon={'chat'}
        position={2}
        active={infoOverlay.startsWith(5})
        onClick={() => dispatch(setInfoOverlay('5'))}
      /> */}
      <InfoOverlayButton
        mediaSize={mediaSize}
        description={'Biodiversity'}
        buttonIcon={'pets'}
        position={3}
        active={infoOverlay.startsWith('biodiversity')}
        // TODO: move default menu logic to relevant component (so can we just set overlay to 'biodiversity')
        onClick={() =>
          dispatch(setInfoOverlay('biodiversity-observations-pokedex'))
        }
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        description={'Media'}
        buttonIcon={'satellite'}
        position={4}
        active={infoOverlay.startsWith('media')}
        onClick={() => dispatch(setInfoOverlay('media'))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        description={'Remote Sensing Analysis'}
        buttonIcon={'satellite_alt'}
        position={5}
        active={infoOverlay.startsWith('remoteAnalysis')}
        onClick={() => dispatch(setInfoOverlay('remoteAnalysis'))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        description={'Community Payments'}
        buttonIcon={'emoji_people'}
        position={6}
        active={infoOverlay.startsWith('community')}
        onClick={() => dispatch(setInfoOverlay('community'))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        description={'Logbook'}
        buttonIcon={'book'}
        position={7}
        active={infoOverlay.startsWith('logbook')}
        onClick={() => dispatch(setInfoOverlay('logbook'))}
      />

      {activeProjectData?.project?.dataDownloadUrl && (
        <InfoOverlayButton
          mediaSize={mediaSize}
          buttonIcon={'download'}
          position={8}
          active={infoOverlay.startsWith('download')}
          onClick={() => dispatch(setInfoOverlay('download'))}
        />
      )}

      {infoOverlay.startsWith('info') && (
        <ProjectCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
          handleClick={handleClick}
        />
      )}
      {infoOverlay.startsWith('biodiversity') && (
        <BiodiversityCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
        />
      )}
      {infoOverlay.startsWith('media') && (
        <MediaCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          toggle={toggle}
          setToggle={setToggle}
        />
      )}
      {infoOverlay.startsWith('community') && (
        <CommunityCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
        />
      )}
      {infoOverlay.startsWith('chat') && (
        <ChatCard mediaSize={mediaSize} activeProjectData={activeProjectData} />
      )}
      {infoOverlay.startsWith('logbook') && (
        <LogbookCard
          activeProjectData={activeProjectData}
          mediaSize={mediaSize}
        />
      )}
      {infoOverlay.startsWith('remoteAnalysis') && (
        <RestorCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
        />
      )}
      {infoOverlay.startsWith('download') &&
        activeProjectData?.project?.dataDownloadUrl && (
          <DownloadCard
            mediaSize={mediaSize}
            activeProjectData={activeProjectData}
          />
        )}
    </>
  )
}

export const ImageOverlay = ({
  toggle,
  endpoint,
  fileType,
  ContentComponent,
  contentProps,
}) => {
  const dispatch = useDispatch()
  if (fileType === 'component' && ContentComponent) {
    if (ContentComponent == 'KingdomList') {
      return (
        <div className="overlay" style={{ zIndex: 4 }}>
          <button
            onClick={() => dispatch(toggleFullscreenOverlay())}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '48px',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          <div className="species-overlay">
            <KingdomList {...contentProps} />
          </div>
        </div>
      )
    } else if (ContentComponent == 'ActiveSpeciesCard') {
      // full size version of speciesCard, appears when clicked
      return (
        <div className="overlay" style={{ zIndex: 5 }}>
          <ActiveSpeciesCard {...contentProps} />
        </div>
      )
    }
  }
  return (
    <div
      className="overlay"
      style={{ zIndex: 4 }}
      onClick={() => dispatch(toggleFullscreenOverlay())}
    >
      {fileType !== 'video' && toggle == 'Photos' ? (
        <img
          src={`${process.env.AWS_STORAGE}/${endpoint}`}
          alt="Taken by community members"
          style={{ maxWidth: '90%' }}
        />
      ) : (
        <video src={`${process.env.AWS_STORAGE}/${endpoint}`} autoPlay />
      )}
    </div>
  )
}
