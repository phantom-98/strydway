import Image from "next/image";

type SpinnerProps = {
    className?: string
}

export default function Spinner ({ className }: SpinnerProps) {
    return (
        <Image src={`/icons/spinner.svg`} alt="o" width={32} height={32} className={`size-10 ${className}`}/>
    )
}