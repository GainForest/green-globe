import React, { useState, useEffect, useRef } from 'react'

import Markdown from 'markdown-to-jsx'
const BlogPost = ({ content }) => {
  useEffect(() => {
    const updateMediaElements = () => {
      const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a']
      const videoExtensions = ['.mp4', '.webm', '.ogv']
      const anchorTags = document.querySelectorAll('a:not(.media-enhanced)')

      anchorTags.forEach((anchor) => {
        const href = anchor.href
        const isAudio = audioExtensions.some((ext) => href.endsWith(ext))
        const isVideo = videoExtensions.some((ext) => href.endsWith(ext))
        if (!isAudio && !isVideo) {
          return
        }

        anchor.classList.add('media-enhanced')

        const parent = anchor.parentElement
        const wrapper = document.createElement('span')
        wrapper.className = 'media-wrapper'
        parent.insertBefore(wrapper, anchor)

        const playButton = document.createElement('button')
        playButton.className = 'g-media--playbutton'
        playButton.innerText = '►'
        wrapper.appendChild(playButton)

        const progressBar = document.createElement('span')
        progressBar.className = 'g-audio-content'
        progressBar.innerText = anchor.textContent
        wrapper.appendChild(progressBar)

        anchor.style.display = 'none'

        let media
        if (isAudio) {
          media = new Audio(href)
          wrapper.appendChild(media)
          setupAudioPlayer(media, progressBar)
        }

        playButton.addEventListener('click', () => {
          if (!media && isVideo) {
            media = document.createElement('video')
            media.src = href
            media.style.width = '100%'
            media.controls = true
            wrapper.insertBefore(media, playButton.nextSibling)
          }
          if (media && media.paused) {
            media.play()
          } else if (media) {
            media.pause()
          }
        })
      })
    }

    function setupAudioPlayer(media, progressBar) {
      progressBar.addEventListener('click', (event) => {
        const rect = progressBar.getBoundingClientRect()
        const clickX = event.clientX - rect.left
        const width = rect.width
        const clickRatio = clickX / width
        media.currentTime = clickRatio * media.duration
        media.play()
      })

      media.addEventListener('timeupdate', () => {
        const progress = (media.currentTime / media.duration) * 100
        progressBar.style.background = `linear-gradient(to right, rgba(43, 206, 137, 1.0) ${progress}%, rgba(43, 206, 137, 0.1) ${progress}%)`
      })
    }

    // updateMediaElements()
  }, [content])

  return (
    <div>
      <Markdown
        options={{
          overrides: {
            a: { component: CustomLink },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

export default BlogPost

export const CustomLink = ({ href, children }) => {
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a']
  const videoExtensions = ['.mp4', '.webm', '.ogv']

  const isAudio = audioExtensions.some((ext) => href.endsWith(ext))
  const isVideo = videoExtensions.some((ext) => href.endsWith(ext))

  const [playing, setPlaying] = useState(false)
  const mediaRef = useRef(null)

  const togglePlay = () => {
    if (mediaRef.current) {
      if (mediaRef.current.paused) {
        mediaRef.current.play()
        setPlaying(true)
      } else {
        mediaRef.current.pause()
        setPlaying(false)
      }
    }
  }

  const handleTimeUpdate = (event) => {
    const progress = (event.target.currentTime / event.target.duration) * 100
    // Set state or do something with progress if needed
  }

  if (isAudio) {
    return (
      <div className="media-wrapper">
        <button onClick={togglePlay} className="g-media--playbutton">
          {playing ? '❚❚' : '►'}
        </button>
        <audio ref={mediaRef} onTimeUpdate={handleTimeUpdate} src={href} hidden>
          Your browser does not support the audio element.
        </audio>
        {children}
      </div>
    )
  } else if (isVideo) {
    return (
      <div className="media-wrapper">
        <button onClick={togglePlay} className="g-media--playbutton">
          {playing ? '❚❚' : '►'}
        </button>
        <video
          ref={mediaRef}
          onTimeUpdate={handleTimeUpdate}
          src={href}
          width="100%"
          controls
          hidden
        >
          Your browser does not support the video tag.
        </video>
        {children}
      </div>
    )
  }

  return <a href={href}>{children}</a>
}
