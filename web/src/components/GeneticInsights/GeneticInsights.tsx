import React, { useState, useEffect } from 'react'

import { FileText } from 'lucide-react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { toKebabCase } from 'src/utils/toKebabCase'

import { ModalWrapper } from '../ModalWrapper/ModalWrapper'

const PDF_FILES = ['OTU_richness.pdf', 'OTU_richness_2.pdf', 'OTU_shannon.pdf']

const PNG_FILES = [
  'jaccard-heatmap.png',
  'shannon-heatmap.png',
  'richness-heatmap.png',
]

const HTML_FILE = 'pie_charts.html'

interface PdfStatus {
  filename: string
  exists: boolean
}

export const GeneticInsights = () => {
  const [pdfStatuses, setPdfStatuses] = useState<PdfStatus[]>([])
  const [pngStatuses, setPngStatuses] = useState<PdfStatus[]>([])
  const [htmlExists, setHtmlExists] = useState(false)
  const kebabCasedProjectName = useSelector((state: any) =>
    toKebabCase(state.project.name)
  )

  useEffect(() => {
    if (kebabCasedProjectName) {
      // Check each PDF file
      Promise.all(
        PDF_FILES.map((file) =>
          fetch(
            `${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${file}`
          )
            .then((response) => ({ filename: file, exists: response.ok }))
            .catch(() => ({ filename: file, exists: false }))
        )
      ).then(setPdfStatuses)

      // Check HTML file
      fetch(
        `${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${HTML_FILE}`
      )
        .then((response) => setHtmlExists(response.ok))
        .catch(() => setHtmlExists(false))
    }
  }, [kebabCasedProjectName])

  useEffect(() => {
    const getPngs = async () => {
      const downloadFiles = async (prefix) => {
        const files = await Promise.all(
          PNG_FILES.map(async (filename) => {
            const res = await fetch(
              `${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${prefix}-${filename}`
            )
            if (res.ok) {
              return { filename: `${prefix}-${filename}`, exists: true }
            } else {
              return { filename: `${prefix}-${filename}`, exists: false }
            }
          })
        )
        return files.filter((file) => file.exists)
      }

      // Get plots with all species
      let files = []
      const overallResult = await downloadFiles('overall')
      if (overallResult.length > 0) {
        files = [...files, ...overallResult]
      }

      // Get plots by phylum for as many as there are
      let stillValid = true
      let i = 1
      while (stillValid) {
        const result = await downloadFiles(`${i}-phylum`)
        if (result.length > 0) {
          files = [...files, ...result]
          i += 1
        } else {
          stillValid = false
        }
      }
      setPngStatuses(files)
    }
    getPngs()
  }, [kebabCasedProjectName])

  if (!kebabCasedProjectName) {
    return <Loading />
  }

  const availablePdfs = pdfStatuses.filter((status) => status.exists)
  const availablePngs = pngStatuses.filter((status) => status.exists)

  return (
    <Container>
      <h2>eDNA Analysis Plots</h2>
      {availablePdfs.length > 0 || availablePngs.length > 0 || htmlExists ? (
        <>
          {htmlExists && (
            <HtmlItem>
              <iframe
                src={`${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${HTML_FILE}`}
                title="Pie Charts"
              />
              <a
                href={`${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${HTML_FILE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Pie Charts
              </a>
            </HtmlItem>
          )}
          <PdfContainer>
            {availablePdfs.map(({ filename }) => (
              <PdfItem key={filename}>
                <iframe
                  src={`${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${filename}`}
                  title={filename}
                />
                <a
                  href={`${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {filename.replace('_', ' ').replace('.pdf', '')}
                </a>
              </PdfItem>
            ))}
          </PdfContainer>
          {availablePngs && <h2>Heatmaps</h2>}
          {availablePngs.map(({ filename }) => (
            <ModalWrapper
              key={filename}
              FirstComponent={() => (
                <img
                  src={`${process.env.AWS_STORAGE}/edna/${kebabCasedProjectName}/${filename}`}
                  alt={filename}
                />
              )}
            />
          ))}
        </>
      ) : (
        <PlaceholderContainer>
          <FileText size={48} />
          <p>No eDNA analysis plots are available yet. Check back later!</p>
        </PlaceholderContainer>
      )}
    </Container>
  )
}

const Loading = () => <Container>Loading eDNA analysis plots...</Container>

const Container = styled.div`
  margin: 16px 0px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`

const PdfContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const HtmlItem = styled.div`
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  iframe {
    border: none;
    width: 100%;
    height: 600px;
  }

  a {
    display: block;
    color: #0066cc;
    text-decoration: none;
    padding: 12px;
    background-color: #f0f0f0;
    text-align: center;
    font-weight: bold;

    &:hover {
      background-color: #e0e0e0;
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    iframe {
      height: 400px;
    }
  }
`

const PdfItem = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  iframe {
    border: none;
    width: 100%;
    height: 400px;
    margin-bottom: 8px;
    flex-grow: 1;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    padding: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    margin-top: auto;

    &:hover {
      background-color: #e0e0e0;
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    iframe {
      height: 300px;
    }
  }
`

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;

  svg {
    margin-bottom: 16px;
    color: #999;
  }

  p {
    color: #666;
    font-size: 18px;
  }

  @media (max-width: 600px) {
    padding: 16px;

    p {
      font-size: 16px;
    }
  }
`
