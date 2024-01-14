import Button from 'src/components/Map/components/Button'
import { InfoBox } from './InfoBox'

export const DownloadCard = ({activeProjectData}) => {
  return (
    <InfoBox>
      <div style={{ margin: '8px 24px' }}>
        <h2>Forestbench</h2>
        {activeProjectData.dataDownloadInfo}
        <p></p>
        <a
          target="_blank"
          href={activeProjectData.dataDownloadUrl}
        >
          <Button>Download Data</Button>
        </a>
      </div>
    </InfoBox>
  )
}
