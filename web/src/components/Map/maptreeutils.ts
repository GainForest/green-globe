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
  } else if (tree?.photo) {
    // kobo api
    return tree?.photo
  } else if (
    activeProject ==
    '40367dfcbafa0a8d1fa26ff481d6b2609536c0e14719f8e88060a9aee8c8ab0a'
  ) {
    return `${process.env.AWS_STORAGE}/trees-measured/${treeID}.jpg`
  } else {
    return `${process.env.AWS_STORAGE}/miscellaneous/placeholders/taxa_plants.png`
  }
}