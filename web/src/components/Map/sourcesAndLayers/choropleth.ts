import mapboxgl from 'mapbox-gl'

export const addChoroplethSourceAndLayers = (map: mapboxgl.Map) => {
  if (!map.getSource('choropleth'))
    map.addSource('choropleth', {
      type: 'geojson',
      data: `${process.env.AWS_STORAGE}/layers/species_richness/example-project.geojson`,
    })

  if (!map.getLayer('choropleth')) {
    map.addLayer({
      id: 'choropleth',
      type: 'fill',
      source: 'choropleth',
      layout: {},
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'species_richness'],
          0,
          '#feedde',
          10,
          '#fdd0a2',
          20,
          '#fdae6b',
          30,
          '#fd8d3c',
          40,
          '#e6550d',
          50,
          '#a63603',
        ],
        'fill-opacity': 0.8,
      },
    })
  }
}
