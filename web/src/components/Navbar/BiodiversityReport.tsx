import Button from '../Map/components/Button'

const BiodiversityReportButton = () => {
  return (
    <>
      <a href="https://docs.google.com/document/d/1-UA8gvXdK607oqJ0smxbJZJnDNxvcj7o/edit">
        <Button
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '180px',
          }}
          onClick={() => ({})}
        >
          🐾 Biodiversity report 🌳
        </Button>
      </a>
    </>
  )
}

export default BiodiversityReportButton
