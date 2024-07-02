import Markdown from 'markdown-to-jsx'
const BlogPost = ({ content }) => {
  const overrides = {
    a: {
      component: ({ children, title, href }) => {
        const ext = href.split('.').pop()
        switch (ext) {
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
            return (
              <ImageComponent href={href} title={title}>
                {children}
              </ImageComponent>
            )
          case 'mp4':
          case 'webm':
          case 'ogv':
            return (
              <VideoComponent href={href} title={title}>
                {children}
              </VideoComponent>
            )
          case 'wav':
          case 'ogg':
          case 'm4a':
          case 'mp3':
            return (
              <AudioComponent href={href} title={title}>
                {children}
              </AudioComponent>
            )
          default:
            return <a href={href}>{children}</a> // default case
        }
      },
    },
  }

  return <Markdown options={{ overrides }}>{content}</Markdown>
}

export default BlogPost

export const ImageComponent = ({ children, href, title }) => {
  return (
    <>
      <p>{children[0]}</p>
      <img src={href} alt={title} style={{ maxWidth: '100%' }} />
    </>
  )
}

export const VideoComponent = ({ children, href, title }) => {
  return (
    <>
      <p>{children[0]}</p>
      <video style={{ maxWidth: '100%' }} controls title={title}>
        <track src={title}>{title}</track>
        <source src={href} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  )
}

export const AudioComponent = ({ children, href, title }) => {
  return (
    <>
      <p>{children[0]}</p>
      <audio caption={title} controls title={title}>
        <source src={href} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  )
}
