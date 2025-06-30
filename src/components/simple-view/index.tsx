'use client';
import Image from "next/image";
import { useRef, useState } from "react"
import Flight from "../flight/flight";
import { flights } from "@/utils/constants";
import { sfProDisplay } from "@/app/font/font";
import NavBar from "../navbar/new-bar";
import { getFlights } from "@/apis/api_endpoints";
import Spinner from "../spinner";



export default function SimpleView () {
    const timer = useRef<any>(-1)
    const [spinner, setSpinner] = useState(false);
    const [search, setSearch] = useState('')
    const [flight, setFlight] = useState<any>()
    const [flights, setFlights] = useState<any[]>()
    const [step, setStep] = useState(1);

    const handleSearch = () => {
        setFlights(undefined);
        getFlights(search).then(flights => setFlights(
            flights
                // .filter((f: any) => f.departure.estimated >= new Date().toISOString())
                .toSorted((a: any, b: any) => { return a.departure.estimated < b.departure.estimated ? 1 : -1})
                // .map((f: any) => ({
                //     logo: '/logos/Lufthansa.svg',
                //     title: f.departure.airport,
                //     from: f.departure.iata,
                //     to: f.arrival.iata,
                //     date: new Date(f.departure.estimated).toLocaleString()
                // }))
            )).catch();
        handleNext();
    }
    const handleNext = () => {
        step < 4 && setStep(step + 1)
    }
    const handleBack = () => {
        step > 1 && setStep(step - 1)
    }

    return (
        <>
        <div className="w-screen h-screen">
            <div className={`fixed top-0 left-0 bottom-0 right-0 flex flex-col bg-white px-6 pt-24 gap-16 duration-200 ${step > 1 ? '-translate-x-full' : ''}`}>
                <Image src={'/images/plane.webp'} priority alt="P" width={640} height={1200} className="fixed bottom-0 left-0 right-0"/>
                <div className="flex flex-col w-full gap-2 font-bold font-title z-10">
                    <p className="text-xl">Let’s find out how to get</p>
                    <p className="text-3xl">To The Plane!</p>
                </div>

                <div className="flex flex-col w-full gap-4 z-10">
                    <p className="text-sm text-gray-400">Search by flight number, airline or destination</p>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ex. AA5555" className="bg-gray-100 rounded-md text-lg py-2 px-4 outline-[#007AFF]"/>
                    <button onClick={handleSearch} className="text-lg text-center text-white p-2 bg-[#007AFF] rounded-md hover:bg-blue-400">Find your flight</button>
                </div>
            </div>

            <div className={`fixed top-0 bottom-0 left-0 right-0 flex flex-col overflow-auto pt-12 pb-12 duration-200 ${step > 2 ? '-translate-x-full' : step < 2 ? 'translate-x-full' : ''}`}>
                <p onClick={() => setStep(1)} className="text-lg text-gray-400 ml-4 mb-4">Back</p>
                <h1 className="font-extrabold text-4xl ml-4 font-title">Flights</h1>
                <div className="ml-4 mt-4 border-t border-gray-300 flex flex-col">
                    {flights === undefined ? (
                        <>
                        <div className="w-full h-96 flex items-center justify-center">
                            <Spinner />
                        </div>
                        </>
                    ) : flights.length === 0 ? (
                        <>
                        <div className="w-full h-96 flex items-center justify-center text-gray-400">
                            Nothing to show
                        </div>
                        </>
                    ) : (
                        flights.map((flight, index) => (
                            <Flight key={`flight_` + index} {...flight} 
                                logo="/logos/Lufthansa.svg"
                                title={flight.departure.airport}
                                from={flight.departure.iata}
                                to={flight.arrival.iata}
                                date={new Date(flight.departure.estimated).toLocaleString()}
                                onTap={() => {
                                    setFlight({
                                        ...flight,
                                        from: {
                                            name: flight.departure.iata,
                                            date: new Date(flight.departure.estimated).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'}),
                                            time: new Date(flight.departure.estimated).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false})
                                        },
                                        to: {
                                            name: flight.arrival.iata,
                                            date: new Date(flight.arrival.estimated).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'}),
                                            time: new Date(flight.arrival.estimated).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false})
                                        }
                                    });
                                    clearInterval(timer.current)
                                    timer.current = setInterval(() => {
                                        setFlight((prev: any) => prev ? ({
                                            ...prev,
                                            toOnboarding: Math.floor((new Date(flight.departure.estimated).getTime() - Date.now()) / 60000)
                                        }): undefined)
                                    }, 1000)
                                    handleNext();
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className={`fixed top-0 bottom-0 left-0 right-0 flex flex-col gap-8 overflow-auto px-6 pt-12 pb-20 duration-200 ${step > 3 ? '-translate-x-full' : step < 3 ? 'translate-x-full' : ''}`}>

                {flight ? (
                    <>
                    <p onClick={() => setStep(2)} className="text-lg text-gray-400">Back</p>
                        <div className="flex justify-between gap-3">
                            {new Array(4).fill(1).map((_, i) => (
                                <div key={`progressbar_${i}`} className="w-1/4 h-1 rounded-md bg-gray-400">
                                    <div className={`h-full duration-200 bg-[#007AFF] rounded-md ${i === 0 ? "w-full" : 'w-0'}`}></div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full flex justify-between px-2 py-4">
                            <div className="flex flex-col items-center">
                                <span className="font-title font-black text-4xl">{flight.from.name}</span>
                                <span className={`font-semibold text-xl ${sfProDisplay.className}`}>{flight.from.time}</span>
                                <span className="font-semibold text-sm">{flight.from.date}</span>
                            </div>
                            <div className="">
                                <Image src={'/icons/plane.svg'} alt="p" width={20} height={20} className="w-10 mt-1"/>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-title font-black text-4xl">{flight.to.name}</span>
                                <span className={`font-semibold text-xl ${sfProDisplay.className}`}>{flight.to.time}</span>
                                <span className="font-semibold text-sm">{flight.to.date}</span>
                            </div>
                        </div>

                        <div className="flex flex-col p-4 pb-24 gap-4 rounded-lg bg-[#F2F2F7]">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Flight Number:</span>
                                <span className="text-lg">{flight.flight.iata}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Airline:</span>
                                <div className="flex items-center gap-2">
                                    <Image src={'/logos/Lufthansa.svg'} alt="lufthansa" width={20} height={20} className="size-8 rounded-full border border-[#0A1D3D]"/>
                                    <span className="text-[#0A1D3D] font-extrabold text-2xl">{flight.airline.name}</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-sm text-gray-700">Departure Airport:</p>
                                <p className="text-lg">{flight.departure.airport}</p>
                            </div>
                            
                        </div>

                        <div className={`flex justify-between gap-4 px-12 pt-2 pb-6 text-lg fixed bottom-0 left-0 right-0`}>
                            <button onClick={handleBack} className="border border-gray-100 text-gray-400 rounded-lg w-24 py-1">Back</button>
                            <button onClick={handleNext} className={`bg-[#007AFF] rounded-lg text-white w-24 py-1`}>Next</button>
                        </div>
                    </>
                ) : (<></>)}
            </div>

            <div className={`fixed top-0 bottom-0 left-0 right-0 flex flex-col duration-200 overflow-auto pb-12 ${step < 4 ? 'translate-x-full' : ''}`}>
                {flight ? (
                    <>
                    <div className="relative h-2/5">
                        <Image src={'/images/airport.webp'} priority alt="airport" width={640} height={640} className="h-full object-cover"/>
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black" style={{maskImage: `linear-gradient(#0000 60%,#000C)`}}></div>
                        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-4">
                            <div onClick={handleBack} className="sticky top-4"><Image src={'/icons/previous.svg'} alt="<" width={20} height={20} className="w-4 z-10"/></div>
                            <div className="flex items-center gap-4">
                                <div className="rounded-full border border-[#0A1D3D] bg-white size-16 p-1">
                                    <Image src={'/logos/Lufthansa.svg'} alt="<" width={20} height={20} className="w-full h-full rounded-full"/>
                                </div>
                                <div className={`flex flex-col ${sfProDisplay.className}`}>
                                    <p className="text-3xl font-bold text-white">{flight.departure.airport}</p>
                                    <p className="text-2xl font-bold text-white">{flight.airline.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 p-4">
                        <div className="w-full flex justify-between px-2 py-4">
                            <div className="flex flex-col items-center">
                                <span className="font-title font-black text-4xl">{flight.from.name}</span>
                                <span className={`font-semibold text-xl ${sfProDisplay.className}`}>{flight.from.time}</span>
                                <span className="font-semibold text-sm">{flight.from.date}</span>
                            </div>
                            <div className="">
                                <Image src={'/icons/plane.svg'} alt="p" width={20} height={20} className="w-10 mt-1"/>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-title font-black text-4xl">{flight.to.name}</span>
                                <span className={`font-semibold text-xl ${sfProDisplay.className}`}>{flight.to.time}</span>
                                <span className="font-semibold text-sm">{flight.to.date}</span>
                            </div>
                        </div>
        
                        <div className="flex flex-col p-4 gap-4 rounded-lg bg-[#F2F2F7]">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Flight Number:</span>
                                <span className="text-lg">{flight.flight.iata}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Airline:</span>
                                <div className="flex items-center gap-2">
                                    <Image src={'/logos/Lufthansa.svg'} alt="lufthansa" width={20} height={20} className="size-8 rounded-full border border-[#0A1D3D]"/>
                                    <span className="text-[#0A1D3D] font-extrabold text-2xl">{flight.airline.name}</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-sm text-gray-700">Boarding starts in:</p>
                                {flight.toOnboarding > 0 ? (
                                    <p className="text-3xl font-black">{flight.toOnboarding > 60 ? `${Math.floor(flight.toOnboarding / 60)} h ` : ''}{flight.toOnboarding % 60} min </p>
                                ) : (
                                    <p className="text-3xl font-black">Boarded already</p>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white rounded-lg p-4 w-1/2">
                                    <p className="text-sm text-gray-700">Terminal:</p>
                                    <p className="font-title font-black text-4xl text-center">{flight.departure.terminal}</p>
                                </div>
        
                                <div className="bg-white rounded-lg p-4 w-1/2">
                                    <p className="text-sm text-gray-700">Gate:</p>
                                    <p className="font-title font-black text-4xl text-center">{flight.departure.gate}</p>
                                </div>
                            </div>
                        </div>
                        {/* <p className="text-sm text-gray-700">Don’t you fly today? </p>
                        <div className="flex gap-2 -mt-3">
                            <Image src={'/icons/calender.svg'} alt="c" width={20} height={20} className="w-5"/>
                            <span className="text-[#007AFF]">Select your flight date</span>
                        </div> */}
                    </div>
                    </>
                ) : <></>}
            </div>
            {(step === 2 || step === 4) && <NavBar />}
        </div>
        </>
    )
}