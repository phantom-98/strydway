import { IAirline, IAirport, ICity } from "@/utils/types"
import axios from "axios"

const baseURL = process.env.AVIATION_API
const accessKey = process.env.AVIATION_API_ACCESS_KEY

const api = axios.create({
    baseURL
})

export const getFlights = async (keyword: string): Promise<any[]> => {
    let params = '';
    const airlines = await getAirlines(keyword);
    const airline = airlines.find(airline => airline.airline_name?.toLowerCase() === keyword.toLowerCase() || airline.iata_code?.toLowerCase() === keyword.toLowerCase());
    if (airline) {
        params = 'airline_iata=' + airline.iata_code
    } else {
        const airports = await getAirports(keyword);
        
        const airport = airports.find(airport => airport.airport_name?.toLowerCase() === keyword.toLowerCase() || airport.iata_code?.toLowerCase() === keyword.toLowerCase());
        if (airport) {
            params = 'arr_iata=' + airport.iata_code;
        } else {
            const cities = await getCities(keyword);
            const city = cities.find(city => city.city_name?.toLowerCase() === keyword.toLowerCase() || city.iata_code.toLowerCase() === keyword.toLowerCase())
            if (city) {
                params = 'arr_iata=' + city.iata_code
            } else {
                params = 'flight_iata=' + keyword
            }
        }
    }

    return api.get(`/flights?access_key=${accessKey}&${params}`)
        .then(res => res.data.data)
        .catch(err => []);
}

export const getAirlines = async (keyword: string): Promise<IAirline[]> => {

    return api.get(`/airlines?access_key=${accessKey}&search=${keyword}`)
        .then(res => res.data.data)
        .catch(err => [])
}

export const getCities = async (keyword: string): Promise<ICity[]> => {
    return api.get(`/cities?access_key=${accessKey}&search=${keyword}`)
        .then(res => res.data.data)
        .catch(err => []);
}

export const getAirports = async (keyword: string): Promise<IAirport[]> => {
    return api.get(`/airports?access_key=${accessKey}&search=${keyword}`)
        .then(res => res.data.data)
        .catch(err => []);
}