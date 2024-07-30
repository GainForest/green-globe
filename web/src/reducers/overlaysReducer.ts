import { createSlice } from '@reduxjs/toolkit'

import { State } from 'src/types'

export const overlaysSlice = createSlice({
  name: 'counter',
  initialState: {
    info: null, // either 1-6, or null
    basket: false,
    profile: false,
    maximized: false,
    legendName: undefined,
  } as State['overlays'],
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
    setMaximized: (state, action) => {
      state.maximized = action.payload
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
    setLegendName: (state, action) => {
      state.legendName = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  showBasket,
  hideBasket,
  toggleBasket,
  setMaximized,
  setInfoOverlay,
  hideInfoOverlay,
  showProfile,
  hideProfile,
  setLegendName,
} = overlaysSlice.actions

export default overlaysSlice.reducer
