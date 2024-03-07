import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import { breakpoints } from 'src/constants'
import { countryToEmoji } from 'src/utils/countryToEmoji'

export const SearchOverlay = ({
  map,
  setActiveProject,
  allCenterpoints,
  mediaSize,
}) => {
  const { theme } = useThemeUI()
  const allProjects = allCenterpoints?.features?.map((d) => d.properties)
  const [filteredProjects, setFilteredProjects] =
    useState<Array<{ name: string; country: string }>>(allProjects)
  const [showListOfProjects, setShowListOfProjects] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>()
  const [showSearchBar, setShowSearchBar] = useState<boolean>(
    mediaSize < breakpoints.m ? false : true
  )

  useEffect(() => {
    if (!allProjects || !allProjects.length) {
      return
    }
    const found = allProjects.find((d) => d?.name == searchInput)
    if (found) {
      setActiveProject(found?.projectId)
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
      const filteredProjects = allProjects?.filter((d) => {
        const country = countryToEmoji[d?.country]?.name?.toLowerCase()
        return (
          d?.name.toLowerCase().includes(searchInput?.toLowerCase()) ||
          country.includes(searchInput?.toLowerCase())
        )
      })
      setFilteredProjects(filteredProjects)
    } else {
      setFilteredProjects(allProjects)
    }
  }, [searchInput, setFilteredProjects])

  return (
    <>
      {mediaSize < breakpoints.m && (
        <button
          style={{
            width: '20px',
            height: '20px',
            position: 'absolute',
            left: '125px',
            top: '17px',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0',
          }}
          onClick={() => {
            setShowSearchBar((showSearchBar) => !showSearchBar)
          }}
        >
          <img
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            alt="search"
            src={'/search.png'}
          />
        </button>
      )}
      {showSearchBar && (
        <SearchInputBox
          style={{
            borderRadius: showListOfProjects ? '8px 8px 0 0' : '8px',
          }}
          placeholder={'Search for projects or country'}
          onClick={() => {
            setShowListOfProjects(!showListOfProjects)
          }}
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
          value={searchInput}
          theme={theme}
        />
      )}
      {showListOfProjects && (
        <>
          <OptionsContainer theme={theme}>
            {filteredProjects?.splice(0, 4).map((d, i) => (
              <Option
                key={i}
                position={i}
                onClick={() => {
                  setSearchInput(d.name)
                  setShowListOfProjects(false)
                }}
                theme={theme}
              >
                {d?.name}{' '}
                <CountrySubtitle>
                  {countryToEmoji[d?.country].name}
                </CountrySubtitle>
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
  top: 6px;
  left: 140px;
  color: #ffffff;
  background-color: ${(props) => props.theme.colors.hinted};
  font-size: 0.875rem;
  font-family: Karla;

  @media (max-width: 767px) {
    width: 280px;
    top: 60px;
    left: 6px;
  }
`

const OptionsContainer = styled.div<{ theme; numOptions: number }>`
  position: absolute;
  height: ${(props) => `${(props.numOptions + 1) * 40}px`};
  width: 360px;
  top: 44px;
  border: none;
  left: 140px;
  background-color: ${(props) => props.theme.colors.background};
  padding: 8px 0;
  border-radius: 0 0 0.5em 0.5em;
  z-index: 3;

  @media (max-width: 767px) {
    width: 280px;
    top: 110px;
    left: 6px;
  }
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
  @media (max-width: 767px) {
    width: 280px;
  }
`
