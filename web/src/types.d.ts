import { LegendName } from './components/Map/legends/legendMap'

interface State {
  satelliteHistory: {
    enabled: boolean
  }
  shop: {
    basket: number
  }
  overlays: {
    info: string // cardName-tabName-subtabName
    basket: boolean
    profile: boolean
    maximized: boolean
    legendName: LegendName | undefined
  }
  map: {
    clickedCoordinates: {
      lat: number
      lon: number
    }
    hoveredInformation: any
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
  // below are for AnimalPhoto; has that been deprecated?
  image_url: string
  common: string
  scientificname: string
  redlist: string
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
  type:
    | 'geojson_points'
    | 'geojson_points_trees'
    | 'geojson_line'
    | 'choropleth'
    | 'choropleth_shannon'
    | 'raster_tif'
    | 'tms_tile'
  endpoint: string
  description: string
  category: string
  legend?: string
  tilePattern?: string
  tileRange?: {
    x: { min: number; max: number }
    y: { min: number; max: number }
  }
}
