"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import qs from "qs";
import { searchTracks } from "./utils/spotifyapi";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(null); // State for the code
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
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

  const fetchPlaylists = async () => {
    if (selectedSong) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/search?type=playlist&q=${encodeURIComponent(
            selectedSong.name
          )}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const { items } = response.data.playlists;
        // Filter playlists that include the selected song
        const playlistsWithSong = items.filter((playlist) =>
          playlist.tracks.items.some(
            (item) => item.track.id === selectedSong.id
          )
        );
        // Select a random playlist from the filtered list
        const randomPlaylist =
          playlistsWithSong[
          Math.floor(Math.random() * playlistsWithSong.length)
          ];
        setPlaylists(playlistsWithSong);
        setSelectedPlaylist(randomPlaylist);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
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

  const handleSearch = async (e, track) => {
    e.preventDefault();
    setIsLoading(true);

    if (!authToken) {
      console.log("No access token available");
      setIsLoading(false);
      return;
    }

    try {
      setSelectedSong(track); // Set the selected song
      const tracks = await searchTracks(authToken, searchTerm);
      setRecommendations(tracks);
    } catch (error) {
      console.error("Error searching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSearch} className="flex w-full max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for tracks"
            className="flex-1 p-2 border-2 border-r-0 border-green-500 focus:outline-none bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 border-2 border-green-500 hover:bg-green-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
      {/* Recommendations Container */}
      <div className="flex flex-wrap justify-center gap-4 m-4">
        {recommendations.map((track) => (
          <a
            key={track.id}
            href={`https://open.spotify.com/playlist/${selectedPlaylist?.id}`}
            className="song-card max-w-sm bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            onClick={(e) => handleSearch(e, track)}
          >
            {/* Render the song card content */}
          </a>
        ))}
      </div>
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Welcome to MelodyScout</h1>
        <p className="text-xl mt-2">Discover and enjoy personalized music recommendations.</p>
        {/* Logout Button */}
      </main>
      <Footer />
    </div>
  );
}