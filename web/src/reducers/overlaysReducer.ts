import { createSlice } from '@reduxjs/toolkit'

export const overlaysSlice = createSlice({
  name: 'counter',
  initialState: {
    info: null,
    basket: false,
  },
  reducers: {
    showBasket: (state) => {
      state.basket = true
    },
    hideBasket: (state) => {
      state.basket = false
    },
    toggleBasket: (state) => {
      state.basket = !state.basket
    },
    setInfoOverlay: (state, action) => {
      state.info = action.payload
    },
    hideInfoOverlay: (state) => {
      state.info = null
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  showBasket,
  hideBasket,
  toggleBasket,
  setInfoOverlay,
  hideInfoOverlay,
} = overlaysSlice.actions

export default overlaysSlice.reducer
