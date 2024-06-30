import { useState, useEffect } from 'react'

import DOMpurify from 'dompurify'
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
      const response = await fetch(
        'https://public-api.wordpress.com/rest/v1.1/sites/gainforestxprize.wordpress.com/posts/'
      )
      const data = await response.json()
      const cleanPosts = data.posts.map((post) => {
        // DO NOT remove the DOMpurify.sanitize() function. It is used to prevent XSS attacks.
        const cleanObj = {
          title: DOMpurify.sanitize(post.title),
          content: DOMpurify.sanitize(post.content),
          categories: Object.keys(post.categories),
          date: formatDate(post.date),
          thumbnail: post.featured_image || '/biodivx-forest.jpeg',
        }
        return cleanObj
      })
      const uncategorizedPosts = cleanPosts.filter(
        (d) => !d.categories.includes('Methodology')
      )
      setPosts(uncategorizedPosts)

      setLoading(false)
    }
    getPosts()
  }, [])

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
