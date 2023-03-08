import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from "../components/authenticationSlice"

const store = configureStore({
    reducer: {
        authenticationSlice: AuthenticationReducer,
    }
 })
 
 // export default the store 
 export default store