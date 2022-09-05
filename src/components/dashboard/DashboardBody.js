import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab, Box } from "@mui/material"
import DashboardTable from './DashboardTable'
import { useDispatch } from "react-redux"
import { fetchDaysForecastsByLocationKeyAndDays } from "../../feature/forecastSlice"

const tabWrapperStyle = { 
    borderBottom: 1, 
    borderColor: 'divider',
    mt: 5
}

const DashboardBody = ({ temperatureUnit, forecastByDays, currentLocation, temperatureSymbol }) => {
    const dispatch = useDispatch()
    const [ daysOfForecast, setDaysOfForecast ] = useState(5)

    const handleTabChange = (event, numberOfDays) => {
        setDaysOfForecast(numberOfDays)
        dispatch(fetchDaysForecastsByLocationKeyAndDays({locationKey: currentLocation.Key, numberOfDays}))
    }

  return (
    <>
    <Box sx={tabWrapperStyle}>
        <Tabs value={daysOfForecast} onChange={handleTabChange} variant="fullWidth">
            <Tab label="5 Days" value={5} />
            <Tab label="10 Days (unavailable)" value={10} disabled />
            <Tab label="15 Days (unavailable)" value={15} disabled />
        </Tabs>
    </Box>
    <DashboardTable  temperatureSymbol={temperatureSymbol} temperatureUnit={temperatureUnit} forecastByDays={forecastByDays} />
    </>
  )
}

DashboardBody.propTypes = {
    temperatureUnit: PropTypes.string,
    forecastByDays: PropTypes.array,
    currentLocation: PropTypes.object,
    temperatureSymbol: PropTypes.string
}

export default DashboardBody