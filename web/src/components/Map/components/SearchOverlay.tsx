import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import { countryToEmoji } from 'src/utils/countryToEmoji'

export const SearchOverlay = ({ map, setActiveProject, allCenterpoints }) => {
  const { theme } = useThemeUI()
  const allProjects = allCenterpoints?.features?.map((d) => d.properties)

  const [filteredProjects, setFilteredProjects] =
    useState<Array<{ name: string; country: string }>>(allProjects)
  const [showListOfProjects, setShowListOfProjects] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>()

  useEffect(() => {
    if (!allProjects || !allProjects.length) {
      return
    }
    if (allProjects.find((d) => d?.name == searchInput)) {
      setActiveProject(searchInput)
    }
  }, [allProjects, searchInput, setActiveProject])

  useEffect(() => {
    if (map) {
      map.on('click', () => {
        setShowListOfProjects(false)
      })
    }
  }, [map])

  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      const filteredProjects = allProjects?.filter(
        (d) =>
          d?.name.toLowerCase().includes(searchInput?.toLowerCase()) ||
          d?.country.toLowerCase().includes(searchInput?.toLowerCase())
      )
      setFilteredProjects(filteredProjects)
    } else {
      setFilteredProjects(allProjects)
    }
  }, [searchInput, setFilteredProjects])

  return (
    <>
      <SearchInputBox
        style={{
          borderRadius: showListOfProjects ? '8px 8px 0 0' : '8px',
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
        theme={theme}
      />
      <SearchIcon className="material-icons-round">search</SearchIcon>
      {showListOfProjects && (
        <>
          <OptionsContainer theme={theme}>
            {filteredProjects?.map((d, i) => (
              <Option
                key={i}
                position={i}
                onClick={() => {
                  setActiveProject(d)
                  setSearchInput(d.name)
                  setShowListOfProjects(false)
                }}
                theme={theme}
              >
                {d?.name}{' '}
                <CountrySubtitle>{countryToEmoji[d?.country]}</CountrySubtitle>
              </Option>
            ))}
          </OptionsContainer>
        </>
      )}
    </>
  )
}

const CountrySubtitle = styled.p`
  font-size: 0.75rem;
  color: #808080;
  display: inline-block;
  margin-left: 4px;
`

const SearchInputBox = styled.input<{ theme }>`
  z-index: 2;
  border: none;
  height: 40px;
  width: 360px;
  position: absolute;
  padding: 8px 12px;
  top: 8px;
  left: 8px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  font-size: 0.875rem;
  font-family: Karla;
`

const SearchIcon = styled.span`
  z-index: 5;
  font-size: 1.125rem;
  line-height: 1.125rem;
  position: absolute;
  top: 20px;
  left: 330px;
  color: #5f6369;
`

const OptionsContainer = styled.div<{ theme; numOptions: number }>`
  position: absolute;
  height: ${(props) => `${(props.numOptions + 1) * 40}px`};
  width: 360px;
  top: 44px;
  border: none;
  left: 8px;
  background-color: ${(props) => props.theme.colors.background};
  padding: 8px 0;
  border-radius: 0 0 0.5em 0.5em;
`

const Option = styled.button<{ theme; position: number }>`
  cursor: pointer;
  height: 40px;
  width: 360px;
  border: none;
  text-align: left;
  font-size: 12px;
  padding-left: 16px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  :hover {
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.secondaryBackground};
  }
`
