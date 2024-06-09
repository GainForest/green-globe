import { useEffect, useState } from 'react'

import useAxios from 'axios-hooks'

import { CELO_EAS_SCAN_API } from 'src/utils/apiUrls'

import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoTag } from './BiodiversityCard/InfoTag'
import { InfoBox } from './InfoBox'

export const PaymentCard = ({ activeProjectData }) => {
  const [paymentData, setPaymentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFiatMessage, setShowFiatMessage] = useState(false)
  const wallets = JSON.parse(process.env.GAINFOREST_WALLETS)

  const [
    { data: attestationData, loading: attestationDataLoading },
    attestationDataCall,
  ] = useAxios(
    {
      url: CELO_EAS_SCAN_API,
      method: 'post',
    },
    { manual: true }
  )

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

  const fetchAttestations = async (recipient: string) => {
    const celoMessageRes = await attestationDataCall({
      data: {
        query: `{
          attestations(where: {recipient:{equals:"${recipient}"}}) {
            id
            decodedDataJson
        }
      }`,
      },
    })
    return celoMessageRes.data.data.attestations
  }

  const fetchCeloPayments = async (recipients, memberMap) => {
    const payments = []
    const recipientAttestationData = []

    for (let i = 0; i < recipients.length; i++) {
      const recipientId = recipients[i]
      const attestationsArr = await fetchAttestations(recipientId)

      attestationsArr.forEach((ele) => {
        const tempArr = JSON.parse(ele.decodedDataJson)

        const messageObj = tempArr.find((e) => e.name === 'message')
        const transactionObj = tempArr.find((e) => e.name === 'transactionId')

        recipientAttestationData.push({
          recipientId,
          message: messageObj?.value?.value,
          transactionId: transactionObj?.value?.value,
          uid: ele.id,
        })
      })
    }

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
          timestamp: transaction.timeStamp,
          firstName: memberMap[currentRecipientId]['firstName'],
          lastName: memberMap[currentRecipientId]['lastName'],
          profileUrl: memberMap[currentRecipientId]['profileUrl'],
          amount: transaction.value / 1e18,
          currency: 'Celo',
          hash: transaction.hash,
          message: attestation ? attestation.message : undefined,
          attestationUid: attestation ? attestation.uid : undefined,
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

  const formatDate = (timeStamp) => {
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
                    <h3> {formatDate(payment.timestamp)}</h3>
                    <p style={{ display: 'flex' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <InfoTag style={{ color: tagColors[payment.currency] }}>
                        {payment.currency}
                      </InfoTag>
                      <a
                        href={`https://celo.easscan.org/attestation/view/${payment.attestationUid}`}
                      >
                        <span
                          style={{
                            color: '#808080',
                            fontSize: '12px',
                            marginLeft: '8px',
                          }}
                        >
                          {payment?.message ? `(${payment?.message})` : ''}
                        </span>
                      </a>
                    </div>
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
