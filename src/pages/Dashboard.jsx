import CurrentWeather from '@/components/CurrentWeather';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/utils/geoLocation';
import { fetchedWeatherQuery, useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/utils/useWeather';
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';



const Dashboard = () => {
   const {coordinates,getLocation ,error,isLoading} = useGeoLocation();

    const weatherQuery = useWeatherQuery(coordinates);
    console.log(weatherQuery,"Weather Query");
    const forecastQuery = useForecastQuery(coordinates);
    console.log(forecastQuery,"forecast Query");
    const locationQuery = useReverseGeocodeQuery();
    // console.log(weatherQuery.data);
    const handleRefresh = () =>{
        getLocation()
        if(coordinates){
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    }

    if(isLoading){
        return <LoadingSkeleton/>
    }

    if(error){
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
    if(!coordinates){
        return    <Alert variant="destructive">
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
    console.log(locationQuery,"location");

    if(weatherQuery.error || forecastQuery.error || locationQuery.error){
        return    <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
         <p> Please enable your location to see the weather.</p>
         <Button onClick={handleRefresh} variant={"outline"}>
           <RefreshCw className='mr-2 h-4 w-4'/>
         </Button>
        </AlertDescription>
      </Alert>
    }
    if(!weatherQuery.data || !forecastQuery.data){
        <LoadingSkeleton/>
    }
    return (
        <div className='space-y-4'>
            <div className='flex justify-between items-center '>
                <h1 className='flex items-center text-base'>Location</h1>
                <Button variant='outline' size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching}>
                    <RefreshCw className={`h-4 w-4  ${weatherQuery.isFetching ? "animate-spin":""}  `}/>
                </Button>
                
            </div>
            <div>
                <div>
                    <CurrentWeather location={locationName} data={weatherQuery.data}/> 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
