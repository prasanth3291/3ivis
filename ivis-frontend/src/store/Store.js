import { configureStore } from '@reduxjs/toolkit'
import userReducer  from '../features/Authslice'

export default configureStore({
  reducer: {user: userReducer,},
})