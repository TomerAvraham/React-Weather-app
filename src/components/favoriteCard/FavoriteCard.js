import React, { useState, useEffect } from 'react'
import {Card, CardContent, CardActions, Typography, IconButton} from '@mui/material';
import PropTypes from "prop-types"
import weatherApi from '../../app/services/weatherApi';
import getWeatherIconPath from '../../utils/getWeatherIconPath';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import displayErrorMessage from '../../utils/displayErrorMessage';
import { removeFromFavorite } from "../../feature/favoriteSlice"

const cardStyle = { 
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: 2
}

const imageStyle = {
  width: '150px',
  height: '150px',
  objectFit: 'contain'
}

const FavoriteCard = ({ item, temperatureUnit, temperatureSymbol }) => {
  const dispatch = useDispatch()
  const [ currentForecast, setCurrentForecast ] = useState({
    Temperature: {
      Metric: {},
      Imperial: {}
  }})
  
  const fetchCurrentForecast = async () => {
    try {
      const { data } = await weatherApi.fetchLocationCurrentConditionsByLocationKey(item.Key)
      setCurrentForecast(data[0])
    } catch (error) {
      displayErrorMessage()
    }
  } 

  const handleRemoveClick = () => {
    dispatch(removeFromFavorite(currentForecast.Key))
  }

  useEffect(() => {
    fetchCurrentForecast()
  }, [])


  return (
    <Card variant="outlined" sx={cardStyle} >
      <CardContent>
        <Typography gutterBottom textAlign='center' variant='h5' >
          {item.LocalizedName}
        </Typography>
        <Typography textAlign='center' variant='subtitle1' color="text.secondary" >
          {item.Country.ID}, {item.Country.LocalizedName}
        </Typography>
        <img style={imageStyle} src={getWeatherIconPath(currentForecast.WeatherIcon)} alt="" />
        <Typography variant="h6" textAlign='center'>
          {currentForecast.WeatherText}
        </Typography>
        <Typography variant="h5"  textAlign='center'>
          {currentForecast.Temperature[temperatureUnit].Value} {temperatureSymbol}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="large" onClick={handleRemoveClick} >
          <DeleteOutlineIcon  sx={{ fontSize: "40px" }} />
        </IconButton>
      </CardActions>
    </Card>
  )
}

FavoriteCard.propTypes = {
    item: PropTypes.object,
    temperatureUnit: PropTypes.string,
    temperatureSymbol: PropTypes.string
}

export default FavoriteCard