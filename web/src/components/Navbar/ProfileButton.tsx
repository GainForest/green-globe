import { useSelector } from 'react-redux'

import { useAuth } from 'src/auth'

const ProfileButton = ({ onClick }) => {
  const { userMetadata } = useAuth()
  const { given_name, family_name } = userMetadata
  const count = useSelector((state: State) => state.shop.profile)

  return (
    <>
      <p style={{ fontSize: '14px' }}>
        {given_name} {family_name}
      </p>
      <div
        style={{
          height: '25px',
          width: '20px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
      </div>
      <div
        style={{
          borderRadius: '50%',
          height: '16px',
          width: '16px',
          position: 'absolute',
          right: '34px',
          top: '8px',
          backgroundColor: '#F6A000',
          color: '#ffffff',
          fontSize: '10px',
          textAlign: 'center',
          paddingTop: '2px',
        }}
      >
        {count}
      </div>
    </>
  )
}

export default ProfileButton
