import Button from 'src/components/Map/components/Button'

import { InfoBox } from './InfoBox'

export const DownloadCard = ({ activeProjectData, mediaSize, maximize }) => {
  return (
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
      <div style={{ margin: '8px 24px' }}>
        <h1>Forestbench</h1>
        {activeProjectData?.project?.dataDownloadInfo}
        <p></p>
        {activeProjectData?.project?.dataDownloadUrl ? (
          <a
            target="_blank"
            href={activeProjectData?.project?.dataDownloadUrl}
            rel="noreferrer"
          >
            <Button>Download Data</Button>
          </a>
        ) : (
          <Button
            style={{
              backgroundColor: 'grey',
              cursor: 'not-allowed',
              width: '240px',
            }}
          >
            Data Not Available for Download{' '}
          </Button>
        )}
      </div>
    </InfoBox>
  )
}
