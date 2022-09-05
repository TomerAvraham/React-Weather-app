import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import {Container, CssBaseline} from "@mui/material"

const Layout = ( ) => {
  return (
    <>
      <CssBaseline/>
      <Navbar/>
      <Container sx={{ height: { xs: '170vh', md: '150vh', xl: 'auto' }, minHeight: '100vh'}} >
        <Outlet/>
      </Container>
      <Footer/>
    </>
  )
}

export default Layout