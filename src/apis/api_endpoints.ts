import axios from "axios"


export const getFlights = async (keyword: string) => {
    const res = await axios.get(`/api/flights?keyword=${keyword}`);
    return res.data.flights
}