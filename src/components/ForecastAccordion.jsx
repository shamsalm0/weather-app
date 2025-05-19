import { dateFormat } from '@/utils/common';
import React, { useState } from 'react'
const ForecastAccordion = ({forecastData}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mt-6 p-4">
            <button onClick={toggleAccordion} className="w-full text-left bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-center">Next 7 Days Forecast</h3>
            </button>

            {isOpen && (
                <div className="mt-4 grid grid-cols-7 gap-4">
                    {forecastData.slice(0,7)?.map((forecast, index) => (
                        <div key={index} className="flex flex-col items-center border rounded-md p-3 bg-gray-200/60 backdrop-blur-md">
                            <p className="text-lg font-bold">{dateFormat(forecast.dt_txt)}</p>
                            <div className="text-2xl">{forecast.main.temp}°C</div>
                            <div>{forecast?.weather[0]?.main}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
  )
}

export default ForecastAccordion;