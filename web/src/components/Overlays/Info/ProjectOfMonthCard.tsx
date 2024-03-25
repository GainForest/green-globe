import { useEffect, useState } from 'react'

import { useThemeUI } from 'theme-ui'

import { Link } from '@redwoodjs/router'

import { ExitButton } from 'src/components/Map/components/ExitButton'
import { fetchProjectInfo } from 'src/components/Map/mapfetch'

import { ProjectSplash } from './ProjectCard/ProjectCard'
export const ProjectOfMonthCard = ({ mediaSize }) => {
  const [projectData, setProjectData] = useState()
  const [isVisible, setIsVisible] = useState(true)

  const { theme } = useThemeUI()

  const fetchProjectOfMonth = async () => {
    const response = fetch(`${process.env.GAINFOREST_ENDPOINT}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            projectOfTheMonth {
              id
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result?.data?.projectOfTheMonth?.id
      })

    return response
  }

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await fetchProjectOfMonth()
      if (projectData) {
        const data = await fetchProjectInfo(projectData)
        setProjectData(data)
      }
    }
    fetchProject()
  }, [])

  const truncateText = (text, maxLength) => {
    const replacedText = text.replaceAll('\\n', '\n')

    if (replacedText.length > maxLength) {
      return `${replacedText.substring(0, maxLength)}...`
    } else {
      return replacedText
    }
  }

  if (projectData && isVisible)
    return (
      <div
        style={{
          zIndex: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          position: 'absolute',
          height: '500px',
          width: '300px',
          top: '100px',
          left: '20px',
          backgroundColor: theme.colors.background as string,
          color: theme.colors.text as string,
          borderRadius: '0.5em',
          overflowY: 'auto',
          padding: '8px',
          alignItems: 'center',
        }}
      >
        <ExitButton
          onClick={() => setIsVisible(false)}
          style={{ top: '10px', left: '260px' }}
          mediaSize={mediaSize}
          maximize={false}
        />
        <h3>Project of the month</h3>
        <h1>{projectData.project.name}</h1>
        <ProjectSplash activeProjectData={projectData} />
        <h3>Description</h3>
        <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
          {truncateText(projectData.project.longDescription, 200)}
        </p>
        <Link to={`/${projectData.project.id}/1`}>Learn more</Link>
      </div>
    )
  else {
    return null
  }
}
