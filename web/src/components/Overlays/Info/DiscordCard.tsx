import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoBox } from './InfoBox'

export const DiscordCard = ({ activeProjectData }) => {
  if (
    !activeProjectData ||
    !activeProjectData?.project ||
    !activeProjectData?.project?.discordId
  ) {
    return (
      <InfoBox>
        <ThemedSkeleton height={250} />
        <div style={{ margin: '8px 24px' }}>
          <h1>
            <ThemedSkeleton width={'80%'} />
          </h1>
          <p>
            <ThemedSkeleton width={'100px'} />
          </p>
          <p>
            <ThemedSkeleton count={3.5} />
          </p>
        </div>
      </InfoBox>
    )
  }
  return (
    <InfoBox style={{ overflowY: 'none' }}>
      <iframe
        title={activeProjectData?.project?.discordId}
        src={
          'https://e.widgetbot.io/channels/919685113799925800/' +
          activeProjectData?.project?.discordId
        }
        style={{ borderWidth: 0, borderRadius: '0.5em' }}
        width="100%"
        height="560px"
      ></iframe>
    </InfoBox>
  )
}
