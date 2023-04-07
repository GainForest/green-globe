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

  const topFiveCommunityMembers = [...project.CommunityMember]
    .sort((a, b) => b.priority - a.priority)
    .splice(0, 5)

  return (
    <InfoBox>
      <div style={{ margin: '8px 24px' }}>
        <h1>Community</h1>
        <h2>Total Funds Received</h2>${formatedTotalFundsReceived}
      </div>
      <div style={{ margin: '8px 24px' }}>
        <h2>People</h2>
        <p>
          Members of local communities who have received financial benefits from
          this project.
        </p>
        {topFiveCommunityMembers.map((d) => (
          <div style={{ marginTop: '32px' }} key={`community-member-${d.id}`}>
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
              <div style={{ marginLeft: '16px' }}>
                <h3>
                  {d.firstName} {d.lastName}
                </h3>
                <p style={{ margin: 0, color: '#808080' }}>{d.role}</p>
                <p style={{ color: '#67962A' }}>
                  {d.fundsReceived == 0
                    ? 'No funds received.'
                    : '$' + d.fundsReceived}
                </p>
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>{d.bio}</div>
          </div>
        ))}
        <button
          style={{
            border: 'none',
            borderRadius: '0.5em',
            backgroundColor: '#67962A',
            cursor: 'pointer',
            textAlign: 'center',
            color: '#ffffff',
            height: '40px',
            width: '150px',
          }}
        >
          More community members
        </button>
      </div>
    </InfoBox>
  )
}
