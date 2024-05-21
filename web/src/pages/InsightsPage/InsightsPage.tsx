import { useEffect, useState, useRef } from 'react'

import DOMpurify from 'dompurify'
import styled from 'styled-components'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [opacity, setOpacity] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState([])
  const [postIndex, setPostindex] = useState(0)
  const contentRef = useRef(null)
  const postRefs = useRef([])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    return `${day} ${month}, ${year}`
  }

  useEffect(() => {
    postRefs.current = postRefs.current.slice(0, displayedPosts.length)
  }, [displayedPosts])

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
      if (uncategorizedPosts.length > 0) {
        setDisplayedPosts([uncategorizedPosts[0]])
      }

      setLoading(false)
    }
    getPosts()
  }, [])

  useEffect(() => {
    const container = contentRef.current

    const handleScroll = () => {
      const closestPostIndex = postRefs.current.reduce(
        (closestIndex, el, index) => {
          const box = el.getBoundingClientRect()
          const prevBox =
            postRefs.current[closestIndex]?.getBoundingClientRect()
          if (!prevBox) return index
          if (Math.abs(box.top) < Math.abs(prevBox.top)) return index
          return closestIndex
        },
        0
      )

      if (closestPostIndex !== postIndex) {
        setPostindex(closestPostIndex)
      }

      // Check if near the bottom of the container to load more posts
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight * 1.5
      ) {
        const currentLength = displayedPosts.length
        const morePosts = posts.slice(currentLength, currentLength + 5) // Load 5 more posts, adjust as needed
        if (morePosts.length > 0) {
          setDisplayedPosts([...displayedPosts, ...morePosts])
        }
      }
    }

    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [displayedPosts, posts, postIndex])

  useEffect(() => {
    postRefs.current = postRefs.current.slice(0, displayedPosts.length)
  }, [displayedPosts])

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handlePostClick = (post, index) => {
    setOpacity(0)
    setTimeout(() => {
      setOpacity(1)
    }, 300)
    if (index > displayedPosts.length - 1) {
      const newPosts = posts.slice(displayedPosts.length, index + 1)
      setDisplayedPosts([...displayedPosts, ...newPosts])
    }
    setPostindex(index)
    setTimeout(() => {
      postRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 0)
  }

  return (
    <Container loading={loading}>
      <PostList>
        {posts.map((post, index) => (
          <PostPreview
            key={index}
            selected={index == postIndex}
            onClick={() => handlePostClick(post, index)}
          >
            <p style={{ fontWeight: 'lighter', fontSize: '12px' }}>
              {post.categories}
            </p>
            <img src={post.thumbnail} alt={post.title} />
            <PreviewTitle>{post.title}</PreviewTitle>
          </PostPreview>
        ))}
      </PostList>
      <MainContent>
        <LoadingMessage loading={loading}>Loading...</LoadingMessage>
        <Content loading={loading} opacity={opacity} ref={contentRef}>
          {displayedPosts?.map((post, index) => (
            <PostContainer
              key={post.title}
              ref={(el) => (postRefs.current[index] = el)}
              onClick={() => handlePostClick(post, index)}
            >
              <p style={{ fontWeight: 'lighter' }}>
                {post.categories.join(', ')}
              </p>
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
              </PostHeader>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </PostContainer>
          ))}
        </Content>
      </MainContent>
    </Container>
  )
}

export default Blog

const Container = styled.div`
  display: flex;
  overflow: hidden;
  transition: opacity 1s ease;
`

const PostList = styled.div`
  width: 180px;
  background: transparent;
  overflow-y: auto;
  border-right: 1px solid #ddd;
`

const PostPreview = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  display: block;
  align-items: center;
  background: ${({ selected }) => (selected ? '#999' : '#333')};
  border-radius: 4px;
  margin: 16px;
  img {
    width: 114px;
    height: 57px;
    margin-right: 16px;
    object-fit: cover;
  }
  &:hover {
    background: #555;
    transition: background 0.3s ease;
  }
`

const PreviewTitle = styled.div`
  font-size: 16px;
  color: white;
`

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 52px);
  background-image: url('/blog-bg.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
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
  max-height: calc(100vh - 52px);
  overflow-y: auto;
  padding: 0 16px;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s ease;
`

const Header = styled.h1`
  margin: 32px 8px;
`

const PostContainer = styled.div`
  margin: 40px 0 80px 0;
  background: transparent;
  padding: 8px;
  max-width: 620px;
  border-radius: 4px;
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 12px;
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
