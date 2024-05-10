import { useEffect, useState } from 'react'

import DOMpurify from 'dompurify'

const Blog = () => {
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
      console.log(data)
      setPosts(
        data.posts.map((post) => {
          // DO NOT remove the DOMpurify.sanitize() function. It is used to prevent XSS attacks.
          const cleanObj = {
            title: DOMpurify.sanitize(post.title),
            content: DOMpurify.sanitize(post.content),
            date: formatDate(post.date),
          }
          return cleanObj
        })
      )
      setLoading(false)
    }
    getPosts()
  }, [])

  useEffect(() => {
    console.log(posts)
  }, [posts])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <h1 style={{ margin: '32px 8px' }}>Xprize Blog</h1>
      {posts.map((post, index) => (
        <div
          style={{
            margin: '16px',
            backgroundColor: '#3d3d3d',
            padding: '8px',
            maxWidth: '620px',
            borderRadius: '4px',
          }}
          key={index}
        >
          <div>
            <h1 style={{ display: 'inline' }}>{post.title}</h1>
            <p style={{ display: 'inline', float: 'right', lineHeight: '4px' }}>
              {post.date}
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
    </div>
  )
}
export default Blog
