"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import qs from "qs";
import { getAccessToken, searchTracks } from "./utils/spotifyapi";
import spotifyConfig from "./utils/spotify";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    console.log("Received code:", code); // Add this log
    const fetch = async () => {
      const authToken = await getAccessToken(code);
      console.log("Received authToken:", authToken); // Add this log
      setAuthToken(authToken);
      // Placeholder for initial Spotify API call
      const gooderjob = await searchTracks(authToken, searchTerm);
      console.log("Initial search result:", gooderjob); // Add this log
    };
    if (code && !authToken) {
      fetch();
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents the default form submission action
    setIsLoading(true);

    if (!authToken) {
      console.log("No access token available");
      return;
    }

    console.log("Before API call"); // Add this log
    setIsLoading(true); // Add a loading state before starting the search
    try {
      const tracks = await searchTracks(authToken, searchTerm);
      console.log("Tracks received:", tracks); // Add this log
      setRecommendations(tracks); // Set recommendations state with search results
    } catch (error) {
      console.error("Error searching tracks:", error);
      // Handle error appropriately
    } finally {
      console.log("After API call"); // Add this log
      setIsLoading(false); // Ensure loading state is updated when search is complete
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
