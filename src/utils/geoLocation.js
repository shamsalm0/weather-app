import { useState, useEffect } from 'react';

export function useGeoLocation() {
    // Initial state
    const [locationData, setLocationData] = useState({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    // Function to get the location
    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser.",
                isLoading: false,
            });
            return;
        }

    

        // Fetch location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    error: null,
                    isLoading: false,
                });
            },
            (error) => {
                let errorMessage = "An unknown error occurred.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location position unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                }

                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
              }
        );
    };

    // useEffect to call getLocation on component mount
    useEffect(() => {
        getLocation();
        console.log(locationData)
    }, []); // Empty dependency array ensures it runs only once

    return locationData; // Return the state
}
