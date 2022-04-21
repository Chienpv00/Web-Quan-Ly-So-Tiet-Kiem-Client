import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../futures/login/loginSlice'

export default configureStore({
    reducer: {
        login: loginReducer
    }
})