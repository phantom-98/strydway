'use client';
import { useEffect, useState } from "react";
import TabBar from "../tab/bar";
import Image from "next/image";
import { pathData, searchData } from "@/utils/constants";
import { Switch } from "../switch";
import { GeoPosition } from "@/utils/types";
import { getId } from "@/apis/mapsindoors";
import IndoorsMap from "../map";



export default function Search () {
    const [tab, setTab] = useState<'search' | 'map' | 'itinerary'>('search');
    const [departure, setDeparture] = useState('')
    const [step, setStep] = useState<'search' | 'desparture' | 'go'>('search');
    const [search, setSearch] = useState('');
    const [avoid, setAvoid] = useState(true);
    const [posFrom, setPosFrom] = useState<GeoPosition>({latitude:37.61593684499978, longitude:-122.3896589443288});
    const [posTo, setPosTo] = useState<GeoPosition>();

    useEffect(() => {
        getId(posFrom.latitude, posFrom.longitude).then(data => console.log({data}))
        const ptr = navigator.geolocation.watchPosition((pos) => {
            console.log({pos})
        });

        return () => {
            navigator.geolocation.clearWatch(ptr)
        }
    }, []);
    return (
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col">
            <div className="flex justify-end px-6 py-6">
                <span className="text-lg text-[#007AFF]">Done</span>
            </div>
            <TabBar options={[{
                id: 'search',
                label: 'Search'
            }, {
                id: 'map',
                label: 'Map',
            }, {
                id: 'itinerary',
                label: 'Itinerary'
            }]} value={tab} onChange={(v) => setTab(v as typeof tab)} className="w-[calc(100%-3rem)] mx-6 h-10 font-bold"/>
            <div className="flex-1 w-full relative">
                <div className={`absolute w-full h-full px-6 pt-4 duration-200 flex flex-col gap-4 ${tab === 'search' ? '' : '-translate-x-full'}`}>
                    <SearchInput placeholder="Choose departure point" defaultValue={departure} onConfirm={setDeparture} className={step === 'desparture' ? '' : 'hidden'}/>
                    <SearchInput placeholder="Search by name, category or building" defaultValue={search} onConfirm={(value) => {
                        setSearch(value);
                        setStep('search');
                    }} className={step === 'go' ? 'hidden' : ''}/>
                    
                    
                    <div className="flex-1 relative w-full">
                        <div className={`absolute flex flex-col gap-4 w-full h-full overflow-auto duration-200 ${(step !== 'search' || !search) ? 'translate-y-full' : ''}`}>
                            {searchData.filter(d => d.title.toLowerCase().includes(search.toLowerCase())).map((data, index) => (
                                <SearchCard key={`search_${index}`} {...data} onTap={() => {
                                    setStep('desparture')
                                }} className={step === 'desparture' || !search ? 'mb-32' : 'mb-0'}/>
                            ))}
                        </div>

                        <div className={`absolute w-full h-full duration-200 overflow-auto ${(step !== 'desparture' || !departure) ? 'translate-y-full' : ''}`}>
                            <DespartureCard avoid={avoid} setAvoid={setAvoid} meter={250} min={5} onGO={() => {
                                setTab('map')
                            }}/>
                        </div>
                    </div>
                    
                </div>
                <div className={`absolute w-full h-full px-6 pt-1 pb-12 duration-200 ${tab === 'search' ? 'translate-x-full' : tab === 'map' ? '' : '-translate-x-full'}`}>
                    <IndoorsMap />
                </div>
                <div className={`absolute w-full h-full px-6 duration-200 ${tab === 'itinerary' ? '' : 'translate-x-full'}`}>
                    <div className={`absolute w-full h-full duration-200 py-4 overflow-auto`}>
                        <div className="w-full border-l border-gray-300 flex flex-col gap-8 py-4">
                            <p className="text-lg text-gray-400">
                                5 min
                            </p>
                            <h3 className="text-2xl font-semibold">Information</h3>
                            <div className="w-full">
                                {pathData.map((path, index) => (
                                    <div key={`path_${index}`} className="border-t border-gray-300 w-full flex items-center px-6 py-4 gap-4">
                                        <Image src={`/icons/${path.direct}.svg`} alt={path.direct} width={16} height={16} className="size-10" />
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xl">{path.direct === 'ahead' ? "Continue straight ahead" : path.direct === 'left' ? 'Go left and continue' : 'Go right and continue'}</p>
                                            <p className="text-sm text-gray-400">{path.amt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-300 w-full flex items-center p-4 gap-4">
                                <Image src={`/icons/bag.svg`} alt={'xxx'} width={16} height={16} className="size-10" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-xl">L'Occitane</p>
                                    <p className="text-sm text-gray-400">Level 2 - Terminal 1 - San Francisco International Airport</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

type SearchInputProps = {
    defaultValue: string,
    onConfirm: (value: string) => void,
    placeholder: string,
    className?: string
}

export function SearchInput ({defaultValue, onConfirm, placeholder, className}: SearchInputProps) {
    const [value, setValue] = useState('')
    useEffect(() => {
        defaultValue !== value && setValue(defaultValue)
    }, [defaultValue])
    return (
        <>
        <div className={`w-full flex items-center rounded-full bg-gray-100 p-4 duration-200 ${className}`}>
            <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                    onConfirm(value)
                }
            }} className="flex-1 outline-none px-2 bg-transparent" placeholder={placeholder}/>
            <Image onClick={() => onConfirm(value)} src={'/icons/star.svg'} alt="star" width={16} height={16} className="size-5"/>
        </div>
        </>
    )
}

type SearchCardProps = {
    logo: string,
    title: string,
    description: string,
    onTap?: () => void,
    className?: string
}

function SearchCard ({logo, title, description, onTap, className}: SearchCardProps) {
    return (
        <>
        <div onClick={onTap} className={`flex rounded-xl py-1 shadow-md cursor-pointer duration-700 ease-in-out ${className}`}>
            <Image src={logo} alt="L" width={20} height={20} className="rounded-full size-12 m-2"/>
            <div>
                <p className="text-lg font-bold">{title}</p>
                <p className="text-sm font-extralight">{description}</p>
            </div>
        </div>
        </>
    )
}

type DespartureCardProps = {
    avoid: boolean,
    setAvoid: (v: boolean) => void,
    meter: number,
    min: number,
    onGO: () => void,
    className?: string
}

function DespartureCard ({avoid, setAvoid, meter, min, onGO, className}: DespartureCardProps) {
    return (
        <>
        <div className={`w-full p-4 rounded-lg bg-gray-100 flex flex-col gap-4 shadow-md ${className || ''}`}>
            <div className="flex gap-4">
                <Switch value={avoid} onChange={setAvoid} accentColor="bg-[#007AFF26]"/>
                <p className="text-lg">Avoid stairs and escalators</p>
            </div>
            <div className="flex gap-4">
                <Image src={'/icons/walk.svg'} alt="w" width={20} height={20} className="w-10"/>
                <p className="text-4xl">{meter} m</p>
            </div>
            <div className="flex gap-4">
                <Image src={'/icons/clock.svg'} alt="w" width={20} height={20} className="w-10"/>
                <p className="text-4xl">{min} min</p>
            </div>
            <div className="w-full flex justify-center my-6">
                <button onClick={onGO} className="bg-[#007AFF26] rounded-full w-36 p-2">GO</button>
            </div>
        </div>
        </>
    )
}