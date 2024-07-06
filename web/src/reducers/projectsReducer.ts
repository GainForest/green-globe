import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
  name: 'counter',
  initialState: {
    id: undefined,
    name: undefined,
  },
  reducers: {
    setProjectId: (state, action) => {
      state.id = action.payload
    },
    setProjectName: (state, action) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProjectId, setProjectName } = projectSlice.actions

export default projectSlice.reducer
