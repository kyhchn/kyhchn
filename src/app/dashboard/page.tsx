'use client'
import { Tracks } from '@/models/Tracks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';


export default function Page() {
    const [token, setToken] = useState('');
    const [topTracks, setTopTracks] = useState({} as Tracks);
    const router = useRouter();
    useEffect(() => {
        const storedToken = secureLocalStorage.getItem('accessToken') as string;
        if (storedToken) {
            setToken(storedToken);
            fetchTopTracks(storedToken);
        }
    }, []);
    async function fetchTopTracks(token: string) {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if (response.ok) {
            const data: Tracks = await response.json();
            setTopTracks(data);

        } else {
            router.replace('/auth');
            throw new Error('Failed to fetch top tracks');
        }
    }
    return (
        <>
            <div>
                <h2>Top Tracks:</h2>
                <ul>
                    {topTracks.items &&
                        topTracks.items.map((track) => (
                            <li key={track.id}>{track.name} {track.artists.map((e) => e.name).join("-")}</li>
                        ))}
                </ul>
            </div>
        </>

    );
}
