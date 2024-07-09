import { Tooltip } from 'react-tooltip'
export const SpacialResolution = ({ siteSize, componentResolution }) => {
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
    textColor = '#FADE7A'
  } else {
    textColor = '#609B7F'
  }

  const bad = `The size of this site is somewhat small (${siteSize} ㎡) relative
to the spatial resolution of this dataset (${componentResolution} m). Results provided should
be considered approximations.`

  const good = `The size of this site (${siteSize} ㎡) is large enough relative
to the spatial resolution of this dataset (${componentResolution} m). The relative
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
    <div>
      <div data-tooltip-id="spacial-resolution">
        <p>Spacial Resolution:</p>
        <p style={{ color: textColor }}>{resolution}</p>
      </div>
      <Tooltip id="spacial-resolution">
        {siteSize / 4 > componentResolution * componentResolution ? good : bad}
      </Tooltip>
    </div>
  )
}
