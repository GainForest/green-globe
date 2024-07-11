import React, { useState, useEffect } from 'react'

import { FileText } from 'lucide-react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { toKebabCase } from 'src/utils/toKebabCase'

const PDF_FILES = [
  'biomass_plot.pdf',
  'embeddings_plot.pdf',
  'order_composition_plot.pdf',
  'rarefaction_plot.pdf',
  'size_distribution_plot.pdf',
  'spatial_plot.pdf',
  'temporal_plot.pdf',
]

interface PdfStatus {
  filename: string
  exists: boolean
}

export const CanopyInsights = () => {
  const [pdfStatuses, setPdfStatuses] = useState<PdfStatus[]>([])
  const kebabCasedProjectName = useSelector((state: any) =>
    toKebabCase(state.project.name)
  )

  useEffect(() => {
    if (kebabCasedProjectName) {
      // Check each PDF file
      Promise.all(
        PDF_FILES.map((file) =>
          fetch(
            `${process.env.AWS_STORAGE}/canopy/${kebabCasedProjectName}/${file}`
          )
            .then((response) => ({ filename: file, exists: response.ok }))
            .catch(() => ({ filename: file, exists: false }))
        )
      ).then(setPdfStatuses)
    }
  }, [kebabCasedProjectName])

  if (!kebabCasedProjectName) {
    return <Loading />
  }

  const availablePdfs = pdfStatuses.filter((status) => status.exists)

  return (
    <Container>
      <h2>Canopy Analysis Plots</h2>
      {availablePdfs.length > 0 ? (
        <PdfContainer>
          {availablePdfs.map(({ filename }) => (
            <PdfItem key={filename}>
              <iframe
                src={`${process.env.AWS_STORAGE}/insectspy/${kebabCasedProjectName}/${filename}`}
                width="100%"
                height="500px"
                title={filename}
              />
              <a
                href={`${process.env.AWS_STORAGE}/insectspy/${kebabCasedProjectName}/${filename}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {filename.replace('_', ' ').replace('.pdf', '')}
              </a>
            </PdfItem>
          ))}
        </PdfContainer>
      ) : (
        <PlaceholderContainer>
          <FileText size={48} />
          <p>No Canopy analysis plots are available yet. Check back later!</p>
        </PlaceholderContainer>
      )}
    </Container>
  )
}

const Loading = () => <Container>Loading Canopy analysis plots...</Container>

const Container = styled.div`
  margin: 16px 0px;
`

const PdfContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

const PdfItem = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;

  iframe {
    border: none;
    margin-bottom: 8px;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
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
`
