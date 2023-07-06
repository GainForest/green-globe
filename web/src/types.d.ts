interface State {
  shop: {
    basket: number
  }
  overlays: {
    info: number | undefined // The tab number displayed
    basket: boolean
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
