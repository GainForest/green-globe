import styled from 'styled-components'

export const Sidebar = ({ active, handleClick }) => {
  const location = window.location.href

  const sidebarStyle = {
    height: '100%',
    backgroundColor: '#1E2024',
    width: active ? '180px' : '60px',
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
          {/* <Link href="/survey-overview">
            <SidebarItem active={location?.includes('survey-overview')}>
              Survey Overview
            </SidebarItem>
          </Link> */}
          <Link href="/map">
            <SidebarItem active={location?.includes('map')}>Map</SidebarItem>
          </Link>
          {/* <Link href="/biodiversity">
            <SidebarItem active={location?.includes('biodiversity')}>
              Biodiversity
            </SidebarItem>
          </Link> */}
          {/* <Link href="/methodology">
            <SidebarItem active={location?.includes('methodology')}>
              Methodology
            </SidebarItem>
          </Link> */}
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
