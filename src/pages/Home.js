import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDaysForecastsByLocationKeyAndDays, fetchLocationCurrentConditionsByLocationKey } from '../feature/forecastSlice'
import useToggleTemperatureUnit from "../hooks/useToggleTemperatureUnit"
import { Box } from "@mui/material"
import DashboardHeader from '../components/dashboard/DashboardHeader'
import DashboardBody from '../components/dashboard/DashboardBody'
import weatherApi from '../app/services/weatherApi'
import { setCurrentLocation, setCurrentLocationByName } from "../feature/locationSlice"
import useGeolocation from '../hooks/useGeolocation'

const homeWrapperStyle = {
  bgcolor: 'background.paper',
  height: '85vh',
  mt: 10,
  p: 5,
}

const DEFAULT_LOCATION_KEY = '215854'
const DEFAULT_LOCATION_NAME = 'tel aviv'

const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { currentLocation } = state.locations
  const { currentForecast, forecastByDays } = state.forecast
  const [ temperatureUnit, temperatureSymbol, toggleTemperatureUnit ] = useToggleTemperatureUnit()
  const geolocationRender = useRef(null)
  const [latitude, longitude, geolocationStatus] = useGeolocation(geolocationRender)
  const isHomePageInit = useRef(false)

  const dispatchCurrentLocationActions = (currentLocation) => {
    dispatch(setCurrentLocation(currentLocation))
    dispatch(fetchLocationCurrentConditionsByLocationKey(currentLocation.Key))
    dispatch(fetchDaysForecastsByLocationKeyAndDays({locationKey: currentLocation.Key}))
  }

  const initialApplicationByGeolocation = async (geolocation) => {
    try {
      const response = await weatherApi.fetchLocationKeyByGeolocation(geolocation)
      const currentLocation = response.data
      dispatchCurrentLocationActions(currentLocation)
    } catch (error) {
      initialApplicationByDefaultLocation()
    }
  }

  const initialApplicationByDefaultLocation = () => {
    dispatch(setCurrentLocationByName(DEFAULT_LOCATION_NAME))
    dispatch(fetchLocationCurrentConditionsByLocationKey(DEFAULT_LOCATION_KEY))
    dispatch(fetchDaysForecastsByLocationKeyAndDays({locationKey: DEFAULT_LOCATION_KEY}))
  }

  useEffect(() => {
      if(isHomePageInit.current === false){ 
        if(latitude && longitude && geolocationStatus === 'success'){
          initialApplicationByGeolocation({latitude, longitude})
          isHomePageInit.current = true
        }else if(geolocationStatus === 'Unable to retrieve your location') {
          initialApplicationByDefaultLocation()
          isHomePageInit.current = true
        }
      }else {
        dispatchCurrentLocationActions(currentLocation)
      }
  }, [geolocationRender.current])

  return (
    <Box sx={homeWrapperStyle} >
      <DashboardHeader temperatureSymbol={temperatureSymbol} toggleTemperatureUnit={toggleTemperatureUnit} currentLocation={currentLocation} currentForecast={currentForecast} temperatureUnit={temperatureUnit}/>
      <DashboardBody temperatureSymbol={temperatureSymbol} currentLocation={currentLocation} temperatureUnit={temperatureUnit} forecastByDays={forecastByDays} />
    </Box>
  )
}

export default Home