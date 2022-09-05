import React from 'react'
import { Grid, Box, Button } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import FavoriteCard from "../components/favoriteCard/FavoriteCard"
import useToggleTemperatureUnit from "../hooks/useToggleTemperatureUnit"
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { clearAllFavorite } from "../feature/favoriteSlice"

const favoriteStyle = {
  width: '100%',
  display: 'flex',
  height: '70',
  alignItems: 'flex-start',
  py: 5,
}

const containerStyle = {
  width: '100%',
  height: '75vh',
  mt: 9
}

const Favorite = () => {
  const [ temperatureUnit, temperatureSymbol, toggleTemperatureUnit ] = useToggleTemperatureUnit()
  const dispatch = useDispatch()
  const { locations } = useSelector(state => state.favorite)

  const handleClearAllClick = () => {
    dispatch(clearAllFavorite())
  }

  return (
    <Box sx={containerStyle}>
      <Box sx={favoriteStyle} >
        <Button sx={{ mr: 1 }} startIcon={<DeviceThermostatIcon/>} onClick={toggleTemperatureUnit} variant="outlined" >
          {temperatureUnit !== 'Imperial' ? 'Fahrenheit' : 'Celsius'}
        </Button>
        <Button onClick={handleClearAllClick} disabled={!locations.length} variant='contained' startIcon={<DangerousIcon/>} >
          Clear All 
        </Button>
      </Box>
      <Grid container spacing={3} >
        {locations.map((item, index) => (
          <Grid sx={{  minWidth: 300, minHeight: 300  }}  item key={index} xs={12} md={6} lg={4} xl={3} >
            <FavoriteCard temperatureSymbol={temperatureSymbol} temperatureUnit={temperatureUnit} item={item} key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Favorite