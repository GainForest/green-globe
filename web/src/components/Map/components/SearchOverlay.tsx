import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

import { breakpoints } from 'src/constants'
import { setProjectId } from 'src/reducers/projectsReducer'
import { countryToEmoji } from 'src/utils/countryToEmoji'

export const SearchOverlay = ({
  map,
  mediaSize,
  searchInput,
  setSearchInput,
}) => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  const [allProjects, setAllProjects] = useState([])
  const [filteredProjects, setFilteredProjects] =
    useState<Array<{ name: string; country: string }>>(allProjects)
  const [showListOfProjects, setShowListOfProjects] = useState<boolean>(false)
  const [showSearchBar, setShowSearchBar] = useState<boolean>(
    mediaSize < breakpoints.m ? false : true
  )
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(
        `${process.env.AWS_STORAGE}/shapefiles/gainforest-all-shapefiles-new.geojson`
      )
      const data = await res.json()
      setAllProjects(data.features.map((feature) => feature.properties))
    }
    getProjects()
  }, [])

  useEffect(() => {
    if (mediaSize < breakpoints.m) {
      setShowSearchBar(false)
    } else {
      setShowSearchBar(true)
    }
  }, [mediaSize])

  useEffect(() => {
    if (map) {
      map.on('click', () => {
        setShowListOfProjects(false)
      })
    }
  }, [map])

  useEffect(() => {
    if (searchInput && searchInput.length == 0) {
      setFilteredProjects(allProjects)
    }
    if (searchInput && searchInput.length > 0) {
      const filteredProjects = allProjects?.filter((d) => {
        const country = countryToEmoji[d?.country]?.name?.toLowerCase()
        return (
          d?.name?.toLowerCase().includes(searchInput?.toLowerCase()) ||
          country.includes(searchInput?.toLowerCase())
        )
      })
      setFilteredProjects(filteredProjects)
    } else {
      setFilteredProjects(allProjects)
    }
  }, [searchInput, setFilteredProjects])

  const handleClick = (target: string) => {
    setSearchInput(target)
    const found = allProjects.find((d) => d?.name == target)
    if (found) {
      dispatch(setProjectId(found?.projectId))
      if (mediaSize < breakpoints.m) {
        setShowSearchBar(false)
      }
      setShowListOfProjects(false)
    }
  }

  return (
    <>
      {mediaSize < breakpoints.m && (
        <button
          className="search-button"
          onClick={() => {
            setShowSearchBar((showSearchBar) => !showSearchBar)
          }}
        >
          <img
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              cursor: 'pointer',
            }}
            alt="search"
            src={'/search.png'}
          />
        </button>
      )}
      {showSearchBar && (
        <SearchInputBox
          onKeyDown={(e) => {
            const maxIndex = filteredProjects.length - 1
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSelectedIndex((prevIndex) =>
                prevIndex < maxIndex ? prevIndex + 1 : prevIndex
              )
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : 0
              )
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
              const selectedProject = filteredProjects[selectedIndex]
              handleClick(selectedProject.name)
              setSelectedIndex(-1)
            }
          }}
          style={{
            borderRadius: showListOfProjects ? '8px 8px 0 0' : '8px',
          }}
          placeholder={'Search for projects or country'}
          onClick={(e) => {
            setShowListOfProjects(true)
            e.target.select()
          }}
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
          value={searchInput}
          theme={theme}
        />
      )}
      {showListOfProjects && filteredProjects.length > 0 && (
        <>
          <OptionsContainer theme={theme}>
            {filteredProjects.slice(0, 4).map((d, i) => (
              <Option
                key={i}
                position={i}
                onClick={() => {
                  handleClick(d.name)
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
  z-index: 3;
  border: none;
  height: 40px;
  width: 360px;
  position: absolute;
  padding: 8px 12px;
  top: 6px;
  left: 182px;
  background-color: ${(props) => props.theme.colors.background};
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
  left: 182px;
  background-color: ${(props) => props.theme.colors.hinted};
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
    background-color: ${(props) => props.theme.colors.hinted};
  }
  @media (max-width: 767px) {
    width: 280px;
  }
`
