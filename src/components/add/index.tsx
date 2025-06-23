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
    const handleSkip = () => {
        setOpen(false);
        setStep(1)
    }

    return (
        <>
        <div className={`z-20 fixed top-0 left-0 right-0 bottom-0 flex flex-col gap-4 duration-200 bg-white ${isOpen ? "" : "translate-y-full"} ${className}`}>
            <p onClick={handleSkip} className="p-6 text-lg text-gray-400">Skip</p>
            <div className="flex justify-between gap-3 px-6">
                {new Array(4).fill(1).map((_, i) => (
                    <div key={`progressbar_${i}`} className="w-1/4 h-1 rounded-md bg-gray-400">
                        <div className={`h-full duration-200 bg-[#007AFF] rounded-md ${step > i ? "w-full" : 'w-0'}`}></div>
                    </div>
                ))}
            </div>
            <div className={`flex-1 relative w-full`}>
                <div className={`absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-4 px-6 duration-200 ${step > 1 ? '-translate-x-full' : ''}`}>
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

                <div className={`absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-10 px-6 duration-200 ${step > 2 ? '-translate-x-full' : step <= 1 ? 'translate-x-full' : ''}`}>
                    <p className="font-title font-black text-5xl">Get your documents ready</p>
                    <p className="text-xl text-black">You will need the following documents:</p>
                    <div className="w-full flex flex-col justify-between px-6 text-xl gap-6">
                        <div className="flex items-center gap-2">
                            <Image src={'/icons/pwd.svg'} alt="p" width={20} height={20} className="w-6 mt-1"/>
                            <p>Passport or id card.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={'/icons/qr.svg'} alt="p" width={20} height={20} className="w-6 mt-1"/>
                            <p>Boarding pass.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image src={'/icons/covid.svg'} alt="p" width={20} height={20} className="w-6 mt-2"/>
                            <p> COVID-19 Passport<br/> or negaive PCR test. </p>
                        </div>
                        <div></div>
                        <div className="flex items-center justify-center gap-6 py-2 bg-black text-white rounded-lg">
                            <Image src={'/icons/apple wallet.svg'} alt="p" width={20} height={20} className="w-8"/>
                            <p> Open Apple Wallet </p>
                        </div>
                    </div>
                </div>

                <div className={`absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-12 px-6 duration-200 ${step > 3 ? '-translate-x-full' : step <= 2 ? 'translate-x-full' : ''}`}>
                    <p className="font-title font-black text-5xl">Any baggage to drop off?</p>
                    <p className="text-xl text-black"><b>Tap yes</b> if you need to drop off large suitcases or you don’t have the boarding pass yet.</p>
                    <p className="text-xl text-black"><b>Tap no</b> if you don’t need to go to Lufthansa desk first and you can go directly to the security checkpoint.</p>
                    <div className="w-full flex flex-col justify-between px-6 mt-8 text-xl gap-6">
                        
                        <div onClick={handleNext} className="flex items-center justify-evenly py-2 bg-[#007AFF] text-white rounded-lg">
                            <Image src={'/icons/shopcart.svg'} alt="p" width={20} height={20} className="w-8"/>
                            <p>Yes, go to Luftansa desk</p>
                        </div>
                        <div className="flex items-center justify-evenly py-2 bg-[#007AFF] text-white rounded-lg">
                            <Image src={'/icons/no.svg'} alt="p" width={20} height={20} className="w-4.5"/>
                            <p>No, go to security chekpoint</p>
                        </div>
                    </div>
                </div>

                <div className={`absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-12 px-6 duration-200 ${step <= 3 ? 'translate-x-full' : ''}`}>
                    <p className="font-title font-black text-[2.5rem]">Relax,<br/>You are on time!</p>
                    <Image src={'/images/map.webp'} alt="m" width={640} height={800} className="fixed left-0 bottom-0 right-0"/>
                </div>
            </div>
                <div className={`flex justify-between gap-4 px-12 pt-2 pb-6 text-lg ${step === 4 ? 'fixed bottom-0 left-0 right-0' : ''}`}>
                    <button onClick={handleBack} className="bg-[#F2F2F7CC] border border-gray-100 text-gray-400 rounded-lg w-24 py-1">Back</button>
                    <button onClick={handleNext} className={`bg-[#007AFF] rounded-lg text-white w-24 py-1 ${step === 3 ? 'invisible' : ''}`}>Next</button>
                </div>
        </div>
        </>
    )
}