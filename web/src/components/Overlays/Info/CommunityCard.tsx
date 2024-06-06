import { useState } from 'react'

import ThemedSkeleton from '../../Map/components/Skeleton'
import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'
import { PaymentCard } from './PaymentsCard'
export const CommunityCard = ({ activeProjectData, mediaSize }) => {
  const [toggle, setToggle] = useState<'Members' | 'Payments'>('Members')

  if (
    !activeProjectData ||
    !activeProjectData?.project ||
    !activeProjectData?.project?.communityMembers
  ) {
    return (
      <InfoBox mediaSize={mediaSize}>
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
  const totalFundsReceived = project.communityMembers.reduce(
    (acc, d) => acc + d.fundsReceived || 0,
    0
  )
  const formatedTotalFundsReceived = totalFundsReceived
    ? totalFundsReceived.toFixed(2)
    : 0

  const communityMembers = [...project.communityMembers].sort((a, b) => {
    if (a.priority === null) return 1
    if (b.priority === null) return -1
    return a.priority - b.priority
  })

  const communityMembersCount = project.communityMembers.length
  const memberOrMembers = communityMembersCount == 1 ? 'member' : 'members'

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Community</h1>
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Members', 'Payments']}
        />
        {toggle === 'Members' ? (
          <div>
            <h2>Total Funds Received</h2>
            <p style={{ color: '#669629', fontWeight: 'bold' }}>
              {'$' + formatedTotalFundsReceived}
            </p>
            <div>
              <h2>People</h2>
              <p>
                <b style={{ color: '#669629' }}>{communityMembersCount}</b>{' '}
                {memberOrMembers} from the local communities are registered to
                receive financial benefits from this project.
              </p>
              {communityMembers.map((d) => {
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
                const profileSrc = d.profileUrl
                  ? `${process.env.AWS_STORAGE}/${d.profileUrl}`
                  : `https://api.dicebear.com/7.x/initials/svg?seed=${fullName
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
                          style={{ borderRadius: 50, objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ marginLeft: '16px' }}>
                        <h3>
                          {d.firstName} {d.lastName}
                        </h3>
                        {d.Wallet?.CeloAccounts?.length > 0 && (
                          <div>
                            <p style={{ margin: 0 }}>Celo: </p>
                            {d.Wallet?.CeloAccounts?.map((address) => (
                              <p
                                key={address}
                                style={{ margin: 0, color: 'gray' }}
                              >
                                {address}
                              </p>
                            ))}
                          </div>
                        )}
                        {d.Wallet?.SOLAccounts?.length > 0 && (
                          <div>
                            <p style={{ margin: 0 }}>Celo: </p>
                            {d.Wallet?.SOLAccounts?.map((address) => (
                              <p
                                key={address}
                                style={{ margin: 0, color: 'gray' }}
                              >
                                {address}
                              </p>
                            ))}
                          </div>
                        )}
                        <p style={{ margin: 0, color: '#808080' }}>{d.role}</p>
                        <p style={{ color: '#669629' }}>
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
            </div>
          </div>
        ) : (
          <PaymentCard activeProjectData={activeProjectData} />
        )}
      </div>
    </InfoBox>
  )
}
