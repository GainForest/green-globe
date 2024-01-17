import { useState, useEffect } from 'react'

import styled from 'styled-components'

import { useMutation, useQuery } from '@redwoodjs/web'

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
  color: #000000;
  font-size: 0.875rem;
  background-color: #ffffff;
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
  color: #000000;
  font-size: 0.875rem;
  background-color: #c9c8c7;
  font-family: Karla;
  border-radius: 8px;
`
const getDate = (input) => {
  const dateObj = new Date(input)
  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return dateObj.toLocaleString('en-GB', options)
}

export const ChatCard = ({ activeProjectData }) => {
  const [message, setMessage] = useState({
    text: '',
    sender: null,
    timestamp: null,
  })
  const [messageLog, setMessageLog] = useState([])
  const { isAuthenticated, userMetadata, signUp } = useAuth()

  const SAVE_TO_REDIS_MUTATION = gql`
    mutation saveToRedis($key: String!, $value: String!) {
      saveToRedis(key: $key, value: $value)
    }
  `

  const GET_FROM_REDIS_QUERY = gql`
    query getFromRedis($key: String!) {
      getFromRedis(key: $key)
    }
  `

  const [logChat] = useMutation(SAVE_TO_REDIS_MUTATION)
  const getChat = useQuery(GET_FROM_REDIS_QUERY, {
    variables: { key: userMetadata.email },
  })

  const writeToRedis = (e) => {
    e.preventDefault()
    setMessageLog([...messageLog, message])
    setMessage({ text: '', sender: null, timestamp: null })
    if (message.text.trim() !== '') {
      const id = activeProjectData.project.id
      const now = Date.now()
      const key = `${userMetadata.email}:${now}:${id}`
      logChat({ variables: { key: key, value: message.text } })
    }
  }

  useEffect(() => {
    const getLog = async () => {
      const response = await getChat
      const log = response.data.getFromRedis.map((message) => ({
        sender: 'user',
        timestamp: null,
        text: message,
      }))
      console.log(response)
      setMessageLog([...log])
    }
    if (isAuthenticated) {
      getLog()
    }
  }, [isAuthenticated, userMetadata.email])

  return (
    <InfoBox>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
          margin: '16px 24px',
        }}
      >
        <h2>Chat</h2>

        {/* Message Container */}
        <div
          style={{
            overflowY: 'auto',
            flex: 1,
            marginBottom: '1rem',
          }}
        >
          {messageLog.map((msg) => (
            <div key={msg.timestamp}>
              <div
                className={
                  msg.sender === 'user'
                    ? 'message-outer-right'
                    : 'message-outer-left'
                }
              >
                {msg.timestamp
                  ? `${userMetadata.given_name} ${getDate(msg.timestamp)}`
                  : userMetadata.given_name}
                <div
                  className={
                    msg.sender === 'user'
                      ? 'message-inner-right'
                      : 'message-inner-left'
                  }
                >
                  <div
                    className={
                      msg.sender === 'user'
                        ? 'message-bubble-right'
                        : 'message-bubble-left'
                    }
                  >
                    <p className="message-text">{msg.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
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
                value={message.text}
                onChange={(e) =>
                  setMessage({
                    text: e.target.value,
                    sender: 'user',
                    timestamp: Date.now(),
                  })
                }
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
