import dayjs from 'dayjs'
import mapboxgl from 'mapbox-gl'

export const generatePlanetSource = (planetDate: string) => ({
  type: 'raster',
  tiles: [
    `https://tiles3.planet.com/basemaps/v1/planet-tiles/planet_medres_visual_${planetDate}_mosaic/gmap/{z}/{x}/{y}.png?api_key=${process.env.NICFI_API_KEY}`,
  ],
  tileSize: 256,
  attribution: `<a target="_top" rel="noopener" href="https://gainforest.earth">Mosaic Date: ${planetDate}</a> | <a target="_top" rel="noopener" href="https://www.planet.com/nicfi/">Imagery ©2023 Planet Labs Inc</a> | <a target="_top" rel="noopener" href="https://gainforest.earth">©2023 GainForest</a>`,
})

export const generatePlanetLayer = (
  planetDate: string,
  visibility: string
) => ({
  id: `planetLayer${planetDate}`,
  type: 'raster',
  source: `planetTile${planetDate}`,
  layout: {
    visibility: visibility,
  },
})

const getPlanetDates = (minDate: dayjs.Dayjs, maxDate: dayjs.Dayjs) => {
  const res = []
  let monthsBetween = maxDate.diff(minDate, 'month')
  while (monthsBetween >= 0) {
    res.push(minDate.format('YYYY-MM'))
    minDate = minDate.add(1, 'month')
    monthsBetween--
  }
  return res
}

export const addHistoricalSatelliteSourceAndLayers = (map: mapboxgl) => {
  const minDate = dayjs('2020-09-01')
  const maxDate = dayjs().subtract(6, 'week').set('date', 1)

  const planetDates = getPlanetDates(minDate, maxDate)
  planetDates.map((planetDate) => {
    if (!map.getSource(`planetTile${planetDate}`)) {
      map.addSource(`planetTile${planetDate}`, generatePlanetSource(planetDate))
    }
  })
  planetDates.map((planetDate) => {
    const visibility = 'none'
    const newPlanetLayer = generatePlanetLayer(planetDate, visibility)
    if (!map.getLayer(`planetLayer${planetDate}`)) {
      map.addLayer(newPlanetLayer)
    }
  })
}
