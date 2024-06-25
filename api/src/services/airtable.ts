import Airtable from 'airtable'
const base = new Airtable({
  apiKey: process.env.AIRTABLE_TRANSACTIONS_TOKEN,
}).base('appekZyMlwje7377w')

export const createNewEntry = async ({ id }) => {
  return new Promise((resolve, reject) => {
    base('Samples').create(
      [{ fields: { 'Sample ID': id } }],
      function (err, records) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          const record = records[0]
          resolve({ id: record.getId() })
        }
      }
    )
  })
}

export const findEntry = async (orgName) => {
  const encodedFormula = encodeURIComponent(`{orgName} = '${orgName}'`)

  const url = `https://api.airtable.com/v0/appekZyMlwje7377w/Fiat%20Transactions?filterByFormula=${encodedFormula}`

  const res = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + process.env.AIRTABLE_TRANSACTIONS_TOKEN,
    },
  })
  const data = await res.json()
  console.log(data)
  if (data.records.length === 0) {
    return null
  }
  const fields = data.records.map((record) => record.fields)

  return fields
}
