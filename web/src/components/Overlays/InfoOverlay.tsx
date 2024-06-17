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
import { ActiveSpeciesCard } from './Info/Pokedex/ActiveSpeciesCard'
import { KingdomList } from './Info/Pokedex/KingdomList'
import { Pokedex } from './Info/Pokedex/Pokedex'
import { ProjectCard } from './Info/ProjectCard/ProjectCard'
import { WildlifeCard } from './Info/WildlifeCard'

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
          handleClick={handleClick}
          fileType={type}
          contentProps={props}
          ContentComponent={component}
        />
      )}
      <MaximizeButton mediaSize={mediaSize} style={null} />
      <ExitButton
        mediaSize={mediaSize}
        onClick={() => dispatch(setInfoOverlay(null))}
        style={null}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'forest'}
        position={1}
        active={infoOverlay == 1}
        onClick={() => dispatch(setInfoOverlay(1))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'pets'}
        position={2}
        active={infoOverlay == 2}
        onClick={() => dispatch(setInfoOverlay(2))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'photo'}
        position={3}
        active={infoOverlay == 3}
        onClick={() => dispatch(setInfoOverlay(3))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'emoji_people'}
        position={4}
        active={infoOverlay == 4}
        onClick={() => dispatch(setInfoOverlay(4))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'chat'}
        position={5}
        active={infoOverlay == 5}
        onClick={() => dispatch(setInfoOverlay(5))}
      />
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'book'}
        position={6}
        active={infoOverlay == 6}
        onClick={() => dispatch(setInfoOverlay(6))}
      />
      {activeProjectData?.project?.dataDownloadUrl && (
        <InfoOverlayButton
          mediaSize={mediaSize}
          buttonIcon={'download'}
          position={7}
          active={infoOverlay == 7}
          onClick={() => dispatch(setInfoOverlay(7))}
        />
      )}
      <InfoOverlayButton
        mediaSize={mediaSize}
        buttonIcon={'bug_report'}
        position={6}
        active={infoOverlay == 8}
        onClick={() => dispatch(setInfoOverlay(8))}
      />

      {infoOverlay == 1 && (
        <ProjectCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
          handleClick={handleClick}
        />
      )}
      {infoOverlay == 2 && (
        <BiodiversityCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
        />
      )}
      {infoOverlay == 3 && (
        <WildlifeCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          handleClick={handleClick}
          toggle={toggle}
          setToggle={setToggle}
        />
      )}
      {infoOverlay == 4 && (
        <CommunityCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
        />
      )}
      {infoOverlay == 5 && (
        <ChatCard mediaSize={mediaSize} activeProjectData={activeProjectData} />
      )}
      {infoOverlay == 6 && <LogbookCard mediaSize={mediaSize} />}

      {infoOverlay == 7 && activeProjectData?.project?.dataDownloadUrl && (
        <DownloadCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
        />
      )}
      {infoOverlay == 8 && (
        <Pokedex activeProjectData={activeProjectData} mediaSize={mediaSize} />
      )}
    </>
  )
}

export const ImageOverlay = ({
  toggle,
  endpoint,
  handleClick,
  fileType,
  ContentComponent,
  contentProps,
}) => {
  if (fileType === 'component' && ContentComponent) {
    if (ContentComponent == 'KingdomList') {
      return (
        <div className="overlay" style={{ zIndex: 4 }}>
          <button
            onClick={handleClick}
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
      return (
        <div className="overlay" style={{ zIndex: 5 }}>
          <ActiveSpeciesCard {...contentProps} />
        </div>
      )
    }
  }
  return (
    <div className="overlay" onClick={handleClick} style={{ zIndex: 4 }}>
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
