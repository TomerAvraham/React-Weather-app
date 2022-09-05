import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherApi from "../app/services/weatherApi";

const initialState = {
    isLoading: false,
    error: null,
    currentLocation: {
      LocalizedName: '',
      Country: {
        LocalizedName: ''
      }
    },
    locations: []
} 

export const fetchLocationsByName = createAsyncThunk(
    'locations/fetchByName',
    async (name, { rejectWithValue }) => {
        try {
            const response = await weatherApi.fetchLocationsByName(name)
            return response.data
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

export const setCurrentLocationByName = createAsyncThunk(
    'locations/setCurrentLocation',
    async (name, { rejectWithValue }) => {
        try {
            const response = await weatherApi.fetchLocationsByName(name)
            return response.data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        clearLocations: (state) => {
            state.locations = []
        },
        clearLocationByIndex: (state, {payload: index}) => {
          state.locations.splice(index, 1)
        },
        setCurrentLocation:(state, {payload}) => {
          state.currentLocation = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocationsByName.pending, (state) => {
            state.isLoading = true;
            })
            .addCase(fetchLocationsByName.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.locations = payload
                state.error = null 
            })
            .addCase(fetchLocationsByName.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload
            })
            .addCase(setCurrentLocationByName.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setCurrentLocationByName.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.currentLocation = payload[0]
                state.error = null
            })
            .addCase(setCurrentLocationByName.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload
            })
    }
})

export const { clearLocations, clearLocationByIndex, setCurrentLocation } = locationSlice.actions
export default locationSlice.reducer