import { useEffect, useState } from 'react'

import DOMpurify from 'dompurify'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(
        'https://public-api.wordpress.com/rest/v1.1/sites/gainforestxprize.wordpress.com/posts/'
      )
      const data = await response.json()
      console.log(data)
      setPosts(data.posts.map((post) => DOMpurify.sanitize(post.content)))
      setLoading(false)
    }
    getPosts()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: post }} />
      ))}
    </div>
  )
}
export default Blog
