import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isAuthenticated: false,
    metaMaskAddress: "",
}

const authenticationSlice = createSlice({
    name: "authenticationSlice",
    initialState : initialState,
    reducers:{
        authenticateUser(state, action){
            state.metaMaskAddress = action.payload
            state.isAuthenticated = true;
        },
        removeUser(state, action){
            return initialState
        },

    }
})


export const { authenticateUser, removeUser } = authenticationSlice.actions
export const authState = (state) => state.authenticationSlice;
export default authenticationSlice.reducer