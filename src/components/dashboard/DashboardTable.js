import React from 'react'
import {TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'
import moment from "moment"
import getWeatherIconPath from '../../utils/getWeatherIconPath'
import convertFahrenheitToCelsius from "../../utils/convertFahrenheitToCelsius"
import PropTypes from "prop-types" 

const tableHeaderValues = [
    "Date", "Day", "Forecast", "Night", "Forecast", "Minimum", "Maximum" 
]

const DashboardTable = ({ forecastByDays, temperatureUnit }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
    <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader >
        <TableHead>
            <TableRow>
                {tableHeaderValues.map((title, index) => (
                    <TableCell  key={index} >{title}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {forecastByDays.map((dayForecast, index) => (
                <TableRow>
                    <TableCell >{moment(dayForecast.Date).format('dddd Do MMM')}</TableCell>
                    <TableCell >
                        <img src={getWeatherIconPath(dayForecast.Day.Icon)} alt="" />
                        
                    </TableCell>
                    <TableCell>{dayForecast.Day.IconPhrase}</TableCell>
                    <TableCell >
                        <img src={getWeatherIconPath(dayForecast.Night.Icon)} alt="" />
                    </TableCell>
                    <TableCell>{dayForecast.Night.IconPhrase}</TableCell>
                    <TableCell >{temperatureUnit === 'Imperial' ? 
                    `${dayForecast.Temperature.Minimum.Value} ℉` :
                     `${convertFahrenheitToCelsius(dayForecast.Temperature.Minimum.Value)} ℃`}
                    </TableCell>
                    <TableCell >{temperatureUnit === 'Imperial' ? 
                    `${dayForecast.Temperature.Maximum.Value} ℉` :
                    `${convertFahrenheitToCelsius(dayForecast.Temperature.Maximum.Value)} ℃`}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    </Paper>
  )
}

DashboardTable.propTypes = {
    forecastByDays: PropTypes.array,
    temperatureUnit: PropTypes.string
}

export default DashboardTable