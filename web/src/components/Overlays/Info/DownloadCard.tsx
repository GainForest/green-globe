import Button from 'src/components/Map/components/Button'
import { InfoBox } from './InfoBox'

export const DownloadCard = ({ activeProjectData }) => {
  return (
    <InfoBox>
      <div style={{ margin: '8px 24px' }}>
        <h2>Forestbench</h2>
        {activeProjectData?.dataDownloadInfo}
        <p></p>
        {activeProjectData?.dataDownloadUrl ? (
          <a target="_blank" href={activeProjectData?.dataDownloadUrl}>
            <Button>Download Data</Button>
          </a>
        ) : (
          <Button style={{ backgroundColor: 'grey', cursor: 'not-allowed', width: '240px'}}>Data Not Available for Download </Button>
        )}
      </div>
    </InfoBox>
  )
}
