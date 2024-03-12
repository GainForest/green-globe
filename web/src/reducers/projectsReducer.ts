import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
  name: 'counter',
  initialState: {
    id: undefined,
  },
  reducers: {
    setProjectId: (state, action) => {
      state.id = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setProjectId,
} = projectSlice.actions

export default projectSlice.reducer