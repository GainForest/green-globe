import { createSlice } from '@reduxjs/toolkit'

export const displaySlice = createSlice({
  name: 'map',
  initialState: {
    clickedCoordinates: {
      lat: undefined,
      lon: undefined,
    },
    hoveredInformation: {},
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
    setHoveredInformation: (state, action) => {
      state.hoveredInformation = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setClickedCoordinates, setHoveredInformation } =
  displaySlice.actions

export default displaySlice.reducer
