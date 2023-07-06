import { cellToBoundary } from 'h3-js'
const FEATURE = 'Feature'
const MULTI_POLYGON = 'MultiPolygon'

/**
 * Convert a set of hexagons to a GeoJSON `MultiPolygon` feature with the
 * outlines of each individual hexagon.
 *
 * ![h3SetToMultiPolygonFeature](./doc-files/h3SetToFeatureCollection.png)
 * @static
 * @param  {String[]} hexagons   Hexagon addresses
 * @param  {Object} [properties] Optional feature properties
 * @return {Feature}             GeoJSON Feature object
 */

export const h3SetToMultiPolygonFeature = (hexagons, properties) => {
  const coordinates = hexagons.map((h3Index) =>
    // Wrap in an array for a single-loop polygon
    [cellToBoundary(h3Index)]
  )
  return {
    type: FEATURE,
    properties,
    geometry: {
      type: MULTI_POLYGON,
      coordinates,
    },
  }
}
