import Image from "next/image";
import Link from "next/link";


export default function Find () {

    return (
        <>
        <div className="flex flex-col relative w-screen h-screen bg-white px-6 pt-24 gap-16">
            <Image src={'/images/plane.webp'} alt="P" width={640} height={1200} className="absolute bottom-0 left-0 right-0"/>
            <div className="flex flex-col w-full gap-2 font-bold font-title z-10">
                <p className="text-xl">Let’s find out how to get</p>
                <p className="text-3xl">To The Plane!</p>
            </div>

            <div className="flex flex-col w-full gap-4 z-10">
                <p className="text-sm text-gray-400">Search by flight number, airline or destination</p>
                <input placeholder="ex. AA5555" className="bg-gray-100 rounded-md text-lg py-2 px-4"/>
                <Link href={'/flight'} className="text-lg text-center text-white p-2 bg-[#007AFF] rounded-md hover:bg-blue-400">Find your flight</Link>
            </div>
        </div>
        </>
    )
}