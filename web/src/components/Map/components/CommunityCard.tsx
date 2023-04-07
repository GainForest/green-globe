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
        {project.CommunityMember.sort((a, b) => b.priority - a.priority).map(
          (d) => (
            <div key={`community-member-${d.id}`}>
              <div style={{ display: 'flex' }}>
                <div>
                  <img
                    alt={`${d.name}-profile`}
                    src={d.profileUrl}
                    width={100}
                    height={100}
                    style={{ borderRadius: 50 }}
                  />
                </div>
                <div>
                  <h3>
                    {d.firstName} {d.lastName}
                  </h3>
                  <p>{d.role}</p>
                </div>
              </div>
              {d.bio}
              {d.fundsReceived == 0 ? 'No funds received.' : d.fundsReceived}
            </div>
          )
        )}
      </div>
    </InfoBox>
  )
}
