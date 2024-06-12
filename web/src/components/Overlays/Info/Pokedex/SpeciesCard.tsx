import { useRef, useState, useEffect } from 'react'

const SpeciesCard = ({ species }) => {
  const [isAudioAvailable, setIsAudioAvailable] = useState(false)
  const { scientificName, iucnCategory, awsUrl, info } = species

  const backgroundColors = {
    LC: '#4CAF50',
    EN: '#FFC107',
    CR: '#F44336',
  }

  const audioRef = useRef(null)

  const audioUrl = `http://api.sonifyspecies.com:5000/dnamidi?taxon=${encodeURIComponent(
    scientificName
  )}&geo=&institutions=`

  useEffect(() => {
    fetch(audioUrl, { method: 'HEAD' }) // HEAD request to check if the file exists
      .then((response) => {
        if (response.ok) {
          setIsAudioAvailable(true)
        }
      })
      .catch((error) => console.error('Error checking audio URL:', error))
  }, [audioUrl])

  const toggleAudio = () => {
    const audio = audioRef.current
    console.log(audio)
    if (audio) {
      if (!audio.paused) {
        audio.pause()
      } else {
        audio.play()
      }
    }
  }

  return (
    <div
      style={{
        width: '300px',
        backgroundColor: backgroundColors[iucnCategory] || '#ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        color: '#fff',
        position: 'relative',
        marginTop: '16px',
      }}
    >
      <img
        src={awsUrl || 'placeholderPlant.png'}
        alt={scientificName}
        style={{
          width: '100%',
          height: '150px',
          objectFit: awsUrl ? 'cover' : 'contain',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <h3 style={{ margin: '0 ' }}>{scientificName}</h3>
        {isAudioAvailable && (
          <button
            onClick={toggleAudio}
            style={{
              padding: '5px 10px',
              border: '1px solid black',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'black',
              background: 'transparent',
            }}
          >
            {audioRef.current?.paused ? 'Play ' : 'Pause '} DNA
          </button>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '5px',
        }}
      >
        <span>{iucnCategory}</span>
      </div>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  )
}
export default SpeciesCard
