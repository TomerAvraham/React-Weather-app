class Api {

    returnWithWeatherApiKeyParameter(params){
        return {apikey: process.env.REACT_APP_WEATHER_API_KEY, ...params}
    }
}

export default Api