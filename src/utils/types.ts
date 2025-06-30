

export interface ICity {
    city_name: string,
    iata_code: string
}

export interface IAirline {
    airline_name: string,
    iata_code: string
}

export interface IAirport {
    airport_name: string,
    iata_code: string
}

export type GeoPosition = {
    latitude: number,
    longitude: number
}