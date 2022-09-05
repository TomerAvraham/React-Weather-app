import React, { useState } from 'react'
import { Button, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types"
import AutoCompleteModal from '../../components/autoComplete/AutoCompleteModal';

const modalButtonStyle = {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '12px',
    backgroundColor: '#F8F8F8',
    width: '170px',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'flex-start',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    height: '30px',
    borderRadius: '35px',
    padding: '15px',
    marginLeft: 'auto'
}

const NavbarSearch = ({ isMobile }) => {
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      { isMobile ?
      <IconButton onClick={handleOpenModal} >
        <SearchIcon/>
      </IconButton>
      :
        <Button 
            onClick={handleOpenModal}  
            startIcon={ <SearchIcon color="primary" /> } 
            style={modalButtonStyle}>
                Search...
        </Button>
      }
        <AutoCompleteModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </>
  )
}

NavbarSearch.propTypes = {
  isMobile: PropTypes.bool
}

export default NavbarSearch