export const cleanEndpoint = (endpoint: string) => {
  return endpoint.replace(
    /\${process\.env\.(AWS_STORAGE|TITILER_ENDPOINT)}(\/)?/g,
    ''
  )
}
