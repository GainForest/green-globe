import React, { useRef } from 'react'

export const AudioPlayer = ({ label, src }) => {
  const audioRef = useRef(null)
  const progressBarRef = useRef(null)

  const handlePlayClick = () => {
    const audio = audioRef.current
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  const handleProgressBarClick = (event) => {
    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const width = rect.width
    const clickRatio = clickX / width
    const audio = audioRef.current
    audio.currentTime = clickRatio * audio.duration
  }

  const updateProgress = () => {
    const audio = audioRef.current
    const progressBar = progressBarRef.current
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.style.background = `linear-gradient(to right, rgba(43, 206, 137, 1.0) ${progress}%, rgba(43, 206, 137, 0.1) ${progress}%)`
  }

  return (
    <div style={{ margin: '8px 0' }}>
      <button className="g-audio--playbutton" onClick={handlePlayClick}>
        ►
      </button>
      <span
        className="g-audio-content"
        ref={progressBarRef}
        onClick={handleProgressBarClick}
      >
        {label}
      </span>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={updateProgress}
        style={{ display: 'none' }}
      />
    </div>
  )
}
