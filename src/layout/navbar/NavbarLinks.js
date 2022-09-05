import React from 'react'
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

const mainStyle = {
  textDecoration: "none",
  color: "#121F3F"
}

const activeStyle = {
  ...mainStyle,
  fontWeight: 700
}

const unActiveStyle = {
  ...mainStyle,
}


const NavbarLinks = ({pages, themeMode}) => {

  const textColor = themeMode === 'light' ? '#121F3F' : '#F9F9F9'

  return (
    <>
      {pages.map((page, index) => (
        <NavLink key={index} style={({ isActive }) =>
          isActive ? {...activeStyle, color: textColor} : {...unActiveStyle, color: textColor }
        } to={page.path}  >
            {page.label}
        </NavLink>
      ))}
    </>
  )
}

NavLink.propTypes = {
  pages: PropTypes.array,
  themeMode: PropTypes.string
}

export default NavbarLinks