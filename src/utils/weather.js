const { api_config } = require("./api");

class WeatherAPI{
    #createURL(endpoint,params){
        const searchParams = new URLSearchParams({
            appid:api_config.API_KEY,
            ...params
        });

        return `${endpoint}?${searchParams.toString()}`
    }

   async #fetchedData (url){
        try{
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
        }
        catch(error){
            console.error("Error fetching data:", error.message);
            throw error; 
        }
    }

    async getWeatherData({lat,lon}){

        const url = this.#createURL(`${api_config.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:api_config.DEFAULT_PARAMS.units
        })
        return this.#fetchedData(url);
    }

    async getForeCast({lat,lon}){

        const url = this.#createURL(`${api_config.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:api_config.DEFAULT_PARAMS.units
        })
        return this.#fetchedData(url);
    }

    async getReverseGeoCode({lat,lon}){

        const url = this.#createURL(`${api_config.BASE_URL}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:1
        })
        return this.#fetchedData(url);
    }
}

export const weatherAPI = new WeatherAPI();