import React, { useEffect } from 'react'

const BlogPost = ({ content }) => {
  useEffect(() => {
    const updateAudioElements = () => {
      const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a']
      const anchorTags = document.querySelectorAll('a')

      anchorTags.forEach((anchor) => {
        const href = anchor.href
        if (audioExtensions.some((ext) => href.endsWith(ext))) {
          const audio = new Audio(href)
          const parent = anchor.parentElement

          const wrapper = document.createElement('span')
          wrapper.className = 'audio-wrapper'

          const playButton = document.createElement('button')
          playButton.className = 'g-audio--playbutton'
          playButton.innerText = '►'

          const progressBar = document.createElement('span')
          progressBar.className = 'g-audio-content'
          progressBar.innerText = anchor.textContent

          wrapper.appendChild(playButton)
          wrapper.appendChild(progressBar)

          parent.insertBefore(wrapper, anchor)
          anchor.style.display = 'none'

          const handlePlay = () => {
            audio.play()
          }
          progressBar.addEventListener('click', (event) => {
            const rect = progressBar.getBoundingClientRect()
            const clickX = event.clientX - rect.left
            const width = rect.width
            const clickRatio = clickX / width
            audio.currentTime = clickRatio * audio.duration
          })
          playButton.addEventListener('click', handlePlay)
          progressBar.addEventListener('click', handlePlay)

          audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100
            progressBar.style.background = `linear-gradient(to right, rgba(18, 165, 179, 1.0) ${progress}%, rgba(26, 236, 255, 0.1) ${progress}%)`
          })
        }
      })
    }

    updateAudioElements()
  }, [content])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default BlogPost
