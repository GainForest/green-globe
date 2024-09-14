import { GeospatialLayer } from 'src/types'

export const cleanEndpoint = (layer: GeospatialLayer) => {
  const endpoint = layer.endpoint
  return endpoint.replace(
    /\${process\.env\.(AWS_STORAGE|TITILER_ENDPOINT)}(\/)?/g,
    ''
  )
}
