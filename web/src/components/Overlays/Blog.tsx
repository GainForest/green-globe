import { useEffect, useState } from 'react'

import DOMpurify from 'dompurify'
import styled from 'styled-components'

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

  return (
    <Container loading={loading}>
      <LoadingMessage loading={loading}>Loading...</LoadingMessage>
      <Content loading={loading}>
        <Header>Xprize Insights</Header>
        {posts.map((post, index) => (
          <PostContainer key={index}>
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{post.date}</PostDate>
            </PostHeader>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </PostContainer>
        ))}
      </Content>
    </Container>
  )
}

export default Blog

const Container = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  background-image: url('/blog-bg.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: +180px 0px;
  height: calc(100vh - 52px);
  width: calc(100vw - 180px);
  transition: opacity 1s ease;
`

const LoadingMessage = styled.div`
  opacity: ${(props) => (props.loading ? 1 : 0)};
  transition: opacity 1s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #333;
`

const Content = styled.div`
  max-height: calc(100vh - 52px - 64px); /* account for Navbar and h1 height */
  overflow-y: auto;
  padding: 0 16px;
  opacity: ${(props) => (props.loading ? 0 : 1)};
  transition: opacity 1s ease;
`

const Header = styled.h1`
  margin: 32px 8px;
`

const PostContainer = styled.div`
  margin: 40px 0 80px 0;
  background: transparent;
  padding: 8px;
  max-width: 620px; /* max width of blog post on wordpress.com */
  border-radius: 4px;
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostTitle = styled.h1`
  display: inline;
  opacity: 1;
  transition: opacity 0.5s ease;
`

const PostDate = styled.p`
  display: inline;
  float: right;
  line-height: 4px;
  margin: 0;
`
