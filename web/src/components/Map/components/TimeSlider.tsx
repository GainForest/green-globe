export const TimeSlider = () => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        width: '500px',
        height: '48px',
        padding: '8px',
        bottom: 40,
        right: 40,
      }}
    >
      <input
        style={{ width: '100%' }}
        min="0"
        max="100"
        step="10"
        type="range"
      ></input>
      Satellite imagery date (Tropical regions only): Feb 2023
    </div>
  )
}
