import { InfoBox } from './InfoBox'
import ThemedSkeleton from './Skeleton'

export const CommunityCard = ({ activeProjectData }) => {
  if (!activeProjectData) {
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
  const { project } = activeProjectData
  const totalFundsReceived = project.CommunityMember.reduce(
    (acc, d) => acc + d.fundsReceived || 0,
    0
  )
  const formatedTotalFundsReceived = totalFundsReceived
    ? totalFundsReceived.toFixed(2)
    : 0

  return (
    <InfoBox>
      <div style={{ margin: '8px 24px' }}>
        <h2>Funding Received</h2>${formatedTotalFundsReceived}
      </div>
      <div style={{ margin: '8px 24px' }}>
        <h2>Community Members</h2>
        <p>
          Members of local communities who receive financial benefits from this
          project.
        </p>
      </div>
    </InfoBox>
  )
}
