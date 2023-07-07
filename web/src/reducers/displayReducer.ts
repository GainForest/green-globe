import { createSlice } from '@reduxjs/toolkit'

export const displaySlice = createSlice({
  name: 'counter',
  initialState: {
    clickedCoordinates: {
      lat: undefined,
      lon: undefined,
    },
  },
  reducers: {
    setClickedCoordinates: (state, action) => {
      state.clickedCoordinates = {
        lat: action.payload.lat,
        lon: action.payload.lon,
      }
    },
    setClickedCoordinatesLat: (state, action) => {
      state.clickedCoordinates = {
        ...state.clickedCoordinates,
        lat: action.payload.lat,
      }
    },
    setClickedCoordinatesLon: (state, action) => {
      state.clickedCoordinates = {
        ...state.clickedCoordinates,
        lon: action.payload.lon,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setClickedCoordinates } = displaySlice.actions

export default displaySlice.reducer
