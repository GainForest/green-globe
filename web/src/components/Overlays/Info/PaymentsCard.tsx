import { useEffect, useState } from 'react'

import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoBox } from './InfoBox'
export const PaymentCard = ({ activeProjectData }) => {
  const [paymentData, setPaymentData] = useState([])
  const gainforestWallet = '0xbf8480fc387b72892ca28f4e9f07f95ed5672b3f'

  useEffect(() => {
    const addresses = activeProjectData?.project?.CommunityMember.map(
      (member) => member?.Wallet?.CeloAccount
    )
    if (addresses) {
      // fetch all gainforest wallet transactions
      fetch(
        `https://explorer.celo.org/mainnet/api?module=account&action=tokentx&address=${gainforestWallet}`
      )
        .then((res) => res.json())
        .then((data) => {
          const seen = new Set()
          const transactions = data['result'].filter((transaction) => {
            // current fetch is returning duplicate transactions
            const isNew = !seen.has(transaction.hash)
            seen.add(transaction.hash)
            return isNew && addresses.includes(transaction.to)
          })
          if (transactions.length > 0) {
            setPaymentData(transactions)
          }
        })
    }
  }, [activeProjectData?.project?.CommunityMember])

  const getBlockDate = (timeStamp) => {
    const blockDate = new Date(timeStamp * 1000)
    return blockDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

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

  return (
    <InfoBox>
      <div style={{ margin: '24px' }}>
        <h1>Community Payments</h1>
        <div>
          {paymentData.length > 0 ? (
            paymentData.map((payment) => {
              return (
                <div style={{ marginTop: '32px' }} key={payment.hash}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: '16px' }}>
                      <h3> {getBlockDate(payment.timeStamp)}</h3>
                      <p>
                        To:{' '}
                        <a
                          style={{
                            margin: 0,
                            color: '#808080',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                            overflowWrap: 'break-word',
                          }}
                          href={`https://explorer.celo.org/mainnet/tx/${payment.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {payment.to}
                        </a>
                      </p>
                      <p style={{ color: '#67962A' }}>
                        ${(payment.value / 1e18).toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p style={{ marginTop: '32px' }}>No transactions found.</p>
          )}
        </div>
      </div>
    </InfoBox>
  )
}
