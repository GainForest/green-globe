import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { HexagonalImage } from 'src/components/HexagonalImage/HexagonalImage';
import { toKebabCase } from 'src/utils/toKebabCase';
import { FileText, Video } from 'lucide-react';

interface Individual {
  'Filename/Run': string;
  class: string;
}

interface PdfStatus {
  filename: string;
  exists: boolean;
}

const PDF_FILES = [
  'biomass_plot.pdf',
  'embeddings_plot.pdf',
  'order_composition_plot.pdf',
  'rarefaction_plot.pdf',
  'size_distribution_plot.pdf',
  'spatial_plot.pdf',
  'temporal_plot.pdf'
];

export const InsectSpy = () => {
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [pdfStatuses, setPdfStatuses] = useState<PdfStatus[]>([]);
  const kebabCasedProjectName = useSelector((state: State) =>
    toKebabCase(state.project.name)
  );

  useEffect(() => {
    if (kebabCasedProjectName) {
      // Fetch individuals data
      d3.csv(
        `${process.env.AWS_STORAGE}/insectspy/${kebabCasedProjectName}/individuals.csv`
      ).then(setIndividuals);

      // Check each PDF file
      Promise.all(PDF_FILES.map(file =>
        fetch(`${process.env.AWS_STORAGE}/insectspy/${kebabCasedProjectName}/${file}`)
          .then(response => ({ filename: file, exists: response.ok }))
          .catch(() => ({ filename: file, exists: false }))
      )).then(setPdfStatuses);
    }
  }, [kebabCasedProjectName]);

  if (!kebabCasedProjectName) {
    return <Loading />;
  }

  const availablePdfs = pdfStatuses.filter(status => status.exists);

  return (
    <InsectContainer>
      <h2>Insect trap</h2>

      <h2>Video Showcase</h2>
      <VideoContainer>
        <h2>Timelapse on Raft 2</h2>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/mw0Jtz9roDs"
          title="Insect Trap Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoContainer>

      <VideoContainer>
        <h2>Timelapse on Raft 3</h2>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/ndPckbi3Evw"
          title="Insect Trap Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoContainer>

      <h2>Analysis Plots</h2>
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
          <p>No analysis plots are available yet. Check back later!</p>
        </PlaceholderContainer>
      )}
    </InsectContainer>
  );
};

const Loading = () => (
  <InsectContainer>Loading insect data and analysis plots...</InsectContainer>
);

const InsectContainer = styled.div`
  margin: 16px 0px;
`;

const VideoContainer = styled.div`
  margin-bottom: 24px;
`;

const PdfContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

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
`;

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
`;
