import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Play, Pause, Volume2 } from 'lucide-react';
import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';

export const SpeciesCard = ({
  species,
  mediaSize,
  handleClick,
}: {
  species: Species
  mediaSize: number
  handleClick: (species: Species) => void
}) => {
  const { scientificName, iucnCategory, awsUrl } = species;
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [instrument, setInstrument] = useState(null);
  const [hasMidi, setHasMidi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backgroundColors = {
    LC: '#a9d18e',
    EN: '#FFA000',
    VU: '#F57C00',
    CR: '#D32F2F',
  };

  const formatScientificName = (name: string) => {
    return name.replace(/\s+/g, '-').toLowerCase();
  };

  const loadMidi = useCallback(async () => {
    if (player || isLoading) return;

    setIsLoading(true);
    const midiFileName = `${process.env.AWS_STORAGE}/dna_of_music/${formatScientificName(scientificName)}.midi`;

    try {
      const response = await fetch(midiFileName);
      if (!response.ok) {
        throw new Error('MIDI file not found');
      }

      const arrayBuffer = await response.arrayBuffer();
      const midiPlayer = new MidiPlayer.Player();
      midiPlayer.loadArrayBuffer(arrayBuffer);

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const soundfontInstrument = await Soundfont.instrument(audioContext, 'acoustic_grand_piano');

      midiPlayer.on('midiEvent', (event) => {
        if (event.name === 'Note on' && event.velocity > 0) {
          soundfontInstrument.play(event.noteName, audioContext.currentTime, { gain: event.velocity / 100 });
        }
      });

      setPlayer(midiPlayer);
      setInstrument(soundfontInstrument);
      setHasMidi(true);
      setIsLoading(false);
    } catch (error) {
      console.log(`No MIDI file available for ${scientificName}`);
      setHasMidi(false);
      setIsLoading(false);
    }
  }, [scientificName, player, isLoading]);

  const togglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!player && !isLoading) {
      await loadMidi();
    }
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <CardContainer
      backgroundColor={
        backgroundColors[iucnCategory]
          ? `${backgroundColors[iucnCategory]}`
          : '#000000'
      }
      mediaSize={mediaSize}
      onClick={() => handleClick(species)}
    >
      <StyledImage
        src={awsUrl?.length ? awsUrl : `/placeholder${species.category}.png`}
        alt={scientificName}
        mediaSize={mediaSize}
      />
      <InfoContainer mediaSize={mediaSize}>
        <p style={{ margin: 0, textAlign: 'center' }}>{scientificName}</p>
      </InfoContainer>
      {iucnCategory && (
        <CategoryTag>
          <span>{iucnCategory}</span>
        </CategoryTag>
      )}
      <PlayButton onClick={togglePlay} disabled={isLoading}>
        {isLoading ? (
          <span>Loading...</span>
        ) : isPlaying ? (
          <Pause size={24} />
        ) : (
          <Play size={24} />
        )}
      </PlayButton>
      {(hasMidi || isLoading) && (
        <MidiIndicator>
          <Volume2 size={16} />
          <span>MIDI</span>
        </MidiIndicator>
      )}
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  position: relative;
  margin: 4px;
  width: 144px;
  height: 144px;
  &:hover {
    filter: grayscale(80%);
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: ${(props) =>
    props.awsUrl?.startsWith('/placeholder') ? 'contain' : 'cover'};
`

const InfoContainer = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
`

const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
`

const PlayButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const MidiIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;

  svg {
    margin-right: 4px;
  }
`
