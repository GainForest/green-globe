import dayjs from 'dayjs'

export const getDateOfMeasurement = (tree) => {
  if (tree?.dateOfMeasurement) {
    return tree?.dateOfMeasurement
  } else if (tree?.datePlanted) {
    return dayjs(tree?.datePlanted).format('DD/MM/YYYY')
  } else if (tree?.dateMeasured) {
    return dayjs(tree?.dateMeasured).format('DD/MM/YYYY')
  } else if (tree['FCD-tree_records-tree_time']) {
    return dayjs(tree['FCD-tree_records-tree_time'], 'DD/MM/YY HH:mm').format(
      'DD/MM/YYYY'
    )
  } else {
    return 'unknown'
  }
}

export const getTreeDBH = (tree) => {
  if (tree?.DBH) {
    // iNaturalist API
    return `${tree?.DBH}cm`
  } else if (tree?.diameter) {
    // kobo API
    return `${tree?.diameter}cm`
  } else {
    return 'unknown'
  }
}

export const getTreeHeight = (tree) => {
  if (tree?.Height) {
    // iNaturalist API
    return `${tree?.Height}m`
  } else if (tree?.height) {
    return `${tree?.height}m`
  } else {
    return 'unknown'
  }
}

export const getTreePhoto = (tree, activeProject: string, treeID: string) => {
  if (tree?.tree_photo) {
    return tree?.tree_photo
  } else if (tree?.koboUrl) {
    // kobo api
    return tree?.koboUrl
  } else if (
    activeProject ==
    '40367dfcbafa0a8d1fa26ff481d6b2609536c0e14719f8e88060a9aee8c8ab0a'
  ) {
    return `${process.env.AWS_STORAGE}/trees-measured/${treeID}.jpg`
  } else {
    return `${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png`
  }
}

export const getSpeciesName = (tree) => {
  const upperCaseEveryWord = (name: string) =>
    name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

  if (tree?.Plant_Name) {
    return upperCaseEveryWord(tree?.Plant_Name)
  } else if (tree?.species) {
    return tree?.species
  } else {
    return 'unknown'
  }
}
