import { useState, useEffect, useRef } from 'react'

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
  margin-left: 8px;
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
  :hover {
    background-color: #e9f5da;
  }
  font-family: Karla;
  border-radius: 8px;
  cursor: pointer;
`
const getDate = (input) => {
  const dateObj = new Date(input)
  const options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return dateObj.toLocaleString('en-GB', options)
}

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export const ChatCard = ({ activeProjectData, mediaSize, maximize }) => {
  const [messageLog, setMessageLog] = useState([])
  const { isAuthenticated, userMetadata, signUp } = useAuth()
  const [message, setMessage] = useState({
    text: '',
    sender: userMetadata?.email,
    timestamp: null,
  })
  const [hoveredId, setHoveredId] = useState<string>('')
  const [showPopup, setShowPopup] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [messageLog])

  const popupRef = useRef(null)
  useOutsideClick(popupRef, () => setShowPopup(false))

  const SAVE_TO_REDIS_MUTATION = gql`
    mutation saveToRedis($key: String!, $value: String!) {
      saveToRedis(key: $key, value: $value)
    }
  `

  const DELETE_FROM_REDIS_MUTATION = gql`
    mutation deleteFromRedis($key: String!) {
      deleteFromRedis(key: $key)
    }
  `

  const GET_FROM_REDIS_QUERY = gql`
    query getFromRedis($key: String!) {
      getFromRedis(key: $key) {
        timestamp
        email
        message
      }
    }
  `
  const [deleteChat] = useMutation(DELETE_FROM_REDIS_MUTATION)
  const [logChat] = useMutation(SAVE_TO_REDIS_MUTATION)
  const getChat = useQuery(GET_FROM_REDIS_QUERY, {
    variables: { key: activeProjectData?.project?.id },
  })

  const deleteMessage = (message) => {
    const id = activeProjectData.project.id
    const key = `${id}:${message.timestamp}:${userMetadata.email}`
    deleteChat({ variables: { key: key } })
    setMessageLog((messageLog) =>
      messageLog.filter((msg) => msg.timestamp !== message.timestamp)
    )
  }

  const writeToRedis = (e) => {
    e.preventDefault()
    setMessageLog([...messageLog, message])
    setMessage({ text: '', sender: userMetadata.email, timestamp: null })
    if (message.text.trim() !== '') {
      const id = activeProjectData.project.id
      const now = Date.now()
      const key = `${id}:${now}:${userMetadata.email}`
      console.log(key)
      logChat({ variables: { key: key, value: message.text } })
    }
  }

  useEffect(() => {
    const getLog = async () => {
      if (isAuthenticated) {
        try {
          const response = await getChat
          if (response.data && !response.loading) {
            setMessageLog(
              [...response.data.getFromRedis]
                .sort((a, b) => {
                  return parseInt(a.timestamp) - parseInt(b.timestamp)
                })
                .map((msg) => {
                  return {
                    timestamp: parseInt(msg.timestamp),
                    sender: msg.email,
                    text: msg.message,
                  }
                })
            )
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    getLog()
  }, [isAuthenticated, userMetadata?.email, getChat])

  return (
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
          margin: '0 0 16px 24px',
        }}
      >
        <h1>Chat</h1>

        {/* Message Container */}
        <div
          style={{
            overflowY: 'auto',
            flex: 1,
            margin: '1rem 0',
            padding: '.5rem 0',
          }}
        >
          {messageLog.map((msg) => (
            <div key={msg.timestamp} style={{ width: '100%' }}>
              <div
                className={
                  msg.sender !== 'Peggy'
                    ? 'message-outer-right'
                    : 'message-outer-left'
                }
              >
                {`${getDate(msg.timestamp)} ${msg.sender}`}
                <div
                  onMouseEnter={() => setHoveredId(msg.timestamp)}
                  onMouseLeave={() => {
                    setHoveredId(null)
                    setShowPopup(false)
                  }}
                  className={
                    msg.sender !== 'Peggy'
                      ? 'message-inner-right'
                      : 'message-inner-left'
                  }
                >
                  <div
                    className={
                      msg.sender !== 'Peggy'
                        ? 'message-bubble-right'
                        : 'message-bubble-left'
                    }
                  >
                    <p className="message-text">{msg.text}</p>
                  </div>
                  {msg.timestamp === hoveredId && (
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowPopup((showPopup) => !showPopup)
                        }}
                        style={{ background: 'transparent', border: 'none' }}
                      >
                        <img
                          alt="menu"
                          style={{
                            paddingTop: '10px',
                            height: '40px',
                            width: 'auto',
                          }}
                          src="/menu.png"
                        />
                      </button>

                      {showPopup && (
                        <div
                          ref={popupRef}
                          style={{
                            position: 'absolute',
                            right: 0,
                            backgroundColor: 'white',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '8px',
                          }}
                        >
                          <button
                            className="chat-menu-button"
                            onClick={() => {
                              navigator.clipboard.writeText(msg.text)
                              setShowPopup(false)
                            }}
                          >
                            Copy Text
                          </button>
                          <button
                            className="chat-menu-button"
                            onClick={() => {
                              deleteMessage(msg)
                              setShowPopup(false)
                            }}
                          >
                            Delete Message
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Box */}
        <div
          style={{
            position: 'relative',
            alignSelf: 'center',
            width: '100%',
            height: '0',
          }}
        >
          {isAuthenticated ? (
            <form onSubmit={writeToRedis}>
              <InputBox
                style={{ width: '95%', marginLeft: '0' }}
                value={message.text}
                onChange={(e) =>
                  setMessage({
                    text: e.target.value,
                    sender: userMetadata.email,
                    timestamp: Date.now(),
                  })
                }
                placeholder={'Type here to ask a question'}
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
