import { configureStore } from '@reduxjs/toolkit'

import displayReducer from './reducers/displayReducer'
import overlaysReducer from './reducers/overlaysReducer'
import satelliteHistoryReducer from './reducers/satelliteHistoryReducer'
import shopReducer from './reducers/shopReducer'
import projectsReducer from './reducers/projectsReducer'

export default configureStore({
  reducer: {
    satelliteHistory: satelliteHistoryReducer,
    overlays: overlaysReducer,
    shop: shopReducer,
    display: displayReducer,
    project: projectsReducer,
  },
})
