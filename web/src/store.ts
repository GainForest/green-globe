import { configureStore } from '@reduxjs/toolkit'

import displayReducer from './reducers/displayReducer'
import overlaysReducer from './reducers/overlaysReducer'
import shopReducer from './reducers/shopReducer'

export default configureStore({
  reducer: {
    shop: shopReducer,
    overlays: overlaysReducer,
    display: displayReducer,
  },
})
