import { useEffect, useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

const BiodiversityPage = () => {
  const [observations, setObservations] = useState([])
  const [photoMap, setPhotoMap] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.AWS_STORAGE}/observations/semifinals.json`)
        .then((response) => response.json())
        .then((res) => setObservations(res))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchPhotos = async () => {
      const fetchPhoto = async (row) => {
        const name = encodeURIComponent(row.scientificName)
        const eolRes = await fetch(
          `https://eol.org/api/search/1.0.json?q=${name}&page=1&key=`
        )
        const eolData = await eolRes.json()
        const eolId = eolData.results[0]?.id
        if (eolId) {
          const eolSpeciesRes = await fetch(
            `https://eol.org/api/pages/1.0/${eolId}.json?details=true&images_per_page=1`
          )
          const eolSpeciesData = await eolSpeciesRes.json()
          return eolSpeciesData?.taxonConcept?.dataObjects[0]?.mediaURL || ''
        }
        return ''
      }

      const batchSize = 10
      for (let i = 0; i < observations.length; i += batchSize) {
        const batch = observations.slice(i, i + batchSize)
        const photos = await Promise.all(batch.map((row) => fetchPhoto(row)))
        const newPhotoMap = photos.reduce((map, photo, index) => {
          if (photo) {
            map[batch[index].scientificName] = photo
          }
          return map
        }, {})
        setPhotoMap((prevMap) => ({ ...prevMap, ...newPhotoMap }))
      }
    }

    if (observations.length) {
      fetchPhotos()
    }
  }, [observations])

  const camelCaseToTitleCase = (str) => {
    if (str == 'eDNA') {
      return str
    }
    return str
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase()
      .replace(/\b(\w)/g, (match) => match.toUpperCase())
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-GB')
  }

  return (
    <>
      <MetaTags title="Biodiversity" description="Biodiversity page" />
      <h1 style={{ margin: '32px' }}>Observations</h1>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #ccc',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#333333',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'left',
              }}
            >
              <th
                style={{
                  padding: '16px',
                  width: '220px',
                }}
              >
                Photo
              </th>
              <th>Name</th>
              <th style={{ textAlign: 'center' }}>Time</th>
              <th>Basis of Record</th>
            </tr>
          </thead>
          <tbody>
            {observations.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 ? '#404040' : '#333333',
                  color: '#ffffff',
                  height: '200px',
                }}
              >
                <td
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                    width: '220px',
                  }}
                >
                  {photoMap[row.scientificName] && (
                    <img
                      src={photoMap[row.scientificName]}
                      alt={row.scientificName}
                      style={{ width: '200px', height: '200px' }}
                    />
                  )}
                </td>
                <td style={{ padding: '8px' }}>{row.scientificName}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {formatDate(row.eventDate)}
                </td>
                <td style={{ padding: '8px' }}>
                  {camelCaseToTitleCase(row.basisOfRecord)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BiodiversityPage
