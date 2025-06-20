'use client';
import Image from "next/image"


type FlightProps = {
    logo: string,
    title: string,
    from: string,
    to: string,
    date: string,
    onTap?: () => void
}

export default function Flight ({ logo, title, from, to, date, onTap }: FlightProps) {

    return (
        <>
        <div onClick={onTap} className="flex flex-row items-center gap-4 py-2 pr-4 border-b border-gray-300">
            <div className="size-14 border border-gray-300 rounded-full">
                <Image src={logo} alt="title" width={100} height={100} className="rounded-full w-full h-full"/>
            </div>
            <div className="flex flex-col flex-1">
                <p className="text-lg font-extrabold">{title}</p>
                <div className="text-sm flex items-center gap-2">
                    <span>{from}</span> 
                    <Image src={'/icons/plane.svg'} alt="p" width={16} height={16} className=""/> 
                    <span>{to}</span>
                </div>
                <p className="text-[#3C3C434D] text-sm">{date}</p>
            </div>
            {/* <div className="h-full"> */}
                <Image src={'/icons/right.svg'} width={20} height={20} alt=">" className="w-3"/>
            {/* </div> */}
        </div>
        </>
    )
}