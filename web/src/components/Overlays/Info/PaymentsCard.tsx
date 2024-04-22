import { useEffect, useState } from 'react'

import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoTag } from './BiodiversityCard'
import { InfoBox } from './InfoBox'
export const PaymentCard = ({ activeProjectData }) => {
  const [paymentData, setPaymentData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFiatMessage, setShowFiatMessage] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.GAINFOREST_ENDPOINT}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
          transactionsByProjectId(id:"${activeProjectData.project.id}") {
            id
            amount
            to
            hash
            blockchain
            timestamp
            firstName
            lastName
          }
        }
      `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPaymentData(
          result?.data?.transactionsByProjectId
            ?.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .filter((payment) => payment.amount >= 0.01)
        )
        console.log(typeof result.data)
        if (
          result?.data?.transactionsByProjectId?.some((payment) =>
            payment.blockchain.startsWith('Fiat')
          )
        ) {
          {
            setShowFiatMessage(true)
          }
        }
        setLoading(false)
      })
  }, [activeProjectData])

  const getDate = (timeStamp) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const dateObj = new Date(timeStamp)
    return dateObj.toLocaleDateString('en-GB', options)
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
    <div style={{ margin: '24px' }}>
      <div>
        {showFiatMessage && (
          <p style={{ color: '#808080' }}>
            Fiat currencies are displayed in USD
          </p>
        )}
        {paymentData.length > 0 ? (
          paymentData.map((payment) => {
            return (
              <div style={{ marginTop: '32px' }} key={payment.hash}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginLeft: '16px' }}>
                    <h3> {getDate(payment.timestamp)}</h3>
                    <p>
                      To:{' '}
                      {payment.blockchain.startsWith('Fiat') ? (
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
                            payment.blockchain.toLowerCase() === 'celo'
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
                    <p style={{ color: '#67962A' }}>${payment.amount}</p>
                    <InfoTag style={{ color: tagColors[payment.blockchain] }}>
                      {payment.blockchain}
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
