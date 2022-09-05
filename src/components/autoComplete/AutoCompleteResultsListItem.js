import React from 'react'
import { ListItem, ListItemText, IconButton   } from "@mui/material"
import { FlagIcon } from "react-flag-kit";
import PropTypes from "prop-types"
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from "react-router-dom"
import { clearLocationByIndex, setCurrentLocation } from '../../feature/locationSlice';

const listItemStyle = {
    maxWidth: 600,
    bgcolor: 'background.paper',
    p: '10px',
    borderBottom: '1px solid rgba(117, 117, 117, 0.1)',
    cursor: 'pointer'
}

const flagIconStyle = { 
  objectFit: 'contain',
  marginLeft: '10px',
  marginRight: '20px'
}


const AutoCompleteResultsItem = ({ item, index, handleCloseModal }) => {
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const handleItemClick = () => {
    dispatch(setCurrentLocation(item))
    navigate('/home')
    handleCloseModal()
  }

  return (
    <ListItem onClick={handleItemClick} sx={[listItemStyle, (theme) => ({
      '&:hover': {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '12px',
        backgroundColor: '#ede7f6'
      }
    })]}
      secondaryAction={
        <IconButton onClick={() => dispatch(clearLocationByIndex(index))} edge="end" >
          <ClearIcon/>
        </IconButton>
      }>
      <FlagIcon code={item.Country.ID} size={50} style={flagIconStyle} />
      <ListItemText 
        primary={`${item.LocalizedName}, ${item.Country.LocalizedName}`}
        secondary={item.AdministrativeArea.LocalizedName} />
  </ListItem>
  )
}

AutoCompleteResultsItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    handleCloseModal: PropTypes.func
}

export default AutoCompleteResultsItem