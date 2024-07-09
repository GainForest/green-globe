import { Tooltip } from 'react-tooltip'
export const SpatialResolution = ({ projectArea, componentResolution }) => {
  let resolution
  if (componentResolution >= 1000) {
    resolution = 'Low'
  } else if (componentResolution >= 100) {
    resolution = 'Medium'
  } else {
    resolution = 'Higher'
  }

  let textColor
  if (resolution == 'Low') {
    textColor = '#CE5F2C'
  } else if (resolution == 'Medium') {
    textColor = '#e3c96b'
  } else {
    textColor = '#609B7F'
  }

  const bad = `The size of this site is somewhat small (${projectArea?.toLocaleString()} ㎡) relative
to the spatial resolution of this dataset (${componentResolution?.toLocaleString()} m). Results provided should
be considered approximations.`

  const good = `The size of this site (${projectArea?.toLocaleString()} ㎡) is large enough relative
to the spatial resolution of this dataset (${componentResolution?.toLocaleString()} m). The relative
size of the site is adequate for spatial analysis using this dataset.`

  // biodiversity = 10,000
  // water table = 1000
  // precipitation, soilPh, aridity = 1000
  // mean temp, global human mod = 1000
  // human population = 250
  // carbon = 500
  // evapotranspiration = 500
  // ndvi = 300
  // tree cover = 30
  // land cover = 10
  // elevation = 90

  return (
    <div
      style={{
        marginTop: '8px',
        marginBottom: '8px',
        backgroundColor: '#f2ede3',
        borderRadius: '8px',
        display: 'inline-block',
        padding: '4px 8px',
      }}
    >
      <div style={{ display: 'flex' }} data-tooltip-id="spatial-resolution">
        <p style={{ fontSize: '.8em' }}>Spatial Resolution:</p>
        <p style={{ color: textColor, marginLeft: '4px', fontSize: '.8em' }}>
          {resolution}
        </p>
      </div>
      {projectArea && (
        <Tooltip style={{ maxWidth: '200px' }} id="spatial-resolution">
          <p style={{ fontSize: '.9em' }}>
            {projectArea / 4 > componentResolution * componentResolution
              ? good
              : bad}
          </p>
        </Tooltip>
      )}
    </div>
  )
}
