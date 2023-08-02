import { createSlice } from "@reduxjs/toolkit";

const LoggedInUserSlice = createSlice({
    name: 'LoggedInUser',
    initialState: {
        user: {
            name: 'fawas',
            isProfileCompleted: true
        }
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, action) => {

        }
    }
})


export const { login, logout } = LoggedInUserSlice.actions

export default LoggedInUserSlice.reducer