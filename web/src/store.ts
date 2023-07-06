import { configureStore } from '@reduxjs/toolkit'

import overlaysReducer from './reducers/overlaysReducer'
import shopReducer from './reducers/shopReducer'

export default configureStore({
  reducer: {
    shop: shopReducer,
    overlays: overlaysReducer,
  },
})
