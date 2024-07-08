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
          '#471064',
          10,
          '#306D8E',
          20,
          '#219F86',
          30,
          '#68CB5C',
          40,
          '#71CE55',
          50,
          '#FDE724',
        ],
        'fill-opacity': 1,
      },
    })
  }
}
