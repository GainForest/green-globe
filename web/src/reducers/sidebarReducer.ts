import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    active: false,
  },
  reducers: {
    setSidebarIsActive: (state, action) => {
      state.active = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSidebarIsActive } = sidebarSlice.actions

export default sidebarSlice.reducer
