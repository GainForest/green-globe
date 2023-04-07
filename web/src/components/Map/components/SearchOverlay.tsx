const allProjects = [
  'Defensores del Chaco',
  'Kayapo Project',
  'Million Trees Project',
  'Oceanus Conservation',
]

export const SearchOverlay = ({ setActiveProject }) => {
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
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
        placeholder={'Search for projects'}
        list={'gainforest-project-datalist'}
        onChange={(e) => {
          if (allProjects.find((d) => d == e.target.value)) {
            setActiveProject(e.target.value)
          }
        }}
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
      <datalist
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
        id="gainforest-project-datalist"
      >
        <option value="Defensores del Chaco" />
        <option value="Kayapo Project" />
        <option value="Million Trees Project" />
        <option value="Oceanus Conservation" />
      </datalist>
    </>
  )
}
