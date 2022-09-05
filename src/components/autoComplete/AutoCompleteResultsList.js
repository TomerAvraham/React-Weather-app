import React, { useRef, useEffect } from 'react'
import PropTypes from "prop-types"
import {  List, DialogContentText} from "@mui/material"
import AutoCompleteResultsItem from './AutoCompleteResultsListItem'
import { useDispatch } from 'react-redux'
import { clearLocations } from '../../feature/locationSlice'


const ListWrapperStyle = {
  width: '100%',
  bgcolor: 'background.paper'
}


const AutoCompleteResults = ({ list = [], openModal, handleCloseModal }) => {
  const descriptionElementRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (openModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    return () => {
      if(!openModal) dispatch(clearLocations());
    }
  }, [openModal]);  


  return (
    <DialogContentText ref={descriptionElementRef}>
    <List sx={ListWrapperStyle} >
      {list.map((item, index) => (
        <>
          <AutoCompleteResultsItem handleCloseModal={handleCloseModal} index={index} item={item} key={item.key} />
        </>
      ))}
    </List>
    </DialogContentText>
  )
}

AutoCompleteResults.propTypes  = {
  list: PropTypes.array,
  openModal: PropTypes.bool,
  handleCloseModal: PropTypes.func
}

export default AutoCompleteResults