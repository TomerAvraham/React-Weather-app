import axios from "axios"
import Api from "../classes/Api.js"
import displayErrorMessage from "../../utils/displayErrorMessage"

const api = axios.create({
    baseURL: process.env.REACT_APP_WEATHER_BASE_URL
})


class WeatherApi extends Api {

    async fetchLocationKeyByGeolocation (geolocation) {
        try {
            if (geolocation === null || Object.keys(geolocation).length === 0) return null
            const response = await api.get('/locations/v1/cities/geoposition/search', {
                params: this.returnWithWeatherApiKeyParameter({ q: `${geolocation.latitude},${geolocation.longitude}` })
            })
            return response

        } catch (error) {
            displayErrorMessage()
            throw error
        }
    }

    async fetchLocationsByName(locationName){
        try {
            const response = await api.get('/locations/v1/cities/autocomplete', {
                params: this.returnWithWeatherApiKeyParameter({ q: locationName })
            })
            return response        
        } catch (error) {
            displayErrorMessage()
            throw error
        }
    }

    async fetchLocationCurrentConditionsByLocationKey(locationKey){
        try {
            const response = await api.get(`/currentconditions/v1/${locationKey}`, {
                params: this.returnWithWeatherApiKeyParameter()
            })
            return response
        } catch (error) {
            displayErrorMessage()
            throw error
        }
    }

    async fetchDaysForecastsByLocationKeyAndDays(locationKey, numberOfDays = 5){
        try {
            const response = await api.get(`/forecasts/v1/daily/${numberOfDays}day/${locationKey}`, {
                params: this.returnWithWeatherApiKeyParameter()
            })
            return response
        } catch (error) {
            displayErrorMessage()
            throw error
        }
    }
}

export default new WeatherApi()