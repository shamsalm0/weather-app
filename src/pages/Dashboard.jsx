import CitySearch from '@/components/CitySearch';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastAccordion from '@/components/ForecastAccordion';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/utils/geoLocation';
import { fetchedWeatherQuery, useForecastQuery, useLocationSearchQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/utils/useWeather';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk';
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { coordinates, getLocation, error, isLoading } = useGeoLocation();
    const [selectedWeather, setSelectedWeather] = useState({
        temp: true,
        feels_like: false,
        wind: false,
        humidity: false,
        pressure: false,
    });
    const [searchInput, setSearchInput] = useState('');
    const [debouncedInput, setDebouncedInput] = useState('');
    const [coord, setCoord] = useState(coordinates);
    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        if (coordinates && !coord) {
            setCoord(coordinates);
        }
    }, [coordinates, coord]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedInput(searchInput);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const weatherQuery = useWeatherQuery(coord);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery();
    const searchLocation = useLocationSearchQuery(debouncedInput);

    useEffect(() => {
        if (searchLocation?.data?.[0]) {
            setCoord({
                lat: searchLocation.data[0].lat,
                lon: searchLocation.data[0].lon,
            });
        }
    }, [searchLocation.data]);

    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    <p>Please enable your location to see the weather.</p>
                    <Button onClick={getLocation} variant="outline" className="mt-2 flex items-center justify-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription>
                    <p>Please enable your location to see the weather.</p>
                    <Button onClick={getLocation} variant="outline" className="mt-2 flex items-center justify-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error || locationQuery.error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription>
                    <p>Please enable your location to see the weather.</p>
                    <Button onClick={handleRefresh} variant="outline" className="mt-2 flex items-center justify-center">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-4 p-4 max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <h1 className="text-lg font-semibold flex items-center">Location</h1>

                <div className="flex items-center w-full sm:w-auto space-x-2">
                    <input
                        type="text"
                        className="flex-grow sm:flex-grow-0 sm:w-64 border rounded-md px-4 py-2 placeholder:text-muted-foreground dark:text-black"
                        placeholder="Search for a city..."
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setSearchInput(newValue);
                            setSavedLocations(prev => prev.includes(newValue) ? prev : [...prev, newValue]);
                        }}

                        value={searchInput}
                    />
                    
                    <Button variant="outline" size="icon" onClick={handleRefresh} disabled={weatherQuery.isFetching}>
                        <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full lg:w-52 border rounded-md p-4 flex-shrink-0">
                    <ul>
                        {[
                            { key: 'temp', label: 'Temp' },
                            { key: 'feels_like', label: 'Feel Like' },
                            { key: 'wind', label: 'Wind' },
                            { key: 'humidity', label: 'Humidity' },
                            { key: 'pressure', label: 'Pressure' },
                        ].map(({ key, label }) => (
                            <li
                                key={key}
                                onClick={() =>
                                    setSelectedWeather({
                                        temp: key === 'temp',
                                        feels_like: key === 'feels_like',
                                        wind: key === 'wind',
                                        humidity: key === 'humidity',
                                        pressure: key === 'pressure',
                                    })
                                }
                                className={`border rounded-md p-2 my-2 shadow-md cursor-pointer ${selectedWeather[key] ? 'bg-gray-200/60 backdrop-blur-md' : ''
                                    }`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Weather Info */}
                <main className="flex flex-col flex-grow items-center">
                    <CurrentWeather location={locationName} data={weatherQuery.data} selectedWeather={selectedWeather} />
                    <ForecastAccordion forecastData={forecastQuery.data?.list} />
                </main>

                {/* Empty Right Sidebar (Reserved) */}
                <div className="w-full lg:w-52 hidden lg:block"></div>
            </div>
        </div>
    );
};

export default Dashboard;

