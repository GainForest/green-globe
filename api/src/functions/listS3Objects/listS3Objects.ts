import { s3 } from 'src/lib/awsConfig'

export const handler = async (event) => {
  const projectName = event.queryStringParameters.projectName
  const folder = event.queryStringParameters.folder
  const params = {
    Bucket: 'xprize-finals',
    Prefix: `${folder}/${projectName}/`,
  }

  try {
    const data = await s3.listObjectsV2(params).promise()
    const removeFilePath = (input) => {
      const parts = input.split('/')

      if (parts.length > 2) {
        const resultParts = parts.slice(2)

        return resultParts.join('/')
      } else {
        return input
      }
    }
    const filenames = data.Contents.map((file) => removeFilePath(file.Key))
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filenames),
    }
  } catch (err) {
    console.error('S3 ListObjects Error:', err)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
