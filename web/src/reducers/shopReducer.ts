import { createSlice } from '@reduxjs/toolkit'

export const shopSlice = createSlice({
  name: 'counter',
  initialState: {
    basket: 0,
  },
  reducers: {
    incrementBasket: (state) => {
      state.basket += 1
    },
    decrementBasket: (state) => {
      state.basket -= 1
    },
    incrementBasketByAmount: (state, action) => {
      state.basket += action.payload
    },
    decrementBasketByAmount: (state, action) => {
      state.basket -= action.payload
    },
    setBasket: (state) => {
      state.basket = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  incrementBasket,
  decrementBasket,
  incrementBasketByAmount,
  decrementBasketByAmount,
} = shopSlice.actions

export default shopSlice.reducer
