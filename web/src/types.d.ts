import { LegendName } from './components/Map/legends/legendMap'

interface State {
  satelliteHistory: {
    enabled: boolean
    displayedDate: any //dayjs.Date
  }
  shop: {
    basket: number
  }
  overlays: {
    info: number | null // The tab number displayed
    basket: boolean
    profile: boolean
    maximized: boolean
    legendName: LegendName | undefined
  }
  display: {
    clickedCoordinates: {
      lat: number
      lon: number
    }
  }
  project: {
    id: string
    name: string
  }
  fullscreenOverlay: {
    active: boolean
    source: string
    type: string
    component: string
    props: any
  }
}

interface Cart {
  ecosystem: Ecosystem[]
}

interface Ecosystem {
  projectId: number
  name: string
  type: string // conservation, restoration, etc
  price: number
  selectedh3: string[]
  image: string
}

interface Species {
  scientificName: string
  iucnCategory: string
  category: string
  awsUrl: string
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

interface GeospatialLayer {
  name: string
  type: string
  endpoint: string
  category: string
  description?: string
}
