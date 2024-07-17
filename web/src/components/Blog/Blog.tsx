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

  if (!loading && posts.length == 0) {
    return (
      <Container>
        <NoDataMessage>There are no logs for this project yet.</NoDataMessage>
      </Container>
    )
  }

  return (
    <Container>
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
              <BlogPost markdownContent={post?.content} />
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
  background-color: #f5f3ef;
`

const PostList = styled.div`
  width: 220px;
  background: #ffffff;
  overflow-y: auto;
  border-right: 1px solid #e0dcd5;
`

const PostPreview = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  display: block;
  align-items: center;
  background: ${({ selected }) => (selected ? '#e6e2d9' : '#ffffff')};
  border-radius: 4px;
  margin: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  img {
    width: 154px;
    height: 64px;
    margin-right: 16px;
    object-fit: cover;
  }
  &:hover {
    background: #f0ece5;
    transition: background 0.3s ease;
  }
`

const PreviewTitle = styled.div`
  font-size: 16px;
  color: #4a4a4a;
`

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 52px);
  // background-image: url('/blog-bg.jpeg');
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
  color: #4a4a4a;
`

const NoDataMessage = styled.div`
  transition: opacity 1s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #4a4a4a;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 52px);
  overflow-y: auto;
  padding: 0 16px;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s ease;
`

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 80px 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 32px;
  width: 1000px;
  max-width: 60vw;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostTitle = styled.h1`
  float: left;
  display: inline;
  color: #2c2c2c;
  margin-bottom: 32px;
`

const PostDate = styled.p`
  display: inline;
  float: right;
  color: #6b6b6b;
`
