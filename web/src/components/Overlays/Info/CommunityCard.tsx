import { useState } from 'react'

import { Tooltip } from 'react-tooltip'

import ThemedSkeleton from '../../Map/components/Skeleton'
import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'
import { PaymentCard } from './PaymentsCard'
export const CommunityCard = ({ activeProjectData, mediaSize, maximize }) => {
  const [toggle, setToggle] = useState<'Members' | 'Payments'>('Members')
  const [copied, setCopied] = useState(false)

  const handleCopy = async (address) => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500) // Tooltip reset after 1.5s
  }

  if (
    !activeProjectData ||
    !activeProjectData?.project ||
    !activeProjectData?.project?.communityMembers
  ) {
    return (
      <InfoBox maximize={maximize} mediaSize={mediaSize}>
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
    if (a.priority === b.priority) {
      return b.fundsReceived - a.fundsReceived
    } else {
      return a.priority - b.priority
    }
  })

  const communityMembersCount = project.communityMembers.length
  const memberOrMembers = communityMembersCount == 1 ? 'member' : 'members'

  return (
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
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
                const profileSrc =
                  d.profileUrl ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${fullName
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
                              <button
                                key={address}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  margin: 0,
                                  color: 'gray',
                                  fontSize: '16px',
                                }}
                                onClick={() => handleCopy(address)}
                                data-tooltip-id="clipTip"
                              >
                                {address.slice(0, 20)}...
                              </button>
                            ))}
                          </div>
                        )}
                        <Tooltip id="clipTip" delayShow={200} delayHide={500}>
                          {copied
                            ? 'Copied to clipboard!'
                            : 'Click to copy to clipboard'}
                        </Tooltip>
                        {d.Wallet?.SOLAccounts?.length > 0 && (
                          <div>
                            <p style={{ margin: 0 }}>Celo: </p>
                            {d.Wallet?.SOLAccounts?.map((address) => (
                              <button
                                key={address}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  margin: 0,
                                  color: 'gray',
                                  fontSize: '16px',
                                }}
                                onClick={() => handleCopy(address)}
                                title={
                                  copied
                                    ? 'copied to clipboard!'
                                    : 'click to copy to clipboard'
                                }
                              >
                                {address}
                              </button>
                            ))}
                          </div>
                        )}
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
            </div>
          </div>
        ) : (
          <PaymentCard activeProjectData={activeProjectData} />
        )}
      </div>
    </InfoBox>
  )
}
