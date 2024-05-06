import { useEffect, useState } from 'react'

import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoTag } from './BiodiversityCard'
import { InfoBox } from './InfoBox'
export const PaymentCard = ({ activeProjectData }) => {
  const [paymentData, setPaymentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFiatMessage, setShowFiatMessage] = useState(false)
  const wallets = JSON.parse(process.env.GAINFOREST_WALLETS)

  const fetchCryptoPayments = async () => {
    let celoRecipients = []
    let solanaRecipients = []
    const nameMap = {}

    activeProjectData?.project?.communityMembers.forEach((item) => {
      if (item.Wallet && item.Wallet.CeloAccounts) {
        celoRecipients = celoRecipients.concat(
          item.Wallet.CeloAccounts.filter((account) => {
            if (account) {
              nameMap[account] = [item.firstName, item.lastName]
            }
            return account
          })
        )
      }
      if (item.Wallet && item.Wallet.SOLAccounts) {
        solanaRecipients = solanaRecipients.concat(
          item.Wallet.SOLAccounts.filter((account) => {
            if (account) {
              nameMap[account] = [item.firstName, item.lastName]
            }
            return account
          })
        )
      }
    })

    // test recipients, one from each wallet
    // const celoRecipients = ['0xe034805f09e26045259bf0d0b8cd41491cada701']
    // const solanaRecipients = ['5xZ2EVVU3ppyoeCq8TraQL3BXWLnSsKgUFY3EjYAaPcZ']
    const allPayments = []
    if (solanaRecipients.length > 0) {
      const solanaPayments = await fetchSolanaPayments(
        solanaRecipients,
        nameMap
      )
      if (solanaPayments.length > 0) {
        allPayments.push(...solanaPayments)
      }
    }
    if (celoRecipients.length > 0) {
      const celoPayments = await fetchCeloPayments(celoRecipients, nameMap)
      if (celoPayments.length > 0) {
        allPayments.push(...celoPayments)
      }
    }
    if (allPayments.length > 0) {
      return allPayments
    }
  }

  const fetchCeloPayments = async (recipients, nameMap) => {
    const payments = []
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
      console.log(transactions)
      transactions = transactions.map((transaction) => ({
        to: transaction.to,
        timestamp: transaction.timeStamp,
        firstName: nameMap[transaction.to][0],
        lastName: nameMap[transaction.to][1],
        amount: transaction.value / 1e18,
        currency: 'Celo',
        hash: transaction.hash,
      }))
      if (transactions.length > 0) {
        payments.push(...transactions)
      }
    }
    return payments
  }

  const fetchSolanaPayments = async (recipients, nameMap) => {
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
        firstName: nameMap[transaction.to][0],
        lastName: nameMap[transaction.to][1],
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

  useEffect(() => {
    const fetchData = async () => {
      const fetchFiatPayments = async () => {
        const res = await fetch(
          `${process.env.GAINFOREST_ENDPOINT}/api/graphql`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
        query {
          fiatTransactionsByProjectId(id:"${activeProjectData.project.id}") {
            amountInUsd
            timestamp
            currency
            originalAmount
            firstName
            lastName
            profileUrl
          }
        }
      `,
            }),
          }
        )
        const result = await res.json()
        return result.data.fiatTransactionsByProjectId.map((payment) => {
          return {
            ...payment,
            amount: payment.amountInUsd,
            currency: `Fiat (${payment.currency})`,
          }
        })
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

  const getDate = (timeStamp) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }

    const datePattern = /[-\/]/g

    let dateObj
    if (datePattern.test(timeStamp)) {
      dateObj = new Date(timeStamp)
    } else {
      // Unix timestamp - convert from seconds to milliseconds
      dateObj = new Date(parseInt(timeStamp) * 1000)
    }
    return dateObj.toLocaleDateString('en-GB', options)
  }

  const formatAmount = (amount) => {
    if (Number.isInteger(amount)) {
      return amount.toString()
    } else {
      return amount.toFixed(2)
    }
  }

  const tagColors = {
    Solana: '#9945FF',
    Celo: '#FCFF52',
    ETH: 'black',
  }

  if (
    !activeProjectData ||
    !activeProjectData?.project ||
    !activeProjectData?.project?.communityMembers
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
        <p style={{ marginTop: '32px' }}>loading...</p>
      </div>
    )
  }
  return (
    <div>
      <div>
        {showFiatMessage && (
          <p style={{ color: '#808080' }}>
            Fiat currencies are displayed in USD
          </p>
        )}
        {paymentData.length > 0 ? (
          paymentData.map((payment) => {
            let fullName
            if (payment.firstName && payment.lastName) {
              fullName = `${payment.firstName} ${payment.lastName}`
            } else if (payment.firstName && !payment.lastName) {
              fullName = `${payment.firstName}`
            } else if (!payment.firstName && payment.lastName) {
              fullName = `${payment.lastName}`
            } else {
              fullName = ''
            }
            const profileSrc =
              payment.profileUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${fullName
                .toLowerCase()
                .replace(' ', '-')}.svg`
            return (
              <div style={{ marginTop: '32px' }} key={payment.hash}>
                <div style={{ display: 'flex' }}>
                  <div>
                    <img
                      alt={`${payment.name}-profile`}
                      src={profileSrc}
                      width={100}
                      height={100}
                      style={{ borderRadius: 50, objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginLeft: '16px' }}>
                    <h3> {getDate(payment.timestamp)}</h3>
                    <p>
                      To:{' '}
                      {payment.currency.startsWith('Fiat') ? (
                        payment.firstName ? (
                          `${payment.firstName} ${payment.lastName}`
                        ) : (
                          payment.to
                        )
                      ) : (
                        <a
                          style={{
                            margin: 0,
                            color: '#808080',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                            overflowWrap: 'break-word',
                          }}
                          href={
                            payment.currency.toLowerCase() === 'celo'
                              ? `https://explorer.celo.org/mainnet/tx/${payment.hash}`
                              : `https://explorer.solana.com/tx/${payment.hash}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {payment.firstName
                            ? `${payment.firstName} ${payment.lastName}`
                            : payment.to}
                        </a>
                      )}
                    </p>
                    <p style={{ color: '#67962A' }}>
                      ${formatAmount(payment.amount)}
                    </p>
                    <InfoTag style={{ color: tagColors[payment.currency] }}>
                      {payment.currency}
                    </InfoTag>
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
