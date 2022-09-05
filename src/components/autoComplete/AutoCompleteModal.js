import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle,
            DialogContent, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useTheme  } from "@mui/styles"
import PropTypes from "prop-types"
import AutoFocusTextInput from '../ui/AutoFocusTextInput'
import AutoCompleteResultsList from './AutoCompleteResultsList';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchLocationsByName } from '../../feature/locationSlice';

const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
}

const dialogContentStyle= {
    width: '100%',
    minWidth: 600,
    minHeight: 560,
    paddingTop: 0  
}

const AutoCompleteModal = ({ openModal, handleCloseModal }) => {
const theme = useTheme();
const dispatch = useDispatch();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const { isLoading, locations } = useSelector(state => state.locations)
const [ inputValue, setInputValue ] = useState('')

useEffect(() => {
    let timeoutId
    if(inputValue !== ''){
        timeoutId = setTimeout(() => dispatch(fetchLocationsByName(inputValue)), 700);
    }
    return () => {
        clearTimeout(timeoutId)
    }
}, [inputValue])

const handleCloseModalAndClearInput = () => {
    handleCloseModal()
    setInputValue('')
}

  return (
    <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullScreen={fullScreen}
        PaperProps={{
            sx: {
                overflow: 'hidden'
            }
        }}
    >
        <DialogTitle sx={searchBarStyle}>
            {isLoading ? <CircularProgress color="primary" /> : <SearchIcon color="primary"/> }
            <AutoFocusTextInput value={inputValue} onChange={e => setInputValue(e.target.value)}  sx={{ ml: 1, flex: 1, paddingRight: '15px' }}
            placeholder='Search Weather Location'
            />
        </DialogTitle>
        <DialogContent  dividers sx={dialogContentStyle} >
              <AutoCompleteResultsList handleCloseModal={handleCloseModalAndClearInput} list={locations} openModal={openModal} />
        </DialogContent>
    </Dialog>
  )
}

AutoCompleteModal.propTypes = {
    openModal: PropTypes.bool,
    handleCloseModal: PropTypes.func
}

export default AutoCompleteModal