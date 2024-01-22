import { useEffect, useState } from 'react'

import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoBox } from './InfoBox'
export const PaymentCard = ({ activeProjectData }) => {
  const [paymentData, setPaymentData] = useState([])
  const [loading, setLoading] = useState(true)
  const wallets = JSON.parse(process.env.GAINFOREST_WALLETS)

  useEffect(() => {
    const recipients = activeProjectData?.project?.CommunityMember.map(
      (member) => member?.Wallet?.CeloAccount
    )

    // test recipients, one from each wallet
    // const recipients = [
    //   '5xZ2EVVU3ppyoeCq8TraQL3BXWLnSsKgUFY3EjYAaPcZ',
    //   '0xe034805f09e26045259bf0d0b8cd41491cada701',
    // ]

    const fetchPayments = async () => {
      const allPayments = []
      for (const address of wallets.Celo) {
        const res = await fetch(
          `https://explorer.celo.org/mainnet/api?module=account&action=tokentx&address=${address}`
        )
        const data = await res.json()
        const seen = new Set()
        let transactions = data['result'].filter((transaction) => {
          const isValid =
            transaction.tokenSymbol === 'cUSD' &&
            recipients.includes(transaction.to)
          // current fetch is returning duplicate transactions
          const isNew = !seen.has(transaction.hash)
          if (isValid && isNew) {
            seen.add(transaction.hash)
            return recipients.includes(transaction.to)
          }
        })
        transactions = transactions.map((transaction) => ({
          to: transaction.to,
          date: getDate(transaction.timeStamp),
          amount: transaction.value / 1e18,
          type: 'celo',
          hash: transaction.hash,
        }))
        if (transactions.length > 0) {
          allPayments.push(...transactions)
        }
      }
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
        const res = await fetch('https://graphql.bitquery.io', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.BITQUERY_API_KEY,
          },
          body: JSON.stringify({ query }),
        })
        const result = await res.json()
        let transactions = result.data.solana.transfers.filter(
          (transaction) =>
            recipients.includes(transaction.receiver.address) &&
            transaction.currency.name === 'USD Coin'
        )
        transactions = transactions.map((transaction) => ({
          to: transaction.receiver.address,
          date: getDate(transaction.date.date),
          amount: transaction.amount,
          type: 'solana',
          hash: transaction.transaction.signature,
        }))
        if (transactions.length > 0) {
          allPayments.push(...transactions)
        }
      }
      if (allPayments.length > 0) {
        setPaymentData(allPayments)
      }
      setLoading(false)
    }

    if (recipients.length > 0) {
      fetchPayments()
    } else {
      setLoading(false)
    }
  }, [activeProjectData?.project?.CommunityMember])

  const getDate = (timeStamp) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    let dateObj
    if (timeStamp.split('-').length > 1) {
      dateObj = new Date(timeStamp)
    } else {
      dateObj = new Date(timeStamp * 1000)
    }
    return dateObj.toLocaleDateString('en-GB', options)
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
  if (loading) {
    return (
      <div style={{ margin: '24px' }}>
        <h1>Community Payments</h1>
        <p style={{ marginTop: '32px' }}>loading...</p>
      </div>
    )
  }
  return (
    <div style={{ margin: '24px' }}>
      <h1>Community Payments</h1>
      <div>
        {paymentData.length > 0 ? (
          paymentData.map((payment) => {
            return (
              <div style={{ marginTop: '32px' }} key={payment.hash}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginLeft: '16px' }}>
                    <h3> {payment.date}</h3>
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
                        href={
                          payment.type === 'celo'
                            ? `https://explorer.celo.org/mainnet/tx/${payment.hash}`
                            : `https://explorer.solana.com/tx/${payment.hash}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {payment.to}
                      </a>
                    </p>
                    <p style={{ color: '#67962A' }}>${payment.amount}</p>
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
  )
}
