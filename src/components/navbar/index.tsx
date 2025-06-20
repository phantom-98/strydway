'use client';
import Image from "next/image";


export default function NavBar () {
    return (
        <>
        <div className="fixed bottom-0 left-0 right-0 m-4 rounded-full h-12 bg-[#F6F7FA] shadow-xl flex items-center justify-evenly">
            <div className="">
                <Image src={'/icons/flight.svg'} alt="flight" width={20} height={20} className="w-8" />
            </div>
            <div className="size-18 rounded-full bg-[#007AFF] flex items-center justify-center">
                <Image src={'/icons/plus.svg'} alt="plus" width={20} height={20} className="w-8" />
            </div>
            <div className="">
                <Image src={'/icons/profile.svg'} alt="profile" width={20} height={20} className="w-8" />
            </div>
        </div>
        </>
    )
}