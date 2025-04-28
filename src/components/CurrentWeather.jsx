import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Sun, Wind, Cloud, Thermometer } from 'lucide-react';

const CurrentWeather = ({ data, location, selectedWeather }) => {
    const [isCelsius, setIsCelsius] = useState(true);

    // If no data, return null
    if (!data || !selectedWeather) return null;

    // Calculate the display value based on selected weather options
    const displayValue =
        selectedWeather.temp
            ? data?.main?.temp
            : selectedWeather.feels_like
                ? data?.main?.feels_like
                : selectedWeather.wind
                    ? data?.wind?.speed
                    : selectedWeather.humidity
                        ? data?.main?.humidity
                        : selectedWeather.pressure
                            ? data?.main?.pressure
                            : null;

    // Toggle Celsius/Fahrenheit
    const toggleUnit = () => {
        setIsCelsius(!isCelsius);
    };

    const temperature = isCelsius
        ? displayValue !== null
            ? `${Math.round(displayValue)}°C`
            : "N/A"
        : displayValue !== null
            ? `${Math.round(displayValue * 9 / 5 + 32)}°F`
            : "N/A";

    // Format sunrise and sunset times
    const sunrise = new Date(data?.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data?.sys?.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Weather condition (clear, clouds, rain, etc.)
    const weatherCondition = data?.weather?.[0]?.main.toLowerCase() || "clear";

    return (
        <div>
            <Card className="w-[350px] shadow-lg rounded-2xl bg-white/70 backdrop-blur-lg p-6">
                <CardHeader className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-800">{data?.name || location}</h1>
                    <p className="text-sm text-gray-500">{location}</p>
                </CardHeader>

                <div className='flex justify-center mb-4'>
                    <button onClick={toggleUnit} className="px-6 py-2 bg-gray-300 rounded-lg text-gray-700 font-medium">
                        {isCelsius ? "°F" : "°C"}
                    </button>
                </div>

                <CardContent className="flex flex-col items-center justify-center space-y-6">
                    <div className="text-5xl font-extrabold text-gray-800">
                        {temperature}
                    </div>

                    {/* Weather condition icons */}
                    <div className="flex items-center space-x-2 text-xl text-gray-600">
                        {weatherCondition === 'clear' && <Sun />}
                        {weatherCondition === 'clouds' && <Cloud />}
                        {weatherCondition === 'rain' && <Cloud />}
                        {weatherCondition === 'wind' && <Wind />}
                        {selectedWeather.temp && <Thermometer />}
                    </div>

                    {/* Optional extra details */}
                    <div className="text-sm text-gray-500 space-y-1 text-center">
                        {selectedWeather.temp && <p>Temperature</p>}
                        {selectedWeather.feels_like && <p>Feels Like</p>}
                        {selectedWeather.wind && <p>Wind Speed</p>}
                        {selectedWeather.humidity && <p>Humidity</p>}
                        {selectedWeather.pressure && <p>Pressure</p>}
                    </div>

                    {/* Sunrise and Sunset */}
                    <div className="text-sm text-gray-500 mt-4">
                        <p>🌅 Sunrise: {sunrise}</p>
                        <p>🌇 Sunset: {sunset}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CurrentWeather;
