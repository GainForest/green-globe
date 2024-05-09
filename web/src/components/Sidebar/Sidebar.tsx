import { useState } from 'react'

import styled from 'styled-components'

export const Sidebar = () => {
  const location = window.location.href

  return (
    <div style={{ height: '100%', width: '180px', backgroundColor: '#1E2024' }}>
      <span className="material-symbols-outlined">menu</span>
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
