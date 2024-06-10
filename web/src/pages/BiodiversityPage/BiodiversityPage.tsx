import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component'

import { MetaTags } from '@redwoodjs/web'

const columns = [
  {
    name: 'Time',
    selector: (row) => row.eventDate,
  },
  {
    name: 'Scientific Name',
    selector: (row) => row.scientificName,
    sortable: true,
  },
  {
    name: 'Basis of record',
    selector: (row) => row.basisOfRecord,
    sortable: true,
  },
]

const BiodiversityPage = () => {
  const [observations, setObservations] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(`${process.env.AWS_STORAGE}/observations/semifinals.json`)
  //       .then((response) => response.json())
  //       .then((res) => setObservations(res))
  //   }
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   console.log(observations)
  // }, [observations])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.AWS_STORAGE}/observations/semifinals.json`
      )
      const data = await res.json()

      data.slice(0, 20).forEach(async (row) => {
        const observation = row
        const name = row.scientificName.split(' ').join('%2B')
        const eolRes = await fetch(
          `https://eol.org/api/search/1.0.json?q=${name}&page=1&key=`
        )
        const eolData = await eolRes.json()
        const eolId = eolData.results[0]?.id
        if (eolId) {
          console.log(eolId)
          const eolSpeciesRes = await fetch(
            `https://eol.org/api/pages/1.0/${eolId}.json?details=true&images_per_page=1`
          )
          const eolSpeciesData = await eolSpeciesRes.json()
          console.log(eolSpeciesData?.taxonConcept?.dataObjects[0])
          const mediaLink =
            eolSpeciesData?.taxonConcept?.dataObjects[0]?.mediaURL
          if (mediaLink) {
            observation.image_url = mediaLink
          }
        } else {
          console.log('no id')
        }
        setObservations((observations) => [...observations, observation])
      })
    }
    fetchData()
  }, [])

  return (
    <>
      <MetaTags title="Biodiversity" description="Biodiversity page" />

      <h1>Observations</h1>
      {observations.length &&
        observations.map((row, idx) => (
          <div className="species-button" key={row.scientificName + idx}>
            <img
              alt={row.scientificName}
              src={row.image_url}
              style={{
                objectFit: 'cover',
                clipPath:
                  'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
                height: '120px',
                width: '120px',
                minWidth: '120px',
              }}
            />
          </div>
        ))}

      {/* <DataTable
        columns={columns}
        data={observations}
        highlightOnHover
        pagination
      /> */}
    </>
  )
}

export default BiodiversityPage
