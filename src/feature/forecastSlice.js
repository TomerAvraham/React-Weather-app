import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherApi from "../app/services/weatherApi";

const initialState = {
    isLoading: false,
    error: null,
    currentForecast: {
      Temperature: {
        Metric: {},
        Imperial: {},
      },
      WeatherIcon: 0
    }
    ,
    forecastByDays: []
}

export const fetchDaysForecastsByLocationKeyAndDays = createAsyncThunk(
  'forecast/fetchDaysOfDailyForecast',
  async ({locationKey, numberOfDays}, { rejectWithValue }) => {
    try {
      const response = await weatherApi.fetchDaysForecastsByLocationKeyAndDays(locationKey, numberOfDays)
      return response.data
    } catch (error) {
      rejectWithValue(error.response.data)
    }
  }
)

export const fetchLocationCurrentConditionsByLocationKey = createAsyncThunk(
    'forecast/fetchCurrentConditions', 
    async (locationKey, { rejectWithValue }) => {
        try {
            const response = await weatherApi.fetchLocationCurrentConditionsByLocationKey(locationKey)
            return response.data
        } catch (error) {
            rejectWithValue(error.response.data)
        }
    }
)

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLocationCurrentConditionsByLocationKey.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchLocationCurrentConditionsByLocationKey.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.currentForecast = Array.isArray(payload) ? payload[0] : payload
        })
        .addCase(fetchLocationCurrentConditionsByLocationKey.rejected, (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        })
        .addCase(fetchDaysForecastsByLocationKeyAndDays.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchDaysForecastsByLocationKeyAndDays.fulfilled, (state, { payload }) => {
          state.isLoading = false
          state.error = null
          state.forecastByDays = payload ? payload.DailyForecasts : []
        })
        .addCase(fetchDaysForecastsByLocationKeyAndDays.rejected, (state, { payload }) => {
          state.isLoading = false
          state.error = payload
        })
    }
})

export default forecastSlice.reducer