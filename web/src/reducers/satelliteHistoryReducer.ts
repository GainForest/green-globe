import { createSlice } from '@reduxjs/toolkit'

export const satelliteHistorySlice = createSlice({
  name: 'satelliteHistory',
  initialState: {
    enabled: false,
  },
  reducers: {
    setDisplaySatelliteHistory: (state, action) => {
      state.enabled = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDisplaySatelliteHistory } = satelliteHistorySlice.actions

export default satelliteHistorySlice.reducer
