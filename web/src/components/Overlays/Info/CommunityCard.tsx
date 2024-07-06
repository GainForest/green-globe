import { useState, useEffect } from 'react'

import * as d3 from 'd3'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'

import { stringDistance } from 'src/utils/typoCheck'

import ThemedSkeleton from '../../Map/components/Skeleton'
import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'
import { PaymentCard } from './PaymentsCard'
export const CommunityCard = ({ activeProjectData, mediaSize }) => {
  const [toggle, setToggle] = useState<'Members' | 'Payments'>('Members')
  const [copied, setCopied] = useState(false)
  const [paymentData, setPaymentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPayments, setTotalPayments] = useState({})
  const [communityMembers, setCommunityMembers] = useState([])
  const [showFiatMessage, setShowFiatMessage] = useState(false)
  const wallets = JSON.parse(process.env.GAINFOREST_WALLETS)

  const maximized = useSelector((state: State) => state.overlays.maximized)

  const formatFiatDate = (str) => {
    const parts = str.split('/')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const year = parseInt(parts[2], 10)

    return new Date(year, month, day)
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchFiatPayments = async () => {
        const res = await d3.csv(
          `${process.env.AWS_STORAGE}/transactions/fiat-transactions.csv`
        )
        const filteredRes = res
          .filter(
            (d) =>
              stringDistance(d.orgName, activeProjectData?.project.name) < 3
          )
          .map((d) => {
            const member = activeProjectData.project.communityMembers.find(
              (m) => m.id == d.communityMemberId
            )
            return {
              ...d,
              timestamp: formatFiatDate(d.timestamp),
              firstName: member?.firstName,
              lastName: member?.lastName,
              amount: parseFloat(d.originalAmount),
              currency: d.currency,
              blockchain: 'FIAT',
              profileUrl: member?.profileUrl,
              motive: d.motive,
            }
          })
        return filteredRes
      }

      setLoading(true)

      const cryptoPayments = await fetchCryptoPayments()
      const fiatPayments = await fetchFiatPayments()
      if (fiatPayments.length > 0) {
        setShowFiatMessage(true)
      }
      const allPayments = [...cryptoPayments, ...fiatPayments]
      setPaymentData(
        allPayments
          ?.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .filter((payment) => payment.amount >= 0.01)
      )
      setLoading(false)
    }
    fetchData()
  }, [activeProjectData])

  useEffect(() => {
    const total = {}
    const members = {}

    paymentData.forEach((payment) => {
      const currency = payment?.currency
      if (currency && Object.prototype.hasOwnProperty.call(total, currency)) {
        total[currency] += payment.amount
      } else {
        total[currency] = payment.amount
      }
      const member = payment?.communityMemberId
      if (member) {
        if (!members[member]) members[member] = {}
        if (Object.prototype.hasOwnProperty.call(members[member], currency)) {
          members[member][currency] += payment.amount
        } else {
          members[member][currency] = payment.amount
        }
      }
    })
    setTotalPayments(total)
    if (activeProjectData?.project?.communityMembers) {
      const membersWithPayment = [...activeProjectData.project.communityMembers]
        .map((d) => ({ ...d, fundsReceived: members[d.id] }))
        .sort((a, b) => {
          if (a.priority === b.priority) {
            return b.fundsReceived - a.fundsReceived
          } else {
            return a.priority - b.priority
          }
        })

      setCommunityMembers(membersWithPayment)
    }
  }, [paymentData, activeProjectData])

  const fetchCryptoPayments = async () => {
    let celoRecipients = []
    let solanaRecipients = []

    const memberMap = {}

    // Get all the community members' wallet addresses
    activeProjectData?.project?.communityMembers?.forEach((item) => {
      if (item.Wallet && item.Wallet.CeloAccounts) {
        celoRecipients = celoRecipients.concat(
          item.Wallet.CeloAccounts.filter((account) => {
            // map transaction to member for data display
            if (account) {
              memberMap[account] = {
                firstName: item.firstName,
                lastName: item.lastName,
                profileUrl: item.profileUrl,
                communityMemberId: item.id,
              }
            }
            return account
          })
        )
      }
      if (item.Wallet && item.Wallet.SOLAccounts) {
        solanaRecipients = solanaRecipients.concat(
          item.Wallet.SOLAccounts.filter((account) => {
            if (account) {
              memberMap[account] = {
                firstName: item.firstName,
                lastName: item.lastName,
                profileUrl: item.profileUrl,
              }
            }
            return account
          })
        )
      }
    })

    const allPayments = []
    if (celoRecipients.length > 0) {
      const celoPayments = await fetchCeloPayments(celoRecipients, memberMap)
      if (celoPayments.length > 0) {
        allPayments.push(...celoPayments)
      }
    }
    if (solanaRecipients.length > 0) {
      const solanaPayments = await fetchSolanaPayments(
        solanaRecipients,
        memberMap
      )
      if (solanaPayments.length > 0) {
        allPayments.push(...solanaPayments)
      }
    }

    return allPayments
  }

  const fetchCeloPayments = async (recipients, memberMap) => {
    const payments = []
    const recipientAttestationData = []

    // for (let i = 0; i < recipients.length; i++) {
    //   const recipientId = recipients[i]
    //   const attestationsArr = await fetchAttestations(recipientId)

    //   attestationsArr.forEach((ele) => {
    //     const tempArr = JSON.parse(ele.decodedDataJson)

    //     const messageObj = tempArr.find((e) => e.name === 'message')
    //     const transactionObj = tempArr.find((e) => e.name === 'transactionId')

    //     recipientAttestationData.push({
    //       recipientId,
    //       message: messageObj?.value?.value,
    //       transactionId: transactionObj?.value?.value,
    //       uid: ele.id,
    //     })
    //   })
    // }

    for (const address of wallets.Celo) {
      const res = await fetch(
        `https://explorer.celo.org/mainnet/api?module=account&action=tokentx&address=${address}`
      )

      const data = await res.json()
      const seen = new Set()
      let transactions = data['result'].filter((transaction) => {
        const recipientsLowercased = [...recipients].map((e) =>
          `${e}`.toLowerCase()
        )
        const isValid =
          transaction.tokenSymbol === 'cUSD' &&
          recipientsLowercased.includes(transaction.to)

        // fetch returns duplicate transactions, so we filter them out here
        const isNew = !seen.has(transaction.hash)
        if (isValid && isNew) {
          seen.add(transaction.hash)
          return recipientsLowercased.includes(transaction.to)
        }
      })

      transactions = transactions.map((transaction) => {
        const attestation = recipientAttestationData.find(
          (ele) => ele.transactionId === transaction.hash
        )

        const currentRecipientId = recipients.find(
          (id) => `${id}`.toLowerCase() === `${transaction?.to}`.toLowerCase()
        )

        return {
          to: transaction.to,
          timestamp: dayjs.unix(transaction.timeStamp).format('YYYY-MM-DD'),
          firstName: memberMap[currentRecipientId]['firstName'],
          lastName: memberMap[currentRecipientId]['lastName'],
          profileUrl: memberMap[currentRecipientId]['profileUrl'],
          amount: transaction.value / 1e18,
          currency: transaction.tokenSymbol,
          hash: transaction.hash,
          message: attestation ? attestation.message : undefined,
          attestationUid: attestation ? attestation.uid : undefined,
          blockchain: 'Celo',
          communityMemberId: memberMap[currentRecipientId].communityMemberId,
        }
      })
      if (transactions.length > 0) {
        payments.push(...transactions)
      }
    }

    return payments
  }

  const fetchSolanaPayments = async (recipients, memberMap) => {
    const payments = []
    for (const address of wallets.Solana) {
      const query = `
            query MyQuery {
              solana {
                transfers(senderAddress: {is: "${address}"}) {
                  amount
                  currency {
                    name
                  }
                  receiver {
                    address
                  }
                  date {
                    date
                  }
                  transaction {
                    signature
                  }
                }
              }
            }
    `
      let res
      let result
      try {
        res = await fetch('https://graphql.bitquery.io', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.BITQUERY_API_KEY,
          },
          body: JSON.stringify({ query }),
        })
        result = await res.json()
      } catch (e) {
        console.error('Error fetching solana payments:', e)
        return []
      }
      let transactions = result.data.solana.transfers.filter(
        (transaction) =>
          recipients.includes(transaction.receiver.address) &&
          transaction.currency.name === 'USDC'
      )
      transactions = transactions.map((transaction) => ({
        to: transaction.receiver.address,
        timestamp: transaction.date.date,
        firstName: memberMap[transaction.receiver.address]['firstName'],
        lastName: memberMap[transaction.receiver.address]['lastName'],
        profileUrl: memberMap[transaction.receiver.address]['profileUrl'],
        amount: transaction.amount,
        currency: 'Solana',
        hash: transaction.transaction.signature,
      }))
      if (transactions.length > 0) {
        payments.push(...transactions)
      }
    }
    return payments
  }

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

  const communityMembersCount = project.communityMembers.length
  const memberOrMembers = communityMembersCount == 1 ? 'member' : 'members'

  if (loading) {
    return (
      <InfoBox mediaSize={mediaSize}>
        <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
          <h1 style={{ marginBottom: '8px' }}>Community</h1>
          <p style={{ marginTop: '32px' }}>loading...</p>
        </div>
      </InfoBox>
    )
  }

  return (
    <InfoBox mediaSize={mediaSize}>
      <div style={{ marginLeft: '16px', marginBottom: '8px'  }}>
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
              {Object.entries(totalPayments)
                .map(([currency, amount]) => `${amount} ${currency}`)
                .sort(
                  (a, b) =>
                    parseFloat(b.split(' ')[0]) - parseFloat(a.split(', ')[0])
                )
                .join(', ')}
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
                                {maximized
                                  ? address
                                  : address.slice(0, 15) + '...'}
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
                            <p style={{ margin: 0 }}>Solana: </p>
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
                                {maximized
                                  ? address
                                  : address.slice(0, 15) + '...'}
                              </button>
                            ))}
                          </div>
                        )}
                        <p style={{ margin: 0, color: '#808080' }}>{d.role}</p>
                        <p style={{ color: '#669629' }}>
                          {d.fundsReceived
                            ? Object.entries(d.fundsReceived)
                                .map(
                                  ([currency, amount]) =>
                                    `${amount} ${currency}`
                                )
                                .join(', ')
                            : 'No funds received.'}
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
          <PaymentCard
            activeProjectData={activeProjectData}
            paymentData={paymentData}
            loading={loading}
          />
        )}
      </div>
    </InfoBox>
  )
}
