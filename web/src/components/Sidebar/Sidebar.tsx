import styled from 'styled-components'

export const Sidebar = ({ active, handleClick }) => {
  const location = window.location.href

  const sidebarStyle = {
    height: '100%',
    backgroundColor: '#1E2024',
    width: active ? '180px' : '50px',
    transition: 'width 0.3s',
  }

  return (
    <div style={sidebarStyle}>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          padding: '8px',
          cursor: 'pointer',
        }}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      {active && (
        <>
          <Link href="/insights">
            <SidebarItem active={location?.includes('insights')}>
              Insights
            </SidebarItem>
          </Link>
          <Link href="/map">
            <SidebarItem active={location?.includes('map')}>Map</SidebarItem>
          </Link>
          <SidebarItem>Observations</SidebarItem>
          <SidebarItem>Methodology</SidebarItem>
          <Link href="/blog">
            <SidebarItem active={location?.includes('blog')}>Blog</SidebarItem>
          </Link>
        </>
      )}
    </div>
  )
}

export default Sidebar

const Link = styled.a`
  text-decoration: none;
  color: white;
`

const SidebarItem = styled.div`
  margin: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 40px;
  padding-left: 12px;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? '#393a3d' : `#1E2024`)};
  :hover {
    background-color: #2a2c30;
  }
`
