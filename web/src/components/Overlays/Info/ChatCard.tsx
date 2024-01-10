import { useState } from 'react'

import styled from 'styled-components'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { InfoBox } from './InfoBox'

const InputBox = styled.input<{ theme }>`
  z-index: 2;
  border: none;
  height: 40px;
  width: 300px;
  padding: 8px 12px;
  top: 6px;
  left: 140px;
  color: #ffffff;
  font-size: 0.875rem;
  background-color: #c9c8c7;
  font-family: Karla;
  border-radius: 8px;
`
const SignupButton = styled.button<{ theme }>`
  z-index: 2;
  border: none;
  height: 40px;
  width: 300px;
  padding: 8px 12px;
  top: 6px;
  left: 140px;
  color: #ffffff;
  font-size: 0.875rem;
  background-color: #c9c8c7;
  font-family: Karla;
  border-radius: 8px;
`

export const ChatCard = ({ activeProjectData }) => {
  const [message, setMessage] = useState('')
  const { isAuthenticated, userMetadata, signUp } = useAuth()

  const SAVE_TO_REDIS_MUTATION = gql`
    mutation saveToRedis($key: String!, $value: String!) {
      saveToRedis(key: $key, value: $value)
    }
  `

  const [logChat] = useMutation(SAVE_TO_REDIS_MUTATION)

  const writeToRedis = (e) => {
    e.preventDefault()
    if (message.trim() !== '') {
      const id = activeProjectData.project.id
      const now = Date.now()
      const key = `${id}:${now}:${userMetadata.email}`
      logChat({ variables: { key: key, value: message } })
    }
  }

  return (
    <InfoBox>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '90%',
          margin: '16px 24px',
        }}
      >
        <h2>Chat</h2>
        <div style={{ width: '100%', height: '12px' }} />
        <div style={{ height: '24px', width: '100%' }} />
        <div
          style={{
            position: 'relative',
            alignSelf: 'center',
            width: '100%',
          }}
        >
          {isAuthenticated ? (
            <form onSubmit={writeToRedis}>
              <InputBox
                onChange={(e) => setMessage(e.target.value)}
                placeholder={'type here to ask a question'}
              />
            </form>
          ) : (
            <SignupButton onClick={signUp}>
              Click here to log in and participate in chat
            </SignupButton>
          )}
        </div>
      </div>
    </InfoBox>
  )
}
