export const camelCaseToTitleCase = (input) => {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, function (str) {
      return str.toUpperCase()
    })
}
