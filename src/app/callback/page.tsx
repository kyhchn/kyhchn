'use client'
import { useEffect } from 'react';
import { Buffer } from 'buffer';
import { useRouter } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

async function getAccessToken(code: string, state: string) {
    const authHeader = `Basic ${Buffer.from(`${CLIENT_ID!}:${CLIENT_SECRET!}`).toString('base64')}`;
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': authHeader,    
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI!,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to get access token');
    }

    const data = await response.json();
    console.log('data', data)
    return data.access_token;
}

function Callback({ searchParams }: { searchParams: { code: string, state: string } }) {
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessToken(searchParams.code, searchParams.state);
                secureLocalStorage.setItem('accessToken', token)
                console.log('token', token)
                router.push('/shewaspotifygurl')
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [searchParams.code, searchParams.state]);

    return <p>attemtp to get token</p>;
}

export default Callback;
