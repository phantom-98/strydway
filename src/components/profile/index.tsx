'use client';

import { useState } from "react";
import { Switch } from "../switch";
import TabBar from "../tab/bar";



export default function Profile () {
    const [notification, setNotification] = useState(true);
    const [theme, setTheme] = useState('light');

    return (
        <>
        <div className="flex flex-col gap-4 p-4 pt-20 bg-[#F2F2F7] w-screen h-screen">
            <h1 className="font-title text-4xl font-extrabold">My Account</h1>
            <div>
                <p className="text-sm text-gray-700 ml-4 leading-8">PROFILE</p>
                <div className="rounded-lg bg-white pl-4">
                    <input placeholder="Name" className="py-2 pr-2 w-full"/>
                    <input placeholder="Surname" className="py-2 pr-2 w-full border-y border-gray-300"/>
                    <input placeholder="Email" className="py-2 pr-2 w-full"/>
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-700 ml-4 leading-8">SETTINGS</p>
                <div className="rounded-lg bg-white pl-4 text-lg">
                    <div className="flex items-center justify-between py-2 pr-2">
                        <span>Appearance:</span>
                        <TabBar options={[
                            {
                                id: 'light',
                                icon: '/icons/light.svg',
                                label: 'Light'
                            },{
                                id: 'dark',
                                icon: '/icons/dark.svg',
                                label: 'Dark'
                            }
                        ]} value={theme} onChange={setTheme} />
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-300 py-2 pr-2">
                        <span>Notifications:</span>
                        <Switch value={notification} onChange={setNotification}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
