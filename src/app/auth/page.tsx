'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI

function generateRandomString(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; ++i) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-top-read user-follow-modify';

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID!,
      scope: scope,
      redirect_uri: REDIRECT_URI!,
      state: state,
    });

    const spotifyAuthorizeUrl = `https://accounts.spotify.com/authorize?${params}`;

    router.push(spotifyAuthorizeUrl);
  }, []);

  return <div>Redirecting to Spotify login...</div>;
}
