import { createSlice } from '@reduxjs/toolkit'

export const fullscreenOverlaySlice = createSlice({
  name: 'fullscreenOverlay',
  initialState: {
    active: false,
    source: null,
    type: null,
    component: null,
    props: {},
  },
  reducers: {
    setFullScreenOverlay: (state, action) => {
      state.source = action.payload.source
      state.type = action.payload.type
      state.component = action.payload.component
      state.props = action.payload.props
      state.active = action.payload.active
    },
    toggleFullScreenOverlay: (state) => {
      state.active = !state.active
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFullScreenOverlay, toggleFullScreenOverlay } =
  fullscreenOverlaySlice.actions

export default fullscreenOverlaySlice.reducer
