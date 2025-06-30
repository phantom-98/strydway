'use client';
import { useEffect, useState, lazy } from 'react';

const MapsIndoorsMap = lazy(() => import('@mapsindoors/map-template/dist/mapsindoors-react.es.js'));

export default function IndoorsMap () {
    const [client, setClient] = useState(false)

    useEffect(() => setClient(true), [])

    return (
        <>
        {client ? (
            <MapsIndoorsMap
                apiKey={process.env.NEXT_PUBLIC_MAPSINDOORS_API_KEY}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                directionsFrom="fcaab73b8ba14be493c232f2"
                directionsTo="2595ba7eff624f0994f7d915"
                center="-122.38988,37.615215"
            ></MapsIndoorsMap>
        ) : (
            <></>
        )}
        </>
    )
}