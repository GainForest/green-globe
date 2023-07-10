import { createSlice } from '@reduxjs/toolkit'

export const overlaysSlice = createSlice({
  name: 'counter',
  initialState: {
    info: null, // either 1-6, or null
    basket: false,
    profile: true,
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
    showProfile: (state) => {
      state.profile = true
    },
    hideProfile: (state) => {
      state.profile = false
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
  showProfile,
  hideProfile,
} = overlaysSlice.actions

export default overlaysSlice.reducer
