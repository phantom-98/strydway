'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddFlight from "../add";
import { useState } from "react";

export default function NavBar () {
    const pathname = usePathname();
    const [showAddModal, setShowAddModal] = useState(false);
    return (
        <>
        <div className="fixed bottom-0 left-0 right-0 m-4 rounded-full h-12 bg-[#F6F7FA] shadow-xl flex items-center justify-evenly">
            <Link href={`/flight`} className={pathname === '/flight' ? '' : 'opacity-40'}>
                <Image src={'/icons/flight.svg'} alt="flight" width={20} height={20} className="w-8" />
            </Link>
            <div onClick={() => setShowAddModal(true)} className="size-18 rounded-full bg-[#007AFF] flex items-center justify-center">
                <Image src={'/icons/plus.svg'} alt="plus" width={20} height={20} className="w-8" />
            </div>
            <Link href={`/profile`} className={pathname === '/profile' ? '' : 'opacity-40'}>
                <Image src={'/icons/profile.svg'} alt="profile" width={20} height={20} className="w-8" />
            </Link>
        </div>
        <AddFlight isOpen={showAddModal} setOpen={setShowAddModal}/>
        </>
    )
}