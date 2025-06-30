import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_MAPSINDOORS_API_KEY;

const api = axios.create({
    baseURL: `https://integration.mapsindoors.com`
})

export const getId = async (lat: number, lng: number, floor: number = 0) => {
    return api.get(`/${apiKey}/api/geocode?lat=${lat}&lng=${lng}&floor=${floor}`)
        .then(res => {
            // console.log(res.data)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        });

}