import { useState } from 'react'

import styled from 'styled-components'

const allProjects = [
  'Defensores del Chaco',
  'Kayapo Project',
  'Million Trees Project',
  'Oceanus Conservation',
]

export const SearchOverlay = ({ setActiveProject }) => {
  const [showListOfProjects, setShowListOfProjects] = useState<boolean>(false)

  return (
    <>
      <input
        style={{
          zIndex: 2,
          border: 'none',
          height: '24px',
          width: '300px',
          position: 'absolute',
          padding: '8px 12px',
          top: 8,
          left: 8,
          backgroundColor: '#ffffff',
          borderRadius: showListOfProjects ? '8px 8px 0 0' : '8px',
          fontSize: '14px',
          fontFamily: 'Karla',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
        placeholder={'Search for projects'}
        onClick={() => {
          setShowListOfProjects(!showListOfProjects)
        }}
        onChange={(e) => {
          if (allProjects.find((d) => d == e.target.value)) {
            setActiveProject(e.target.value)
          }
        }}
      />
      <span
        className="material-icons-round"
        style={{
          zIndex: 3,
          fontSize: '18px',
          lineHeight: '18px',
          position: 'absolute',
          top: 20,
          left: 304,
          color: '#5F6369',
        }}
      >
        search
      </span>
      {showListOfProjects && (
        <>
          <OptionsContainer>
            {allProjects.map((d, i) => (
              <Option key={i} position={i} onClick={() => console.log('hello')}>
                {d}
              </Option>
            ))}
          </OptionsContainer>
        </>
      )}
    </>
  )
}

const OptionsContainer = styled.div<{ numOptions: number }>`
  position: absolute;
  height: ${(props) => `${(props.numOptions + 1) * 44}px`};
  width: 324px;
  top: 44px;
  border: none;
  left: 8px;
  background-color: #ffffff;
  padding: 12px 0;
  border-radius: 0 0 0.5em 0.5em;
  t
`

const Option = styled.button<{ position: number }>`
  cursor: pointer;
  height: 44px;
  width: 324px;
  border: none;
  text-align: left;
  font-size: 12px;
  padding-left: 16px;
  background-color: #ffffff;
  :hover {
    background-color: #f5f5f5;
  }
`
