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

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div
      style={{
        overflowX: 'hidden',
        backgroundImage: 'url(/blog-bg.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundAttachment: 'fixed',
        height: 'calc(100vh - 52px)', // account for Navbar height
        width: '100vw',
      }}
    >
      <h1 style={{ margin: '32px 8px' }}>Xprize Insights</h1>
      <div
        style={{
          maxHeight: 'calc(100vh - 52px - 64px)', // account for Navbar and h1 height
          overflowY: 'auto',
          padding: '0 16px',
        }}
      >
        {posts.map((post, index) => (
          <div
            style={{
              margin: '16px 0',
              background: 'transparent',
              padding: '8px',
              maxWidth: '620px', // max width of blog post on wordpress.com
              borderRadius: '4px',
            }}
            key={index}
          >
            <div>
              <h1 style={{ display: 'inline' }}>{post.title}</h1>
              <p
                style={{
                  display: 'inline',
                  float: 'right',
                  lineHeight: '4px',
                  margin: '0',
                }}
              >
                {post.date}
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Blog
