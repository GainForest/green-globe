import { useEffect, useState } from 'react'

import ThemedSkeleton from '../../Map/components/Skeleton'

import { InfoBox } from './InfoBox'
export const PaymentCard = ({ activeProjectData }) => {
  const dummyData = {
    message: 'OK',
    result: [
      {
        value: '969798115140192',
        blockHash:
          '0x94079e6671606b8dd93c427cb1ada54bec5edd19d668d75e98de769a2aa8feea',
        blockNumber: '21252221',
        confirmations: '2074104',
        contractAddress: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
        cumulativeGasUsed: '638663',
        from: '0xbf8480fc387b72892ca28f4e9f07f95ed5672b3f',
        gas: '162637',
        gasPrice: '10039816835',
        gasUsed: '120744',
        hash: '0xf31043bc9b73b2107c91f1c603142a824a0d43f5d1151cc90b1ebef8e2d5bfc4',
        input:
          '0xac16dbd8000000000000000000000000bf8480fc387b72892ca28f4e9f07f95ed5672b3f00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000d8763cba276a3738e6de85b4b3bf5fded6d6ca73000000000000000000000000000000000000000000000000009da39ef9af8665000000000000000000000000000000000000000000000000000000000000001bf3c22b4d4ecf9927b5d5d0f3e32bfcf49be85e587e9e62676f7c5f1954d4905c78b6af01aa0da8666d0306b7ff111514705113564b38eee6e4eb3942ea37bdc700000000000000000000000000000000000000000000000000000000000000503078626239653238323038636364313130636462363637343137653361653062326562653338653831616132623432643730636238323935623765626137313535612d3230373339352d32303836303500000000000000000000000000000000',
        logIndex: '20',
        nonce: '83',
        timeStamp: '1693929591',
        to: '0x6af4da1576bbeaf1a7a2ae695c508dab93510ff4',
        tokenDecimal: '18',
        tokenName: 'Celo Euro',
        tokenSymbol: 'cEUR',
        transactionIndex: '5',
      },
      {
        value: '242449528785048',
        blockHash:
          '0x94079e6671606b8dd93c427cb1ada54bec5edd19d668d75e98de769a2aa8feea',
        blockNumber: '21252221',
        confirmations: '2074104',
        contractAddress: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
        cumulativeGasUsed: '638663',
        from: '0xbf8480fc387b72892ca28f4e9f07f95ed5672b3f',
        gas: '162637',
        gasPrice: '10039816835',
        gasUsed: '120744',
        hash: '0xf31043bc9b73b2107c91f1c603142a824a0d43f5d1151cc90b1ebef8e2d5bfc4',
        input:
          '0xac16dbd8000000000000000000000000bf8480fc387b72892ca28f4e9f07f95ed5672b3f00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000d8763cba276a3738e6de85b4b3bf5fded6d6ca73000000000000000000000000000000000000000000000000009da39ef9af8665000000000000000000000000000000000000000000000000000000000000001bf3c22b4d4ecf9927b5d5d0f3e32bfcf49be85e587e9e62676f7c5f1954d4905c78b6af01aa0da8666d0306b7ff111514705113564b38eee6e4eb3942ea37bdc700000000000000000000000000000000000000000000000000000000000000503078626239653238323038636364313130636462363637343137653361653062326562653338653831616132623432643730636238323935623765626137313535612d3230373339352d32303836303500000000000000000000000000000000',
        logIndex: '19',
        nonce: '83',
        timeStamp: '1693929591',
        to: '0xd533ca259b330c7a88f74e000a3faea2d63b7972',
        tokenDecimal: '18',
        tokenName: 'Celo Euro',
        tokenSymbol: 'cEUR',
        transactionIndex: '5',
      },
      {
        value: '44371474532763237',
        blockHash:
          '0x94079e6671606b8dd93c427cb1ada54bec5edd19d668d75e98de769a2aa8feea',
        blockNumber: '21252221',
        confirmations: '2074104',
        contractAddress: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
        cumulativeGasUsed: '638663',
        from: '0x530cf57b70c22c0437bd77adebd79fe58c42dc2a',
        gas: '162637',
        gasPrice: '10039816835',
        gasUsed: '120744',
        hash: '0xf31043bc9b73b2107c91f1c603142a824a0d43f5d1151cc90b1ebef8e2d5bfc4',
        input:
          '0xac16dbd8000000000000000000000000bf8480fc387b72892ca28f4e9f07f95ed5672b3f00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000d8763cba276a3738e6de85b4b3bf5fded6d6ca73000000000000000000000000000000000000000000000000009da39ef9af8665000000000000000000000000000000000000000000000000000000000000001bf3c22b4d4ecf9927b5d5d0f3e32bfcf49be85e587e9e62676f7c5f1954d4905c78b6af01aa0da8666d0306b7ff111514705113564b38eee6e4eb3942ea37bdc700000000000000000000000000000000000000000000000000000000000000503078626239653238323038636364313130636462363637343137653361653062326562653338653831616132623432643730636238323935623765626137313535612d3230373339352d32303836303500000000000000000000000000000000',
        logIndex: '17',
        nonce: '83',
        timeStamp: '1693929591',
        to: '0xbf8480fc387b72892ca28f4e9f07f95ed5672b3f',
        tokenDecimal: '18',
        tokenName: 'Celo Euro',
        tokenSymbol: 'cEUR',
        transactionIndex: '5',
      },
    ],
  }

  const [paymentData, setPaymentData] = useState([])

  useEffect(() => {
    const addresses = activeProjectData?.project?.CommunityMember.map(
      (member) => member?.Wallet?.CeloAccount
    )
    if (addresses) {
      fetch(
        'https://explorer.celo.org/mainnet/api?module=account&action=tokentx&address=0xBF8480fc387b72892Ca28F4e9F07F95ed5672b3f'
      )
        .then((res) => res.json())
        .then((data) => {
          const transactions = data['result'].filter((transaction) =>
            addresses.includes(transaction.to)
          )
          if (transactions.length > 0) {
            setPaymentData(transactions)
          }
          // else {
          //   setPaymentData(dummyData.result)
          // }
        })
    }
  })

  const getBlockDate = (blockNumber) => {
    const genesisDate = new Date('2020-04-22T16:00:00.000Z')
    const blockTime = 5
    const blockDate = new Date(
      genesisDate.getTime() + blockNumber * blockTime * 1000
    )
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
          {paymentData.map((payment) => {
            return (
              <div style={{ marginTop: '32px' }} key={payment.blockHash}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginLeft: '16px' }}>
                    <h3> {getBlockDate(payment.blockNumber)}</h3>
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
                        href={`https://explorer.celo.org/mainnet/address/${payment.contractAddress}`}
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
          })}
        </div>
      </div>
    </InfoBox>
  )
}
