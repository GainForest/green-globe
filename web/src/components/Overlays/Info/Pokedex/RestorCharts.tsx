import { useEffect, useState } from 'react'

import { CarbonChart, ProductivityChart } from './CarbonChart'

export const RestorCharts = ({ activeProjectData }) => {
  type restorData = {
    carbon: object
    biodiversity: object
    ecoregionsBiomes: object
    environment: object
    water: object
  }
  const [allData, setAllData] = useState<restorData>({
    carbon: {},
    biodiversity: {},
    ecoregionsBiomes: {},
    environment: {},
    water: {},
  })

  useEffect(() => {
    console.log(allData.carbon)
  }, [allData.carbon])

  useEffect(() => {
    const loadJsonFiles = async (siteName) => {
      const formattedName = siteName.replace(/ /g, '-')
      const baseURL = `${process.env.AWS_STORAGE}/restor/chartData/${formattedName}`
      const jsonFiles = {
        carbon: 'carbon.json',
        biodiversity: 'biodiversity.json',
        ecoregionsBiomes: 'ecoregions_biomes.json',
        environment: 'environment.json',
        water: 'water.json',
      }
      try {
        const dataPromises = Object.entries(jsonFiles).map(([key, file]) =>
          fetch(`${baseURL}/${file}`).then((response) =>
            response.json().then((data) => ({ [key]: data[key] }))
          )
        )
        const responses = await Promise.all(dataPromises)
        const combinedData = responses.reduce(
          (acc, data) => ({ ...acc, ...data }),
          {}
        )
        setAllData(combinedData)
      } catch (error) {
        console.error('Error loading JSON files:', error)
      }
    }

    loadJsonFiles(activeProjectData?.project?.name)
  }, [activeProjectData])
  return (
    <div>
      <CarbonChart carbonData={allData?.carbon} />
      <ProductivityChart carbonData={allData?.carbon} />
    </div>
  )
}
