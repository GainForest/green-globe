import { BiodiversityCard } from './BiodiversityCard'
import { CommunityCard } from './CommunityCard'
import { DiscordCard } from './DiscordCard'
import { ExitButton } from './ExitButton'
import { HexagonCard } from './HexagonCard'
import { InfoOverlayButton } from './InfoOverlayButton'
import { ProjectCard } from './ProjectCard'
import { WildlifeCard } from './WildlifeCard'

export const InfoOverlay = ({
  activeProjectData,
  activeProjectPolygon,
  clickedCoords,
  numHexagons,
  displayOverlay,
  setDisplayOverlay,
  setActiveProjectPolygon,
}) => {
  // Position of the buttons go from left to right
  return (
    <>
      <ExitButton
        style={{ left: 320, bottom: 486 }}
        onClick={() => setDisplayOverlay(false)}
      />
      <InfoOverlayButton
        buttonIcon="hexagon"
        position={6}
        active={displayOverlay == 6}
        onClick={() => setDisplayOverlay(6)}
      />
      <InfoOverlayButton
        buttonIcon={'forest'}
        position={1}
        active={displayOverlay == 1}
        onClick={() => setDisplayOverlay(1)}
      />
      <InfoOverlayButton
        buttonIcon={'pets'}
        position={2}
        active={displayOverlay == 2}
        onClick={() => setDisplayOverlay(2)}
      />
      <InfoOverlayButton
        buttonIcon={'photo'}
        position={3}
        active={displayOverlay == 3}
        onClick={() => setDisplayOverlay(3)}
      />
      <InfoOverlayButton
        buttonIcon={'emoji_people'}
        position={4}
        active={displayOverlay == 4}
        onClick={() => setDisplayOverlay(4)}
      />
      <InfoOverlayButton
        buttonIcon={'chat'}
        position={5}
        active={displayOverlay == 5}
        onClick={() => setDisplayOverlay(5)}
      />
      {displayOverlay == 1 && (
        <ProjectCard
          activeProjectData={activeProjectData}
          activeProjectPolygon={activeProjectPolygon}
          setActiveProjectPolygon={setActiveProjectPolygon}
        />
      )}
      {displayOverlay == 2 && (
        <BiodiversityCard activeProjectData={activeProjectData} />
      )}
      {displayOverlay == 3 && (
        <WildlifeCard activeProjectData={activeProjectData} />
      )}
      {displayOverlay == 4 && (
        <CommunityCard activeProjectData={activeProjectData} />
      )}
      {displayOverlay == 5 && (
        <DiscordCard activeProjectData={activeProjectData} />
      )}
      {displayOverlay == 6 && (
        <HexagonCard clickedCoords={clickedCoords} numHexagons={numHexagons} />
      )}
    </>
  )
}
