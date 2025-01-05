export const api_config ={
    BASE_URL : "https://api.openweathermap.org/data/2.5",
    GEO: "http://api.openweathermap.org/geo/1.0",
    API_KEY: import.meta.env.VITE_WEATHER_KEY,
    DEFAULT_PARAMS: {
        units: "metric",
        app_id:import.meta.env.VITE_WEATHER_KEY
    }
}