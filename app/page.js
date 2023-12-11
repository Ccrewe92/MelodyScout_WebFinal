"use client";

import React, { useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import qs from "qs";
import { useEffect } from "react";
import { getAccessToken, searchTracks } from "./utils/spotifyapi";
import spotifyConfig from "./utils/spotify";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
 
  const params = useSearchParams();
  console.log();
  useEffect(() => {
    const code = params.get("code");
    const fetch = async () => {
      const authToken = await getAccessToken(code);
      setAuthToken(authToken);
      const gooderjob = await searchTracks(authToken, "What is love");
      console.log(gooderjob);
    };
    if (code && !authToken) {
      fetch();
    }

  }, []);

  const logout = () => {
    setAuthToken(null);
    location.reload();

  }
  
  const loginUrl = 'https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id: spotifyConfig.clientId,
      scope: 'user-read-private user-read-email',
      redirect_uri: spotifyConfig.redirectUri,
      state: '12321'
    })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Include the Navbar component at the top */}
      {authToken ? (
        <div className="d-flex">
        <p>Logged in</p>
        <button className="px-4 pt-2 bg-blue-500 text-white border-r-2" onClick={logout}>logout</button>
        </div>
      ) : (
        <>
        <p>Not logged in</p>
        <a className="px-4 pt-2 bg-blue-500 text-white border-r-2" href={loginUrl}>login</a>
        </>)
      }
      
   
      <main className="flex-grow">
        <h1>Welcome to MelodyScout</h1>
        <p>Discover and enjoy personalized music recommendations.</p>
        {/* You can add more content here */}
      </main>
      <Footer /> {/* Include the Footer component at the bottom */}
    </div>
  );
}
