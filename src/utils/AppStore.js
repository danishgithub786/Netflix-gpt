import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"

//the below store will take a configuration
const AppStore=configureStore(
    {
        reducer:{
            user:userReducer,
        }
    }
)

export default AppStore;