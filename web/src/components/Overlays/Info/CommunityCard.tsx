import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoBox } from './InfoBox'
export const CommunityCard = ({ activeProjectData }) => {
  if (
    !activeProjectData ||
    !activeProjectData?.project ||
    !activeProjectData?.project?.CommunityMember
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

  const communityMembersCount = project.CommunityMember.length
  const moreCommunityNumbersCount =
    project.CommunityMember.length - 5 > 0
      ? project.CommunityMember.length - 5
      : 0
  const memberOrMembers = communityMembersCount == 1 ? 'member' : 'members'

  return (
    <InfoBox>
      <div style={{ margin: '24px' }}>
        <h1>Community</h1>
        <h2>Total Funds Received</h2>
        <p style={{ color: '#67962A', fontWeight: 'bold' }}>
          {'$' + formatedTotalFundsReceived}
        </p>
        <div>
          <h2>People</h2>
          <p>
            <b style={{ color: '#67962A' }}>{communityMembersCount}</b>{' '}
            {memberOrMembers} from the local communities are registered to
            receive financial benefits from this project.
          </p>
          {topFiveCommunityMembers.map((d) => {
            let fullName
            if (d.firstName && d.lastName) {
              fullName = `${d.firstName} ${d.lastName}`
            } else if (d.firstName && !d.lastName) {
              fullName = `${d.firstName}`
            } else if (!d.firstName && d.lastName) {
              fullName = `${d.lastName}`
            } else {
              fullName = ''
            }
            const profileSrc =
              d.profileUrl ||
              `https://avatars.dicebear.com/api/initials/${fullName
                .toLowerCase()
                .replace(' ', '-')}.svg`
            return (
              <div
                style={{ marginTop: '32px' }}
                key={`community-member-${d.id}`}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <img
                      alt={`${d.name}-profile`}
                      src={profileSrc}
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
            )
          })}
          {moreCommunityNumbersCount > 0 && (
            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  border: 'none',
                  borderRadius: '0.5em',
                  backgroundColor: '#67962A',
                  cursor: 'pointer',
                  textAlign: 'center',
                  color: '#ffffff',
                  height: '40px',
                  width: '240px',
                  marginTop: '16px',
                }}
              >
                View {moreCommunityNumbersCount} more community members
              </button>
            </div>
          )}
        </div>
      </div>
    </InfoBox>
  )
}
