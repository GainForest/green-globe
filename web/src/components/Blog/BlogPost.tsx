import { useEffect, useState } from 'react'

import { marked } from 'marked'
const BlogPost = ({ markdownContent }) => {
  const [content, setContent] = useState('')

  useEffect(() => {
    const htmlContent = marked.parse(markdownContent)

    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')

    const links = doc.querySelectorAll('a')
    links.forEach((link) => {
      const href = link.href
      if (href.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/i)) {
        const textParagraph = document.createElement('p')
        textParagraph.textContent = link.textContent

        const img = document.createElement('img')
        img.src = href
        img.alt = link.textContent || 'Image'
        link.parentNode.insertBefore(textParagraph, link)
        link.parentNode.insertBefore(img, link.nextSibling)

        link.parentNode.removeChild(link)
      }
    })

    // Set the modified content
    setContent(doc.body.innerHTML)
  }, [markdownContent])

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

    // Wait for the DOM to be updated
    setTimeout(updateMediaElements, 0)
  }, [content])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default BlogPost
