export const ToggleButton = () => {
  return (
    <div style={{ padding: '0px 10px' }}>
      <button
        style={{
          border: 'none',
          height: '36px',
          width: '140px',
          borderRadius: '0.5em 0 0 0.5em',
          backgroundColor: '#67962A',
          color: '#ffffff',
        }}
      >
        Photos
      </button>
      <button
        style={{
          border: 'none',
          height: '36px',
          width: '140px',
          borderRadius: '0 0.5em 0.5em 0',
          color: '#808080',
        }}
      >
        Videos
      </button>
    </div>
  )
}
