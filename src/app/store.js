import { configureStore } from "@reduxjs/toolkit"
import locationReducer  from "../feature/locationSlice"
import forecastReducer from "../feature/forecastSlice"
import favoriteReducer from "../feature/favoriteSlice"

export const store = configureStore({
    reducer: {
        locations: locationReducer,
        forecast: forecastReducer,
        favorite: favoriteReducer
    }
})