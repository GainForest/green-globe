import { getTreePhotos } from 'src/components/Map/maptreeutils'
import { toTitleCase } from 'src/utils/toTitleCase'
import { stringDistance } from 'src/utils/typoCheck'

export const processBiodiversityData = (b) => {
  const threatened = b.species.filter(
    (d) =>
      d.redlist === 'CR' ||
      d.redlist === 'EN' ||
      d.redlist === 'VU' ||
      d.redlist === 'EW'
  )
  const numThreatened = threatened.length
  const lowRisk = b.species.filter(
    (d) => d.redlist === 'CD' || d.redlist === 'NT' || d.redlist === 'LC'
  )
  const numLowRisk = lowRisk.length
  const numExtinct = b.species.filter((d) => d.redlist == 'EX').length
  const dataDeficient = b.species.filter(
    (d) => d.redlist === 'DD' || !d.redlist
  )
  const numDataDeficient = dataDeficient.length
  const total = b.species.length
  const threatenedPercentage = (numThreatened + numExtinct) / total
  const lowRiskPercentage = numLowRisk / total
  const dataDeficientPercentage = numDataDeficient / total
  return {
    ...b,
    numExtinct,
    lowRisk,
    numLowRisk,
    dataDeficient,
    numDataDeficient,
    threatened,
    numThreatened,
    threatenedPercentage,
    lowRiskPercentage,
    dataDeficientPercentage,
  }
}

export const fetchTreePlantings = (
  treePlantingsEndpoint: string,
  project,
  measuredData,
  setMeasuredData,
  setLoading
) => {
  fetch(`${process.env.AWS_STORAGE}/shapefiles/${treePlantingsEndpoint}`)
    .then((response) => response.json())
    .then((json) => {
      const speciesCount = {}
      let total = 0
      const similarityThreshold = 3
      json.features.map((tree) => {
        let species = tree.properties.species || tree.properties.Plant_Name
        if (species) {
          species = species.trim()
          species = toTitleCase(species)

          let isSimilar = false
          Object.keys(speciesCount).forEach((existingSpecies) => {
            const distance = stringDistance(species, existingSpecies)
            if (distance <= similarityThreshold) {
              isSimilar = true
              species = existingSpecies
            }
          })

          if (!isSimilar) {
            const treeID =
              tree?.properties['FCD-tree_records-tree_photo']?.split(
                '?id='
              )?.[1] ||
              tree?.ID ||
              'unknown'

            const photo = getTreePhotos(tree.properties, project.id, treeID)
            const imageUrl = photo[0]

            speciesCount[species] = {
              name: species,
              count: 1,
              imageUrl,
              tallest: parseFloat(
                tree.properties.height || tree.properties.Height
              ),
              shortest: parseFloat(
                tree.properties.height || tree.properties.Height
              ),
              average: parseFloat(
                tree.properties.height || tree.properties.Height
              ),
            }
          } else {
            const currObj = speciesCount[species]
            speciesCount[species] = {
              ...currObj,
              count: currObj.count + 1,
              tallest: Math.max(
                currObj.tallest,
                parseFloat(tree.properties.height || tree.properties.Height)
              ),
              shortest: Math.min(
                currObj.shortest,
                parseFloat(tree.properties.height || tree.properties.Height)
              ),
              average:
                parseFloat(tree.properties.height || tree.properties.Height) +
                currObj.average,
            }
          }
        } else {
          if ('Unknown' in speciesCount) {
            speciesCount['Unknown'].count += 1
          } else {
            speciesCount['Unknown'] = {
              name: 'Unknown',
              count: 1,
            }
          }
        }
        total += 1
      })

      const speciesArray = Object.keys(speciesCount)
        .sort()
        .map((species) => ({
          ...speciesCount[species],
          average:
            // round to two decimals
            Math.round(
              (speciesCount[species].average / speciesCount[species].count) *
                100
            ) / 100,
        }))
      setMeasuredData([
        ...measuredData,
        { title: 'Trees', species: speciesArray, total },
      ])
      setLoading(false)
    })
    .catch((e) => {
      console.log(e)
      setLoading(false)
    })
}
