import React, { useRef, useEffect } from 'react'
import { InputBase } from "@mui/material"

const AutoFocusTextInput = (props) => {
    const inputRef = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current.focus();
        }, 100)

        return () => {
            clearTimeout(timeout)
        }
    })

  return (
    <InputBase inputRef={inputRef} {...props} />
  )
}

export default AutoFocusTextInput