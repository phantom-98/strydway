'use client';
import { flights } from "@/utils/constants";
import Flight from "./flight";
import { useState } from "react";
import Image from "next/image";
import { sfProDisplay } from "@/app/font/font";



export default function Flights () {
    const [step, setStep] = useState(1);

    return (
        <>
        <div className={`fixed w-full h-full flex flex-col overflow-auto pb-20 duration-200 transition-all ${step > 1 ? '-translate-x-full' : ''}`}>
            <div className="flex justify-end">
                <span className="text-blue-400 p-4">Edit</span>
            </div>
            <h1 className="font-extrabold text-4xl ml-4 font-title">My Flights</h1>
            <div className="ml-4 mt-4 border-t border-gray-300 flex flex-col">
                {flights.map((flight, index) => (
                    <Flight key={`flight_` + index} {...flight} onTap={() => {
                        setStep(2);
                    }}/>
                ))}
            </div>
        </div>

        <div className={`fixed w-full h-full flex flex-col duration-200 transition-all overflow-auto pb-20 ${step > 2 ? '-translate-x-full' : step < 2 ? 'translate-x-full' : ''}`}>
            <div className="relative h-2/5">
                <Image src={'/images/airport.webp'} alt="airport" width={640} height={640} className="h-full object-cover"/>
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-black mask-[linear-gradient(#0000_60%,#000C)]"></div>
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-4">
                    <div onClick={() => setStep(1)} className="sticky top-4"><Image src={'/icons/previous.svg'} alt="<" width={20} height={20} className="w-4"/></div>
                    <div className="flex items-center gap-4 sticky top-16">
                        <div className="rounded-full border border-[#0A1D3D] bg-white size-16 p-1">
                            <Image src={'/logos/Lufthansa.svg'} alt="<" width={20} height={20} className="w-full h-full rounded-full"/>
                        </div>
                        <div className={`flex flex-col ${sfProDisplay.className}`}>
                            <p className="text-3xl font-bold text-white">Munich Airport</p>
                            <p className="text-2xl font-bold text-white">Lufthansa</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 p-4">
                <div className="w-full flex justify-between px-2 py-4">
                    <div className="flex flex-col items-center">
                        <span className="font-title font-black text-4xl">MUC</span>
                        <span className={`font-semibold text-xl ${sfProDisplay.className}`}>10:55</span>
                        <span className="font-semibold text-sm">Mon 21 Mar</span>
                    </div>
                    <div className="">
                        <Image src={'/icons/plane.svg'} alt="p" width={20} height={20} className="w-10 mt-1"/>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-title font-black text-4xl">MUC</span>
                        <span className={`font-semibold text-xl ${sfProDisplay.className}`}>10:55</span>
                        <span className="font-semibold text-sm">Mon 21 Mar</span>
                    </div>
                </div>

                <div className="flex flex-col p-4 gap-4 rounded-lg bg-[#F2F2F7]">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Flight Number:</span>
                        <span className="text-lg">LH2656 (Barcelona)</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Airline:</span>
                        <div className="flex items-center gap-2">
                            <Image src={'/logos/Lufthansa.svg'} alt="lufthansa" width={20} height={20} className="size-8 rounded-full border border-[#0A1D3D]"/>
                            <span className="text-[#0A1D3D] font-extrabold text-2xl">Lufthansa</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-700">Departure Airport:</p>
                        <p className="text-lg">Munich International Airport Franz Josef Strauss </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white rounded-lg p-4 w-1/2">
                            <p className="text-sm text-gray-700">Terminal:</p>
                            <p className="font-title font-black text-4xl text-center">2</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 w-1/2">
                            <p className="text-sm text-gray-700">Gate:</p>
                            <p className="font-title font-black text-4xl text-center">K6</p>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-700">Don’t you fly today? </p>
                <div className="flex gap-2 -mt-3">
                    <Image src={'/icons/calender.svg'} alt="c" width={20} height={20} className="w-5"/>
                    <span className="text-[#007AFF]">Select your flight date</span>
                </div>
            </div>
        </div>
        </>
    )
}