import React from 'react'
import { Box, Paper, Typography, Button, useMediaQuery } from "@mui/material"
import moment from 'moment'
import PropTypes from "prop-types"
import getWeatherIconPath from '../../utils/getWeatherIconPath'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import currentForecastBackground from "../../assets/images/currentForecastBackground.png"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorite, removeFromFavorite } from '../../feature/favoriteSlice'

const dashboardHeaderWrapper = {
    width: '100%',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'space-between',
    p: 2,
    maxHeight: 200,
    mb: 15
}


const dashboardHeaderMobileWrapper = {
    width: '100%',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 300,
    p: 2,
    mb: 15
}

const currentForecastStyle = {
    p: 4,
    backgroundImage: `url(${currentForecastBackground})`,
    color: '#ffffff',
    width: '70%',
    minWidth: 400,
    position: 'relative' ,
    display: 'flex',
    alignItem: 'center',
    minHeight: 300,
    justifyContent: 'space-between',
    pt: 8
}

const dashboardActionStyle = {
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
}

const dashboardActionMobileStyle = {
    mt: 4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItem: 'center',
    width: '100%'
}

const imageStyle = {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    position: 'absolute',
    top: -90 
}

const temperatureStyle = {
    minWidth: 150,
    height: '75%',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
   flexDirection: 'column',
   fontSize: '3rem',
}

const DashboardHeader = ({ temperatureSymbol, currentLocation, temperatureUnit, toggleTemperatureUnit, currentForecast }) => {
    const dispatch = useDispatch()
    const { locations } = useSelector(state => state.favorite)
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const isSavedInLocalStorage = locations.some(el => el.Key === currentLocation.Key)

    const handleFavoriteClick = () => {
        if(isSavedInLocalStorage){
            dispatch(removeFromFavorite(currentLocation.Key))
        }else{
            dispatch(addToFavorite(currentLocation))
        }
    }

  return (
    <Box sx={isMobile ? dashboardHeaderMobileWrapper : dashboardHeaderWrapper} >
        <Paper elevation={3} sx={currentForecastStyle} >
            <img style={imageStyle}  src={getWeatherIconPath(currentForecast.WeatherIcon)} alt="" />
            <Typography variant='h4' >
                {currentLocation.LocalizedName}, {currentLocation.Country.LocalizedName}
                <br/>
                {moment(currentLocation.LocalObservationDateTime).calendar()}
            </Typography>
            <Typography component='div' style={temperatureStyle}  >
                {currentForecast.Temperature[temperatureUnit].Value} {temperatureSymbol}
                <br/>
                {currentForecast.WeatherText}
            </Typography>
            
        </Paper>
        <Box sx={isMobile ? dashboardActionMobileStyle : dashboardActionStyle} >
            <Button startIcon={<DeviceThermostatIcon/>} onClick={toggleTemperatureUnit} variant="outlined" >
                {temperatureUnit !== 'Imperial' ? 'Fahrenheit' : 'Celsius'}
            </Button>
            <Button onClick={handleFavoriteClick} variant='contained' startIcon={isSavedInLocalStorage ? <RemoveIcon/> : <AddIcon/>} >
                {isSavedInLocalStorage ? "Remove Favorite" : "Add To Favorite"}
            </Button>
        </Box>
    </Box>
  )
}

DashboardHeader.propTypes = {
    currentLocation: PropTypes.object,
    currentForecast: PropTypes.object,
    temperatureUnit: PropTypes.string,
    toggleTemperatureUnit: PropTypes.func,
    temperatureSymbol: PropTypes.string
}

export default DashboardHeader