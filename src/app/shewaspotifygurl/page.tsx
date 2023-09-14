'use client'
import TrackItem from '@/components/trackItem';
import { Artist, Tracks } from '@/models/Tracks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Artists } from '@/models/Artists';
import ArtistItem from '@/components/artistItem';

export default function Page() {
    const [topTracks, setTopTracks] = useState({} as Tracks);
    const [topArtists, setTopArtists] = useState({} as Artists);
    const [loading, setLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(10);
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('long_term');
    const [selectedType, setSelectedType] = useState<string>('tracks');
    const router = useRouter();
    useEffect(() => {
        AOS.init();
        document.querySelector('body')?.classList.add('shewaspotifygurl')
        document.querySelector('nav')?.classList.add('shewaspotifygurl')
        const storedToken = secureLocalStorage.getItem('accessToken') as string;
        if (storedToken) {
            fetchTop(storedToken, selectedTimeRange, selectedType);
        } else {
            router.replace('/auth');
        }
        return () => {
            document.body.classList.remove('shewaspotifygurl');
            document.querySelector('nav')?.classList.remove('shewaspotifygurl')
        };
    }, [selectedTimeRange, selectedType, limit]);
    async function fetchTop(token: string, time: string, type: string) {
        console.log('fetch')
        setLoading(true)
        setTimeout(async () => {
            const response = await fetch('https://api.spotify.com/v1/me/top/' + type + '?time_range=' + time + '&limit=' + limit, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.ok) {
                if (type === 'artists') {
                    const data: Artists = await response.json();
                    setTopArtists(data);
                } else {
                    const data: Tracks = await response.json();
                    setTopTracks(data);
                }

            } else {
                router.replace('/auth');
                throw new Error('Failed to fetch top tracks');
            }
            setLoading(false)
        }, 500)

    }
    return (

        <div className='grid grid-cols-1 md:grid-cols-2 px-5 py-4 gap-10'>
            <div className=''>
                <span className="bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-6xl font-bol cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 ease-in duration-75" data-aos='fade-down' data-aos-duration='fade-up'>
                    {'Top ' + selectedType}
                </span>
                <ul className="grid w-full grid-cols-3 gap-2 mt-5">
                    <li>
                        <input type="radio" id="tracks" name="type" value="tracks" className="hidden peer" required checked={selectedType === 'tracks'} onChange={() => setSelectedType('tracks')} />
                        <label htmlFor="tracks" className="inline-flex items-center justify-center w-full p-3 text-purple-600 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:text-gray-600 hover:bg-gray-100 duration-200 transition-all peer-checked:bg-gray-100 peer-checked:text-blue-600">
                            Tracks
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="artists" name="type" value="artists" className="hidden peer" required checked={selectedType === 'artists'} onChange={() => setSelectedType('artists')} />
                        <label htmlFor="artists" className="inline-flex items-center justify-center w-full p-3 text-purple-600 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:text-gray-600 hover:bg-gray-100 duration-200 transition-all peer-checked:bg-gray-100 peer-checked:text-blue-600">
                            Artists
                        </label>
                    </li>
                    <select
                        name="limit"
                        id="limit"
                        value={limit}
                        onChange={(event) => setLimit(Number(event.target.value))}
                        className='inline-flex items-center justify-center w-full p-3 text-purple-600 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer focus:bg-white'
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>

                </ul>
                <ul className="grid w-full grid-cols-3 gap-2 mt-5">
                    <li>
                        <input type="radio" id="long-term" name="term" value="long-term" className="hidden peer" required checked={selectedTimeRange === 'long_term'} onChange={() => setSelectedTimeRange('long_term')} />
                        <label htmlFor="long-term" className="inline-flex items-center justify-center w-full p-3 text-purple-600 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:text-gray-600 hover:bg-gray-100 duration-200 transition-all peer-checked:bg-gray-100 peer-checked:text-blue-600">
                            All Time
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="medium-term" name="term" value="medium-term" className="hidden peer" required checked={selectedTimeRange === 'medium_term'} onChange={() => setSelectedTimeRange('medium_term')}
                        />
                        <label htmlFor="medium-term" className="inline-flex items-center justify-center w-full p-3 text-purple-600 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:text-gray-600 hover:bg-gray-100 duration-200 transition-all peer-checked:bg-gray-100 peer-checked:text-blue-600">
                            6 Months
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="short-term" name="term" value="short-term" className="hidden peer" required
                            checked={selectedTimeRange === 'short_term'} onChange={() => setSelectedTimeRange('short_term')} />
                        <label htmlFor="short-term" className="inline-flex items-center justify-center w-full p-3 text-purple-600 bg-white/20 backdrop-blur-sm rounded-full cursor-pointer hover:text-gray-600 hover:bg-gray-100 duration-200 transition-all peer-checked:bg-gray-100 peer-checked:text-blue-600">
                            1 Month
                        </label>
                    </li>
                </ul>
            </div>
            <div >
                {loading ? <div className='flex items-center justify-center h-screen'>
                    <div className='h-48 w-48 relative'> <Image src={'/loading.gif'} alt='loading' fill objectFit='cover' /></div>

                </div> : selectedType === 'tracks' ? <ul>
                    {topTracks.items &&
                        topTracks.items.map((track, index) => (
                            <li key={track.id} data-aos={index % 2 == 0 ? "flip-left" : "flip-right"} data-aos-duration="1000" > {
                                < TrackItem track={track} />
                            }</li>
                        ))}
                </ul> : <ul>
                    {topArtists.items &&
                        topArtists.items.map((artist, index) => (
                            <li key={artist.id} data-aos={index % 2 == 0 ? "flip-left" : "flip-right"} data-aos-duration="1000" > {
                                < ArtistItem artist={artist} />
                            }</li>
                        ))}
                </ul>}

            </div>

        </div >
    );
}
