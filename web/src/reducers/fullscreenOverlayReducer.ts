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
    setFullscreenSource: (state, action) => {
      state.source = action.payload
    },
    setFullscreenType: (state, action) => {
      state.type = action.payload
    },
    setFullscreenComponent: (state, action) => {
      state.component = action.payload
    },
    setFullscreenProps: (state, action) => {
      state.props = action.payload
    },
    setFullscreenOverlay: (state, action) => {
      state.source = action.payload.source
      state.type = action.payload.type
      state.component = action.payload.component
      state.props = action.payload.props
      state.active = action.payload.active
    },

    toggleFullscreenOverlay: (state) => {
      state.active = !state.active
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setFullscreenComponent,
  setFullscreenOverlay,
  setFullscreenProps,
  setFullscreenSource,
  setFullscreenType,
  toggleFullscreenOverlay,
} = fullscreenOverlaySlice.actions

export default fullscreenOverlaySlice.reducer
