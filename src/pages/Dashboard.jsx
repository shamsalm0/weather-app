import CitySearch from '@/components/CitySearch';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastAccordion from '@/components/ForecastAccordion';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/utils/geoLocation';
import { fetchedWeatherQuery, useForecastQuery, useLocationSearchQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/utils/useWeather';
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';



const Dashboard = () => {
    const { coordinates, getLocation, error, isLoading } = useGeoLocation();
    console.log(coordinates, "coordinates");
    const [selectedWeather, setSelectedWeather] = useState({
        temp: true,
        feels_like: false,
        wind: false,
        humidity: false,
        pressure: false
    })
    const [searchInput, setSearchInput] = useState('');
    const [coord, setCoord] = useState(coordinates);
    useEffect(() => {
        if (coordinates && !coord) {
          setCoord(coordinates);
        }
      }, [coordinates, coord]);


    const weatherQuery = useWeatherQuery(coord);
    console.log(weatherQuery, "Weather Query");
    const forecastQuery = useForecastQuery(coordinates);
    console.log(forecastQuery, "forecast Query");
    const locationQuery = useReverseGeocodeQuery();

    const searchLocation = useLocationSearchQuery(searchInput);
    console.log(searchLocation, "searchLocation");
    // console.log(weatherQuery.data);
    const handleRefresh = () => {
        getLocation()
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    }

    if (isLoading) {
        return <LoadingSkeleton />
    }

    if (error) {
        return <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                <p> Please enable your location to see the weather.</p>
                <Button onClick={getLocation} variant={"outline"}>
                    <MapPin className='mr-2 h-3 w-3'>
                        Enable Location
                    </MapPin>
                </Button>
            </AlertDescription>
        </Alert>
    }
    if (!coordinates) {
        return <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription>
                <p> Please enable your location to see the weather.</p>
                <Button onClick={getLocation} variant={"outline"}>
                    <MapPin className='mr-2 h-3 w-3'>
                        Enable Location
                    </MapPin>
                </Button>
            </AlertDescription>
        </Alert>
    }

    const locationName = locationQuery.data?.[0];
    console.log(locationQuery, "location");

    if (weatherQuery.error || forecastQuery.error || locationQuery.error) {
        return <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Required</AlertTitle>
            <AlertDescription>
                <p> Please enable your location to see the weather.</p>
                <Button onClick={handleRefresh} variant={"outline"}>
                    <RefreshCw className='mr-2 h-4 w-4' />
                </Button>
            </AlertDescription>
        </Alert>
    }
    if (!weatherQuery.data || !forecastQuery.data) {
        <LoadingSkeleton />
    }
    return (
        <div className='space-y-4'>
            <div className='flex justify-between items-center '>
                <h1 className='flex items-center text-base'>Location</h1>
                <input 
                type="text" 
                className='border rounded-md px-16 py-2' 
                placeholder='Search for a city...' 
                onChange={(e) => {
                    setSearchInput(e.target.value);
                    setCoord({
                      lat: searchLocation?.data?.[0]?.lat,
                      lon: searchLocation?.data?.[0]?.lon,
                    });
                  }}                 
                 />
                 {/* <CitySearch/> */}
                <Button variant='outline' size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching}>
                    <RefreshCw className={`h-4 w-4  ${weatherQuery.isFetching ? "animate-spin" : ""}  `} />
                </Button>

            </div>
            <div className='flex justify-between'>
                <div className=''>
                    <aside className='w-52 border rounded-md p-4'>
                        <ul>
                            <li
                                className={`border rounded-md p-2 my-2 shadow-md cursor-pointer ${selectedWeather.temp ? "bg-gray-200/60 backdrop-blur-md " : ""}`}
                                onClick={() => setSelectedWeather({ temp: true, feels_like: false, wind: false, humidity: false, pressure: false })}
                            >Temp
                            </li>
                            <li
                                onClick={() => setSelectedWeather({ temp: false, feels_like: true, wind: false, humidity: false, pressure: false })}
                                className={`border rounded-md p-2 my-2 shadow-md cursor-pointer ${selectedWeather.feels_like ? "bg-gray-200/60 backdrop-blur-md " : ""}`}>
                                Feel Like
                            </li>
                            <li
                                onClick={() => setSelectedWeather({ temp: false, feels_like: false, wind: true, humidity: false, pressure: false })}
                                className={`border rounded-md p-2 my-2 shadow-md cursor-pointer ${selectedWeather.wind ? "bg-gray-200/60 backdrop-blur-md " : ""}`}>
                                Wind
                            </li>
                            <li
                                onClick={() => setSelectedWeather({ temp: false, feels_like: false, wind: false, humidity: true, pressure: false })}
                                className={`border rounded-md p-2 my-2 shadow-md cursor-pointer ${selectedWeather.humidity ? "bg-gray-200/60 backdrop-blur-md " : ""}`}>
                                Humidity
                            </li>
                            <li
                                onClick={() => setSelectedWeather({ temp: false, feels_like: false, wind: false, humidity: false, pressure: true })}
                                className={`border rounded-md p-2 my-2 shadow-md cursor-pointer ${selectedWeather.pressure ? "bg-gray-200/60 backdrop-blur-md " : ""}`}>
                                Pressure
                            </li>
                        </ul>
                    </aside>
                </div>
                <div className='flex flex-col items-center '>
                    <CurrentWeather location={locationName} data={weatherQuery.data} selectedWeather={selectedWeather} />
                    <ForecastAccordion forecastData = {forecastQuery.data?.list} />
                </div>
                <div className='w-52'>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
