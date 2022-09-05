import { useState, useEffect, useCallback } from "react"

export default function useGeolocation(ref){
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
  
    const getLocation = useCallback(() => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus('success');
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          ref.current = 'success'
        }, () => {
          setStatus('Unable to retrieve your location');
          ref.current = 'Unable to retrieve your location'
        });
      }
    }, [])

    useEffect(() => {
        getLocation()
    }, [ref.current])

    return [lat, lng, status]
  
}