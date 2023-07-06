export const BackToGlobe = ({map}) => {
  return (
    <button
      style={{
        borderRadius: '0.5em',
        width: '44px',
        height: '44px',
        zIndex: '2',
        position: 'absolute',
        top: '10px',
        right: '48px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        border: 'none',
      }}
      onClick={() => map.set}
    >
      <span
        className="material-icons-round"
        style={{
          fontSize: '24px',
          color: '#000000',
          lineHeight: '44px',
        }}
      >
        public
      </span>
    </button>
  )
}
