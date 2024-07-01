export const offlineBasemapStyle = {
  version: 8,
  sources: {
    countries: {
      type: 'vector',
      tiles: [`${process.env.AWS_STORAGE}/basemap/countries/{z}/{x}/{y}.pbf`],
      maxzoom: 6,
    },
  },
  glyphs: `${process.env.AWS_STORAGE}/basemap/font/{fontstack}/{range}.pbf`,
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#2c2c2c', // Dark background for contrast
      },
    },
    {
      id: 'country-fill',
      type: 'fill',
      source: 'countries',
      'source-layer': 'country',
      paint: {
        'fill-color': [
          'case',
          ['==', ['get', 'ADM0_A3'], 'BRA'],
          '#d6d1c4', // Subtle highlight for Brazil
          '#f2ede3'  // Default color for other countries
        ],
        'fill-opacity': 1, // Full opacity to prevent any gaps
      },
    },
    {
      id: 'country-pattern',
      type: 'fill',
      source: 'countries',
      'source-layer': 'country',
      paint: {
        'fill-pattern': 'dot',
        'fill-opacity': 0.03, // Very subtle texture
      },
    },
  ],
}
