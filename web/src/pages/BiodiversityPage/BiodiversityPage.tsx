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
]

const BiodiversityPage = () => {
  const [observations, setObservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.AWS_STORAGE}/observations/semifinals.json`)
        .then((response) => response.json())
        .then((res) => setObservations(res))
    }
    fetchData()
  }, [])

  return (
    <>
      <MetaTags title="Biodiversity" description="Biodiversity page" />

      <h1>Species Richness</h1>
      <DataTable
        columns={columns}
        data={observations}
        highlightOnHover
        pagination
      />
    </>
  )
}

export default BiodiversityPage
