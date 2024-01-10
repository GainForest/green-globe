import { useDispatch, useSelector } from 'react-redux'

import { hideInfoOverlay, setInfoOverlay } from 'src/reducers/overlaysReducer'

import { ExitButton } from '../Map/components/ExitButton'

import { BiodiversityCard } from './Info/BiodiversityCard'
import { ChatCard } from './Info/ChatCard'
import { CommunityCard } from './Info/CommunityCard'
// import { DiscordCard } from './Info/DiscordCard'
// import { HexagonCard } from './Info/HexagonCard'
import { InfoOverlayButton } from './Info/InfoOverlayButton'
import { PaymentCard } from './Info/PaymentsCard'
import { ProjectCard } from './Info/ProjectCard/ProjectCard'
import { WildlifeCard } from './Info/WildlifeCard'

export const InfoOverlay = ({
  activeProjectData,
  activeProjectPolygon,
  numHexagons,
  setActiveProjectPolygon,
}) => {
  const dispatch = useDispatch()
  const infoOverlay = useSelector((state: State) => state.overlays.info)
  // Position of the buttons go from left to right
  return (
    <>
      <ExitButton
        style={{ left: 320, bottom: 546 }}
        onClick={() => dispatch(hideInfoOverlay())}
      />
      <InfoOverlayButton
        buttonIcon={'forest'}
        position={1}
        active={infoOverlay == 1}
        onClick={() => dispatch(setInfoOverlay(1))}
      />
      <InfoOverlayButton
        buttonIcon={'pets'}
        position={2}
        active={infoOverlay == 2}
        onClick={() => dispatch(setInfoOverlay(2))}
      />
      <InfoOverlayButton
        buttonIcon={'photo'}
        position={3}
        active={infoOverlay == 3}
        onClick={() => dispatch(setInfoOverlay(3))}
      />
      <InfoOverlayButton
        buttonIcon={'emoji_people'}
        position={4}
        active={infoOverlay == 4}
        onClick={() => dispatch(setInfoOverlay(4))}
      />
      <InfoOverlayButton
        buttonIcon={'payments'}
        position={5}
        active={infoOverlay == 6}
        onClick={() => dispatch(setInfoOverlay(6))}
      />
      <InfoOverlayButton
        buttonIcon={'chat'}
        position={6}
        active={infoOverlay == 5}
        onClick={() => dispatch(setInfoOverlay(5))}
      />
      {infoOverlay == 1 && (
        <ProjectCard
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
        />
      )}
      {infoOverlay == 2 && (
        <BiodiversityCard activeProjectData={activeProjectData} />
      )}
      {infoOverlay == 3 && (
        <WildlifeCard activeProjectData={activeProjectData} />
      )}
      {infoOverlay == 4 && (
        <CommunityCard activeProjectData={activeProjectData} />
      )}
      {infoOverlay == 5 && <ChatCard activeProjectData={activeProjectData} />}
      {infoOverlay == 6 && (
        <PaymentCard activeProjectData={activeProjectData} />
      )}
      {/* {infoOverlay == 6 && <HexagonCard numHexagons={numHexagons} />} */}
    </>
  )
}
