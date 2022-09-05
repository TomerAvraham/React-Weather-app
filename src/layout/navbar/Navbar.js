import React, { useState, useContext } from 'react'
import { AppBar, Box, Toolbar, useMediaQuery, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import NavbarLinks  from "./NavbarLinks"
import logo from "../../assets/images/abra-navbar-logo.png"
import NavbarSearch from './NavbarSearch';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../../context/ColorModeContext"

const pages = [{ path: "/home", label: "HOME" }, { path: "/favorite", label: "FAVORITE" }]

const useStyles = makeStyles((theme) =>
  ({
    mobileLayout: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      maxWidth: '120px',
      paddingRight: '10px',
      marginLeft: '20px'
    },
    linksWrapper: {
      flexGrow: 1,
      display: 'flex',
      marginLeft:'50px',
      maxWidth: '200px',
      justifyContent: 'space-around',
    }
  })
)

const Navbar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { mode, toggleColorMode } = useContext(ColorModeContext)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    navigate(path)
    setAnchorElNav(null);
  };

  return (
    <Box >
        <AppBar  sx={{ background: mode === 'light' ? '#ffffff' : '#121212' }} component="nav" >
            <Toolbar className={isMobile ? classes.mobileLayout : ''} >
              <Box>
                <IconButton sx={{ display: isMobile ? 'block' : 'none' }}>
                  <MenuIcon onClick={handleOpenNavMenu} />
                </IconButton>
                <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page.path)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
              </Box>
                <img className={classes.logo} src={logo} alt='abra_logo' />
                <Box className={classes.linksWrapper} sx={{ display: isMobile ? 'none' : 'flex' }} >
                  <NavbarLinks themeMode={mode} pages={pages} />
                </Box>
                <NavbarSearch isMobile={isMobile}/>
                <IconButton onClick={toggleColorMode} sx={{ ml: 2 }} >
                  {mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Navbar