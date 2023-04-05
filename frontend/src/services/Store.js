import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slice/loginSlice'
import cartReducer from '../slice/cartSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer
  },
})