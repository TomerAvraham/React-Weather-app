import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: JSON.parse(localStorage.getItem('favorite') || JSON.stringify([]))
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, {payload}) => {            
            state.locations.push(payload)
            localStorage.setItem("favorite", JSON.stringify(state.locations))
        },
        removeFromFavorite: (state, {payload}) => {
            const index =  state.locations.findIndex(el => el.Key === payload)
            state.locations.splice(index, 1)
            localStorage.setItem("favorite", JSON.stringify(state.locations))
        },
        clearAllFavorite: (state) => {
            state.locations = []
            localStorage.removeItem('favorite')
        }
    }
})

export default favoriteSlice.reducer
export const { addToFavorite, removeFromFavorite, clearAllFavorite } = favoriteSlice.actions