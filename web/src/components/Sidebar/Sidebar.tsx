import styled from 'styled-components'

export const Sidebar = () => {
  return (
    <div
      style={{ height: '100vh', width: '180px', backgroundColor: '#1E2024' }}
    >
      <span className="material-symbols-outlined">menu</span>
      <SidebarItem>Survey Overview</SidebarItem>
      <SidebarItem>Insights</SidebarItem>
      <SidebarItem>Observations</SidebarItem>
      <SidebarItem>Methodology</SidebarItem>
    </div>
  )
}

export default Sidebar

const SidebarItem = styled.div`
  margin: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 40px;
  padding-left: 12px;
  :hover {
    background-color: #2a2c30;
    border-radius: 8px;
  }
`
