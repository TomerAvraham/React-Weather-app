import { useState } from "react";

export default function useToggleTemperatureUnit(defaultValue = "Imperial"){
    const [value, setValue] = useState(defaultValue)
    const [symbol, setSymbol] = useState(defaultValue === "Imperial" ? '℉' : '℃')

    function toggleValue() {
        setValue(currentValue => 
            currentValue === 'Imperial' ? 'Metric' : 'Imperial'    
        )
        setSymbol(currentValue =>
            currentValue === "℃" ? '℉' : '℃'
        )
    }

    return [value, symbol, toggleValue]
}