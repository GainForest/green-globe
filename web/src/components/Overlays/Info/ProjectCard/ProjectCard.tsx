import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'
import { breakpoints } from 'src/constants'
import { countryToEmoji } from 'src/utils/countryToEmoji'
import { InfoTag } from '../../../InfoTag/InfoTag'
import ThemedSkeleton from '../../../Map/components/Skeleton'
import { InfoBox } from '../InfoBox'
import { ProjectSiteButtons } from './ProjectSiteButtons'

const fetchProjectNumbers = async (projectId) => {
  try {
    const response = await fetch(`${process.env.AWS_STORAGE}/summary${projectId}.json`)
    if (!response.ok) throw new Error('Failed to fetch project numbers')
    return await response.json()
  } catch (error) {
    console.error('Error fetching project numbers:', error)
    return null
  }
}

export const ProjectCard = ({
  activeProjectData,
  activeProjectPolygon,
  setActiveProjectPolygon,
  mediaSize,
  handleClick,
}) => {
  const [promoVideo, setPromoVideo] = useState('')
  const [projectNumbers, setProjectNumbers] = useState(null)
  const { theme } = useThemeUI()

  useEffect(() => {
    const video = activeProjectData?.project?.assets?.find(
      (d) => d.classification === 'Promotional Video'
    )
    setPromoVideo(video?.awsCID || '')

    if (activeProjectData?.project?.id) {
      fetchProjectNumbers(activeProjectData.project.id).then(setProjectNumbers)
    }
  }, [activeProjectData])

  if (!activeProjectData) {
    return <ProjectCardSkeleton mediaSize={mediaSize} />
  }

  return (
    <InfoBox mediaSize={mediaSize}>
      <ProjectSplash
        activeProjectData={activeProjectData}
        promoVideo={promoVideo}
        handleClick={handleClick}
      />
      <ContentContainer>
        <ProjectHeader
          activeProjectData={activeProjectData}
          mediaSize={mediaSize}
          theme={theme}
        />
        <ProjectSiteButtons
          assets={activeProjectData?.project?.assets}
          activeShapefile={activeProjectPolygon}
          setActiveShapefile={setActiveProjectPolygon}
        />
        <Description activeProjectData={activeProjectData} />
        <Objectives activeProjectData={activeProjectData} />
        {projectNumbers && <SummaryStatistics numbers={projectNumbers} />}
      </ContentContainer>
    </InfoBox>
  )
}

const ProjectCardSkeleton = ({ mediaSize }) => (
  <InfoBox mediaSize={mediaSize}>
    <ThemedSkeleton height={250} />
    <ContentContainer>
      <h1><ThemedSkeleton width="80%" /></h1>
      <p><ThemedSkeleton width="100px" /></p>
      <p><ThemedSkeleton count={3.5} /></p>
    </ContentContainer>
  </InfoBox>
)

const ProjectSplash = ({ activeProjectData, promoVideo, handleClick }) => {
  const splash = activeProjectData?.project?.assets?.find(d =>
    d.classification?.includes('Splash'))?.awsCID

  return (
    <SplashContainer>
      <SplashImage
        src={splash ? `${process.env.AWS_STORAGE}/${splash}` : `${process.env.AWS_STORAGE}/project-splash/default-project-splash.png`}
        alt={splash ? "Project Splash" : "Default project splash"}
      />
      {promoVideo && (
        <PlayButton onClick={() => handleClick(promoVideo, 'video')}>
          <PlayIcon src="/play.png" alt="play" />
        </PlayButton>
      )}
    </SplashContainer>
  )
}

const ProjectHeader = ({ activeProjectData, mediaSize, theme }) => (
  <HeaderContainer>
    <ProjectLogo project={activeProjectData?.project} theme={theme} />
    <div>
      <ProjectTitle mediaSize={mediaSize}>
        {activeProjectData?.project?.name || ''}
      </ProjectTitle>
      <CountryAndArea theme={theme} activeProjectData={activeProjectData} />
    </div>
  </HeaderContainer>
)

const CountryAndArea = ({ activeProjectData, theme }) => {
  const area = Math.round(activeProjectData?.project?.area / 10000)
  const country = countryToEmoji[activeProjectData?.project?.country]

  return (
    <CountryAreaText>
      {`${country?.emoji} ${country?.name}`}
      {area > 0 && (
        <>
          <Separator theme={theme}>|</Separator>
          {area} {area === 1 ? 'hectare' : 'hectares'}
        </>
      )}
    </CountryAreaText>
  )
}

const Description = ({ activeProjectData }) => (
  <Section>
    <h3>Description</h3>
    <DescriptionText>
      {activeProjectData?.project?.longDescription.replaceAll('\\n', '\n')}
    </DescriptionText>
  </Section>
)

const Objectives = ({ activeProjectData }) => {
  const objectives = activeProjectData.project?.objective
    ?.split(',')
    ?.filter(Boolean)

  if (!objectives?.length) return null

  return (
    <Section>
      <h3>Objective</h3>
      <ObjectivesContainer>
        {objectives.map((objective) => (
          <InfoTag key={`infotag-${objective}`}>{objective}</InfoTag>
        ))}
      </ObjectivesContainer>
    </Section>
  )
}

const SummaryStatistics = ({ numbers }) => (
  <Section>
    <h3>Project Summary</h3>
    <StatisticsGrid>
      {Object.entries(numbers).map(([key, value]) => (
        <StatItem key={key}>
          <StatValue>{value}</StatValue>
          <StatLabel>{key.replace(/([A-Z])/g, ' $1').trim()}</StatLabel>
        </StatItem>
      ))}
    </StatisticsGrid>
  </Section>
)

const ProjectLogo = ({ theme, project }) => {
  const [logoAspectRatio, setLogoAspectRatio] = useState(1)
  const logo = project?.assets?.find((d) => d.classification === 'Logo')?.awsCID

  useEffect(() => {
    if (logo) {
      const img = new Image()
      img.src = `${process.env.AWS_STORAGE}/${logo}`
      img.onload = function () {
        setLogoAspectRatio(this.width / this.height)
      }
    }
  }, [logo])

  if (!logo) return null

  const isLogoCircular = Math.abs(logoAspectRatio - 1) < 0.1

  return (
    <LogoContainer theme={theme} isCircular={isLogoCircular}>
      <Logo src={`${process.env.AWS_STORAGE}/${logo}`} alt="Logo" />
    </LogoContainer>
  )
}

const ContentContainer = styled.div`
  margin: 24px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`

const SplashContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`

const SplashImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const PlayButton = styled.button`
  position: absolute;
  left: 16px;
  bottom: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.75;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

const ProjectTitle = styled.h1`
  font-size: ${({ mediaSize }) =>
    mediaSize >= breakpoints.xl
      ? '24px'
      : mediaSize > breakpoints.m
      ? '22px'
      : mediaSize > breakpoints.s
      ? '18px'
      : '16px'};
`

const CountryAreaText = styled.p`
  font-size: 0.75rem;
`

const Separator = styled.span`
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.secondary};
`

const Section = styled.div`
  margin-top: 20px;
`

const DescriptionText = styled.p`
  font-size: 0.875rem;
  white-space: pre-line;
`

const ObjectivesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const LogoContainer = styled.div`
  height: 80px;
  width: 80px;
  margin-right: 24px;
  background-color: ${({ theme }) => theme.colors.hinted};
  border-radius: ${({ isCircular }) => (isCircular ? '50%' : '0')};
  overflow: hidden;
`

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`
