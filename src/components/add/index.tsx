'use client';

import { sfProDisplay } from "@/app/font/font";
import Image from "next/image";
import { useState } from "react";

type AddFlightProps = {
    isOpen: boolean,
    setOpen: (open: boolean) => void
    className?: string
}

export default function AddFlight ({isOpen, setOpen, className}: AddFlightProps) {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step === 4) {
            setStep(1);
            setOpen(false);
        } else {
            setStep(step + 1);
        }
    }
    const handleBack = () => {
        if (step === 1) {
            setOpen(false);
        } else {
            setStep(step - 1);
        }
    }

    return (
        <>
        <div className={`fixed w-screen h-screen flex flex-col gap-4 p-6 duration-200 bg-white ${isOpen ? "" : "translate-y-full"} ${className}`}>
            <div className="flex justify-between gap-3 pt-6">
                {new Array(4).fill(1).map((_, i) => (
                    <div key={`progressbar_${i}`} className="w-1/4 h-1 rounded-md bg-gray-400">
                        <div className={`h-full duration-200 bg-[#007AFF] rounded-md ${step > i ? "w-full" : 'w-0'}`}></div>
                    </div>
                ))}
            </div>
            <div className={`flex-1 relative w-full`}>
                <div className="absolute w-full flex flex-col gap-4">
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
                        {/* <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-700">Boarding starts in:</p>
                            <p className="text-lg">55 minutes </p>
                        </div> */}
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
            <div className="flex justify-between gap-4 px-6 py-2 text-lg">
                <button onClick={handleBack} className="border border-gray-300 text-gray-300 rounded-lg px-6 py-1">Back</button>
                <button onClick={handleNext} className="bg-[#007AFF] rounded-lg text-white px-6 py-1">Next</button>
            </div>
        </div>
        </>
    )
}