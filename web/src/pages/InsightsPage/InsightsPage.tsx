import { useEffect, useState } from 'react'

import DOMpurify from 'dompurify'

import Blog from 'src/components/Blog/Blog'

const InsightsPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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
          thumbnail: post.featured_image || '/default.png',
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

  return <Blog posts={posts} loading={loading} />
}

export default InsightsPage
