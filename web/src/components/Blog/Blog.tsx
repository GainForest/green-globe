import { useEffect, useState, useRef } from 'react'

import styled from 'styled-components'

import BlogPost from 'src/components/Blog/BlogPost'

const Blog = ({ posts, loading }) => {
  const [opacity, setOpacity] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState([])
  const [postIndex, setPostIndex] = useState(0)
  const contentRef = useRef(null)
  const postRefs = useRef([])

  useEffect(() => {
    postRefs.current = postRefs.current.slice(0, displayedPosts.length)
  }, [displayedPosts])

  useEffect(() => {
    if (displayedPosts.length === 0 && posts.length > 0) {
      setDisplayedPosts([posts[0]])
    }
  }, [posts, displayedPosts])

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
        setPostIndex(closestPostIndex)
      }

      // Check if near the bottom of the container to load more posts
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight * 1.5
      ) {
        const currentLength = displayedPosts.length
        const morePosts = posts?.slice(currentLength, currentLength + 5) // Load 5 more posts, adjust as needed
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
      const newPosts = posts?.slice(displayedPosts.length, index + 1)
      setDisplayedPosts([...displayedPosts, ...newPosts])
    }
    setPostIndex(index)
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
            {post.categories && (
              <p style={{ fontWeight: 'lighter', fontSize: '12px' }}>
                {post.categories}
              </p>
            )}
            <img src={post?.thumbnail} alt={post.title} />
            <PreviewTitle>{post?.title}</PreviewTitle>
          </PostPreview>
        ))}
      </PostList>
      <MainContent>
        <LoadingMessage loading={loading}>Loading...</LoadingMessage>
        <Content loading={loading} opacity={opacity} ref={contentRef}>
          {displayedPosts?.map((post, index) => (
            <PostContainer
              key={post?.title}
              ref={(el) => (postRefs.current[index] = el)}
            >
              <PostHeader>
                {post?.categories && (
                  <p style={{ fontWeight: 'lighter' }}>
                    {post?.categories.join(', ')}
                  </p>
                )}
                <PostDate>{post?.date}</PostDate>
              </PostHeader>
              <PostTitle>{post?.title}</PostTitle>
              <BlogPost content={post?.content} />
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
  max-height: calc(100vh - 52px);
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

const PostContainer = styled.div`
  margin: 40px 0 80px 0;
  background-color: rgba(85, 85, 85, 0.5);
  padding: 8px;
  max-width: 620px;
  border-radius: 4px;
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostTitle = styled.h1`
  float: left
  display: inline;
`

const PostDate = styled.p`
  display: inline;
  float: right;
`
