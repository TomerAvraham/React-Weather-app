import React, { useState, createContext, useMemo, useContext } from 'react'
import { createTheme, ThemeProvider  } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: 'light'
})

export const ColorModeContextProvider = ({ children }) => {
    const [mode, setMode] = useState("light")
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
            },
            mode
        }),
        [mode]
    )

    const theme = useMemo(
        () => 
            createTheme({
                components: {
                    MuiAppBar: {
                        styleOverrides: {
                            colorPrimary: {    
                                backgroundColor: "#ffffff"
                            }
                        }
                    },
                },
                palette: {
                    mode,
                    primary: {
                        main: deepPurple[500]
                    },
                    navbar: {
                        main: '#ffffff',
                    }
                }
            }),
            [mode]
    )

    return (
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider> 
    )
}

export const useColorMode = () => useContext(ColorModeContext)
