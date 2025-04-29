import { api_config } from "./api";

class WeatherAPI {
    #createURL(endpoint, params) {
        const searchParams = new URLSearchParams({
            appid: api_config.API_KEY,
            ...params
        });
        console.log(searchParams)
        console.log(`${endpoint}?${searchParams.toString()}`)
        return `${endpoint}?${searchParams.toString()}`

    }

    async #fetchedData(url) {
        try {
            console.log(url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json(); // ✅ Parse and return the data
            return data;
        }
        catch (error) {
            console.error("Error fetching data:", error.message);
            throw error;
        }
    }

    async getWeatherData({ lat, lon }) {

        const url = this.#createURL(`${api_config.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: api_config.DEFAULT_PARAMS.units
        })
        console.log(url, "url")
        return this.#fetchedData(url);
    }

    async getForeCast({ lat, lon }) {

        const url = this.#createURL(`${api_config.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: api_config.DEFAULT_PARAMS.units
        })
        return this.#fetchedData(url);
    }

    async getReverseGeoCode({ lat, lon }) {

        const url = this.#createURL(`${api_config.BASE_URL}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: 1
        })
        console.log(url, "url")
        return this.#fetchedData(url);
    }

    async getLocationSearch(query) {
        const url = this.#createURL(`${api_config.GEO}/direct`, {
            q: query,
            limit: 1
        })
        return this.#fetchedData(url);
    }
}
console.log("base url", api_config.BASE_URL)
const weather = new WeatherAPI();
console.log(weather.getWeatherData({ lat: 0, lon: 0 }));
export const weatherAPI = new WeatherAPI();