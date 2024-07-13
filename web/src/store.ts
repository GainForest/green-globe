import { configureStore } from '@reduxjs/toolkit'

import fullscreenOverlayReducer from './reducers/fullscreenOverlayReducer'
import mapReducer from './reducers/mapReducer'
import overlaysReducer from './reducers/overlaysReducer'
import projectsReducer from './reducers/projectsReducer'
import satelliteHistoryReducer from './reducers/satelliteHistoryReducer'
import shopReducer from './reducers/shopReducer'

export default configureStore({
  reducer: {
    satelliteHistory: satelliteHistoryReducer,
    overlays: overlaysReducer,
    shop: shopReducer,
    map: mapReducer,
    project: projectsReducer,
    fullscreenOverlay: fullscreenOverlayReducer,
  },
})
