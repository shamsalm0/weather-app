import { useQuery } from "@tanstack/react-query"
import { weatherAPI } from "./weather"
import axios from "axios"
import { useEffect, useState } from "react"

export const WEATHER_KEYS = {
    weather:(coords)=>["weather",coords] ,
    forecast:(coords)=>["forecast",coords],
    geocode:(coords)=>["georeverse",coords],
    search:(query)=>["location-search",query]
}
export const useWeatherQuery = (coordinates) =>{
       return useQuery({
        queryKey:WEATHER_KEYS.weather(coordinates ?? {lat:0, lon:0}),
        queryFn: ()=>coordinates? weatherAPI.getWeatherData(coordinates):null,
        enabled: !!coordinates
       })
}
export const fetchedWeatherQuery = async () => {
    try {
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?appid=cfa660651c17edd58b29610ac4633bc6&lat=0&lon=0&units=metric'
      );
      console.log(res.data, "res"); // use .data to see the actual response
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
  
  fetchedWeatherQuery(); // Call the function
  


export const useForecastQuery = (coordinates) =>{
    return useQuery({
     queryKey:WEATHER_KEYS.forecast(coordinates ?? {lat:0, lon:0}),
     queryFn: ()=>coordinates? weatherAPI.getForeCast(coordinates):Promise.resolve(null),
     enabled: !!coordinates
    })
}

export const useReverseGeocodeQuery = (coordinates) =>{
    return useQuery({
     queryKey:WEATHER_KEYS.geocode(coordinates ?? {lat:0, lon:0}),
     queryFn: ()=>coordinates? weatherAPI.getReverseGeoCode(coordinates):null,
     enabled: !!coordinates
    })
}

export const useLocationSearchQuery = (query) =>{
    return useQuery({
     queryKey:WEATHER_KEYS.search(query ?? ""),
     queryFn: ()=>query? weatherAPI.getLocationSearch(query):null,
     enabled: !!query
    })
}