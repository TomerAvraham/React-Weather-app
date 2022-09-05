import React from 'react'
import Layout from './layout/Layout'
import {  Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Favorite from "./pages/Favorite"
import Page404 from "./pages/Page404"
import "./assets/global.css"

const App = () => {
  return (
    <div className='app'>
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='home' element={<Home/>} />
        <Route path='favorite' element={<Favorite/>} />
        <Route path='*' element={<Page404/>} />
      </Route>
    </Routes>
    </div>
  )
}

export default App