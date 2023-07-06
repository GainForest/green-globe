interface State {
  shop: {
    basket: number
  }
}

// Not the complete interface

interface Asset {
  id: string
  name: string
  uploadedById: number
  lastUpdatedById?: number
  projectId?: number
  classification: string
  ipfsCID: string
  description?: string
  type: string
  extension?: string
  geoInformation?: any //not sure about this one
  awsCID?: string
  isArchived: boolean
  shapefile: {
    default: boolean
    shortName
  }
}
