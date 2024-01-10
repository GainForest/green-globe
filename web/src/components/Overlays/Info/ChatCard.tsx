import { useEffect } from 'react'

import styled from 'styled-components'

import { useAuth } from 'src/auth'

import { InfoBox } from './InfoBox'
export const ChatCard = ({ activeProjectData }) => {
  const { currentUser, signUp } = useAuth()

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

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

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
          <InputBox
            placeholder={
              currentUser
                ? 'type here to ask a question'
                : 'Click here to log in and participate in chat!'
            }
            onClick={!currentUser && signUp}
          />
        </div>
      </div>
    </InfoBox>
  )
}
