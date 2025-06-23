import Image from "next/image";
import Link from "next/link";



export default function NavBar () {

    return (
        <>
        <div className="fixed left-0 bottom-0 right-0 flex rounded-full bg-[#F2F2F7] items-center justify-evenly h-12">
            <Link href={`#`} className={``}>
                <Image src={'/icons/flight.svg'} alt="flight" width={20} height={20} className="w-8" />
            </Link>
            <Link href={`#`} className={``}>
                <Image src={'/icons/pointer.png'} alt="pointer" width={20} height={20} className="w-8" />
            </Link>
            <Link href={`#`} className={``}>
                <Image src={'/icons/chat.png'} alt="chat" width={20} height={20} className="w-8" />
            </Link>
            <Link href={`#`} className={``}>
                <Image src={'/icons/offer.png'} alt="offer" width={20} height={20} className="w-8" />
            </Link>
            <Link href={`#`} className={``}>
                <Image src={'/icons/shopping-cart.png'} alt="shopping-cart" width={20} height={20} className="w-8" />
            </Link>
        </div>
        </>
    )
}