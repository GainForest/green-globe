import { useEffect, useState } from 'react'

export const RestorCharts = ({ activeProjectData }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const loadJsonFiles = async (siteName) => {
      const baseURL = `${process.env.AWS_STORAGE}/restor/chartData/${siteName}`
      const jsonFiles = [
        'carbon.json',
        'biodiversity.json',
        'ecoregions_biomes.json',
        'environment.json',
        'water.json',
      ]
      try {
        const dataPromises = jsonFiles.map((file) =>
          fetch(`${baseURL}/${file}`).then((response) => response.json())
        )
        const response = await Promise.all(dataPromises)
        console.log('Loaded response:', response)
        setData(response)
      } catch (error) {
        console.error('Error loading JSON files:', error)
      }
    }

    loadJsonFiles(activeProjectData?.project?.name)
  }, [activeProjectData])

  return <div></div>
}
