'use client';
import { Tracks } from '@/models/Tracks';
import React, { useState, useEffect } from 'react';
import { FaLinode } from 'react-icons/fa6';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const [targetTracks, setTargetTracks] = useState<string[]>([]);
    const [resultIds, setResultIds] = useState<string[]>([]);
    const [fails, setFails] = useState<string[]>([]);

    const router = useRouter();
    async function convert() {
        const token = secureLocalStorage.getItem('accessToken') as string;
        console.log('token is ' + token);
        setLoading(true);

        const trackIds: string[] = [];
        const failedTracks: string[] = [];
        for (const track of targetTracks) {
            const requestParams = new URLSearchParams();
            requestParams.append('type', 'track');
            requestParams.append('market', 'ID');
            requestParams.append('limit', '2');
            requestParams.append('q', track);
            const response = await fetch('https://api.spotify.com/v1/search?' + requestParams.toString(), {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data: Tracks = await response.json();
                const firstData = data.items.pop();
                if (firstData) {
                    trackIds.push(firstData.id);
                } else {
                    failedTracks.push(track);
                }
            } else {
                failedTracks.push(track);
                router.replace('/auth');
                throw new Error('Failed to fetch top tracks');
            }
        }

        setFails(failedTracks);
        setResultIds(trackIds);
        setLoading(false);
    }

    useEffect(() => {
        const storedToken = secureLocalStorage.getItem('accessToken') as string;
        if (storedToken) {
            // fetchTop(storedToken, selectedTimeRange, selectedType);
        } else {
            router.replace('/auth');
        }
    }, [])

    return (
        <div className='flex flex-col w-full'>
            <input
                type="file"
                accept=".txt"
                onChange={async (e) => {
                    const file = e.target.files;
                    if (file) {
                        const text = await file.item(0)!.text();
                        setTargetTracks(text.split('\n').map(line => line.trim()));
                    }
                }}
            />
            <button onClick={() => convert()}>Convert</button>
            <div className='bg-green w-full'>
                {resultIds.map((val, idx) => (<p key={idx}>{val}</p>))}
            </div>
            <div className='bg-red w-full'>
                {fails.map((val, idx) => (<p key={idx}>{val}</p>))}
            </div>
        </div>
    );
}
