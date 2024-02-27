import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { hideInfoOverlay, setInfoOverlay } from 'src/reducers/overlaysReducer'

import { ExitButton } from '../Map/components/ExitButton'

import { BiodiversityCard } from './Info/BiodiversityCard'
import { ChatCard } from './Info/ChatCard'
import { CommunityCard } from './Info/CommunityCard'
// import { DiscordCard } from './Info/DiscordCard'
// import { HexagonCard } from './Info/HexagonCard'
import { DownloadCard } from './Info/DownloadCard'
import { InfoOverlayButton } from './Info/InfoOverlayButton'
import { ProjectCard } from './Info/ProjectCard/ProjectCard'
import { WildlifeCard } from './Info/WildlifeCard'

export const InfoOverlay = ({
  activeProjectData,
  activeProjectPolygon,
  // numHexagons,
  setActiveProjectPolygon,
}) => {
  const [mediaSize, setMediaSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setMediaSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const dispatch = useDispatch()
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  // Position of the buttons go from left to right
  return (
    <>
      <ExitButton
        mediaSize={mediaSize}
        onClick={() => dispatch(hideInfoOverlay())}
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
        buttonIcon={'download'}
        position={6}
        active={infoOverlay == 6}
        onClick={() => dispatch(setInfoOverlay(6))}
      />
      {infoOverlay == 1 && (
        <ProjectCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
        />
      )}
      {infoOverlay == 2 && (
        <BiodiversityCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
        />
      )}
      {infoOverlay == 3 && (
        <WildlifeCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
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
      {infoOverlay == 6 && (
        <DownloadCard
          mediaSize={mediaSize}
          activeProjectData={activeProjectData}
        />
      )}
    </>
  )
}
