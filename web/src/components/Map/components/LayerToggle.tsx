const LayerToggle = ({ setExpand }) => {
  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        width: '60px',
        height: '60px',
        position: 'absolute',
        bottom: 56,
        right: 20,
        borderRadius: '8px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'block' }}>
        <button
          onClick={() => setExpand((expand) => !expand)}
          style={{
            width: '60px',
            height: '60px',
            background: `url(/satellite.png) no-repeat center center`,
            border: 'none',
            padding: 0,
            color: 'white',
            fontSize: '12px',
            textShadow:
              '1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black',
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: '4px',
          }}
        >
          <img
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '4px',
              objectFit: 'cover',
              backgroundSize: 'cover',
            }}
            src="/satellite.png"
            alt="layers"
          />
          Layers
        </button>
      </div>
    </div>
  )
}
export default LayerToggle
