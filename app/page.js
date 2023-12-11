"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import qs from "qs";
import { searchTracks } from "./utils/spotifyapi";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(null); // State for the code

  const params = useSearchParams();

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  useEffect(() => {
    const fetchedCode = params.get("code");
    if (fetchedCode) {
      setCode(fetchedCode);
    }
  }, [params]);

  useEffect(() => {
    if (code && !authToken) {
      const fetch = async () => {
        const token = await fetchAccessToken(code); // Use fetchAccessToken here
        setAuthToken(token);
        if (searchTerm) {
          const tracks = await searchTracks(token, searchTerm);
          setRecommendations(tracks);
        }
      };
      fetch();
    }
  }, [code, authToken, searchTerm]);
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!authToken) {
      console.log("No access token available");
      setIsLoading(false);
      return;
    }

    try {
      const tracks = await searchTracks(authToken, searchTerm);
      setRecommendations(tracks);
    } catch (error) {
      console.error("Error searching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    location.reload();
  };

  const loginUrl =
    "https://accounts.spotify.com/authorize?" +
    qs.stringify({
      response_type: "code",
      client_id: "74f2f2fb31124bae932f4c83f5f3b337",
      scope: "user-read-private user-read-email",
      redirect_uri: "https://melody-scout-web-final.vercel.app/",
      state: "12321",
    });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <div className="search-bar-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for artists"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </form>
      {/* Recommendations Container */}
      <div className="recommendations-container">
        {recommendations.map((track) => (
          <div key={track.id} className="song-card">
            <h3>{track.name}</h3>
            <p>Artist: {track.artists[0].name}</p>
            {/* Add more details as required */}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <h1>Welcome to MelodyScout</h1>
        <p>Discover and enjoy personalized music recommendations.</p>
      </main>
      <Footer />
    </div>
  );
}
