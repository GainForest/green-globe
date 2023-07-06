import { createSlice } from '@reduxjs/toolkit'

export const overlaysSlice = createSlice({
  name: 'counter',
  initialState: {
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
  },
})

// Action creators are generated for each case reducer function
export const { showBasket, hideBasket, toggleBasket } = overlaysSlice.actions

export default overlaysSlice.reducer
