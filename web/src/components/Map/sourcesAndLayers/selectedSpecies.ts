import mapboxgl from 'mapbox-gl'

export const toggleSelectedSpecies = (
  map: mapboxgl.Mapbox,
  selectedSpecies
) => {
  let colorExpression
  let radiusExpression
  if (selectedSpecies) {
    colorExpression = [
      'case',
      [
        'all',
        ['==', ['get', 'species'], selectedSpecies],
        ['boolean', ['feature-state', 'hover'], false],
      ],
      'red', // when isSelectedSpecies && hover
      ['==', ['get', 'species'], selectedSpecies],
      '#FF8101', // when isSelectedSpecies && !hover
      ['boolean', ['feature-state', 'hover'], false],
      'gray', // when !isSelectedSpecies && hover
      'gray', // when !isSelectedSpecies && !hover
    ]
    radiusExpression = [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      8, // when hover (either isSelectedSpecies or not)
      ['==', ['get', 'species'], selectedSpecies],
      6, // when isSelectedSpecies && !hover
      3, // when !isSelectedSpecies && !hover
    ]
  } else {
    colorExpression = [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#0883fe', // when no selectedSpecies && hover
      '#ff77c1', // when no selectedSpecies && !hover
    ]
    radiusExpression = [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      8, // when no selectedSpecies && hover
      4, // when no selectedSpecies && !hover
    ]
  }

  map.setPaintProperty('unclusteredTrees', 'circle-color', colorExpression)
  map.setPaintProperty('unclusteredTrees', 'circle-radius', radiusExpression)
}
