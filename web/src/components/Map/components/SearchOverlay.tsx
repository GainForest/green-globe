import { useEffect, useState } from 'react'

import styled from 'styled-components'

const allProjects = [
  'Defensores del Chaco',
  'Kayapo Project',
  'Million Trees Project',
  'Oceanus Conservation',
]

export const SearchOverlay = ({ setActiveProject }) => {
  const [filteredProjects, setFilteredProjects] =
    useState<Array<string>>(allProjects)
  const [showListOfProjects, setShowListOfProjects] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>()

  useEffect(() => {
    if (allProjects.find((d) => d == searchInput)) {
      setActiveProject(searchInput)
    }
  }, [searchInput, setActiveProject])

  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      const filteredProjects = allProjects.filter((d) =>
        d.toLowerCase().includes(searchInput?.toLowerCase())
      )
      setFilteredProjects(filteredProjects)
    } else {
      setFilteredProjects(allProjects)
    }
  }, [searchInput, setFilteredProjects])

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
          setSearchInput(e.target.value)
        }}
        value={searchInput}
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
            {filteredProjects.map((d, i) => (
              <Option
                key={i}
                position={i}
                onClick={() => {
                  setActiveProject(d)
                  setSearchInput(d)
                  setShowListOfProjects(false)
                }}
              >
                {d}{' '}
                <p
                  style={{
                    fontSize: '12px',
                    color: '#808080',
                    display: 'inline-block',
                    marginLeft: '4px',
                  }}
                >
                  Philippines
                </p>
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
  height: ${(props) => `${(props.numOptions + 1) * 40}px`};
  width: 324px;
  top: 44px;
  border: none;
  left: 8px;
  background-color: #ffffff;
  padding: 8px 0;
  border-radius: 0 0 0.5em 0.5em;
  t
`

const Option = styled.button<{ position: number }>`
  cursor: pointer;
  height: 40px;
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
