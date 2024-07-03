import useAxios from 'axios-hooks'
import dayjs from 'dayjs'

import { CELO_EAS_SCAN_API } from 'src/utils/apiUrls'

import { InfoTag } from '../../InfoTag/InfoTag'
import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoBox } from './InfoBox'

export const PaymentCard = ({ activeProjectData, paymentData, loading }) => {
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
                    <h3> {dayjs(payment.timestamp).format('D MMMM YYYY')}</h3>
                    <p style={{ display: 'flex' }}>
                      {'To: '}
                      {payment.blockchain == 'FIAT' ? (
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
                            ? ` ${payment.firstName} ${payment.lastName}`
                            : ` ${payment.to}`}
                        </a>
                      )}
                    </p>
                    <p style={{ color: '#669629' }}>
                      {payment.currency} {formatAmount(payment.amount)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <InfoTag style={{ color: tagColors[payment.currency] }}>
                        {payment.blockchain}
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
