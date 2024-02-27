import Button from 'src/components/Map/components/Button'

import { InfoBox } from './InfoBox'

export const DownloadCard = ({ activeProjectData, mediaSize }) => {
  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ margin: '8px 24px' }}>
        <h2>Forestbench</h2>
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
