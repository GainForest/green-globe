export const SearchOverlay = () => {
  return (
    <>
      <input
        style={{
          zIndex: 2,
          border: 'none',
          height: '24px',
          width: '300px',
          position: 'absolute',
          padding: '8px 12px',
          top: 8,
          left: 8,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'Karla',
        }}
        placeholder={'Search for projects'}
      />
      <span
        className="material-icons-round"
        style={{
          zIndex: 3,
          fontSize: '18px',
          lineHeight: '18px',
          position: 'absolute',
          top: 20,
          left: 304,
          color: '#5F6369',
        }}
      >
        search
      </span>
    </>
  )
}
