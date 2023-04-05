import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name:'login',
    initialState:{
        user:{},
        admin:false,
        access:false    
    },
    reducers:{
        loginSuccess: (state,action)=>{
            state.access = action.payload.status;
            state.user= action.payload;
            state.admin = action.payload.isAdmin;
        },
        logout: (state,action)=>{
            state.access = false;
            state.user= {};
            state.admin = false;
        }
    }
})
export const { loginSuccess, logout } = loginSlice.actions

export default loginSlice.reducer


