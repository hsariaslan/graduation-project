import { createSlice } from '@reduxjs/toolkit'

export const title = createSlice({
    name: 'title',
    initialState: {
        value: "",
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { update } = title.actions

export default title.reducer