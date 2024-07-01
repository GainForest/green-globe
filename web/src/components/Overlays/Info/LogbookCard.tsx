import { useState, useEffect } from 'react'

import axios from 'axios'
import yaml from 'js-yaml'
import { useDispatch } from 'react-redux'

import Blog from 'src/components/Blog/Blog'
import { ExitButton } from 'src/components/Map/components/ExitButton'
import { setInfoOverlay, setMaximized } from 'src/reducers/overlaysReducer'

export const LogbookCard = ({ mediaSize }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMaximized(true))
  })

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    return `${day} ${month}, ${year}`
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.AWS_STORAGE}/logbook/posts/`
        )
        const filenames = parseDirectoryListing(response.data)
        const postsData = await Promise.all(
          filenames.map(async (filename) => {
            const postResponse = await axios.get(
              `${process.env.AWS_STORAGE}/logbook/posts/${filename}`
            )
            let { content, metadata } = parseMarkdown(postResponse.data)

            // update relative path
            content = content.replace(
              /\]\((?!http)(.+?)\)/g,
              (match, p1) => `](${process.env.AWS_STORAGE}/logbook/media/${p1})`
            )

            return {
              title: metadata.title,
              content: content,
              categories: metadata.categories || ['Uncategorized'],
              date: formatDate(metadata.date) || '',
              thumbnail: metadata.featured_image || '/biodivx-forest.jpeg',
            }
          })
        )
        setPosts(postsData)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load posts:', error)
        setLoading(false)
      }
    }

    getPosts()
  }, [setLoading])

  const parseDirectoryListing = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const links = doc.querySelectorAll('ul li a')
    return Array.from(links).map((link) => link.textContent.trim())
  }

  const parseMarkdown = (markdown) => {
    let metadata = {}
    let content = markdown

    try {
      const matcher = /^---\s*\n([\s\S]+?)\n---/
      const match = markdown.match(matcher)
      if (match) {
        metadata = yaml.load(match[1])
        content = markdown.slice(match[0].length)
      }
    } catch (error) {
      console.error('Error parsing YAML:', error)
    }

    return { content, metadata }
  }

  return (
    <div
      style={{
        backgroundColor: '#f5f3ef',
        zIndex: 10,
        position: 'fixed',
        top: 50,
        left: 60,
        right: 0,
        bottom: 0,
      }}
    >
      <ExitButton
        style={{ zIndex: '4', right: 40, top: 20, left: null }}
        onClick={() => dispatch(setInfoOverlay(1))}
        mediaSize={mediaSize}
      />
      <Blog posts={posts} loading={loading} />
    </div>
  )
}
