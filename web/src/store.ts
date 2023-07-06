import { configureStore } from '@reduxjs/toolkit'

import shopReducer from './reducers/shopReducer'

export default configureStore({
  reducer: {
    shop: shopReducer,
  },
})
