// recommendations.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { getUserTopTracks } from './utils/spotifyapi';

export default function Recommendations({ authToken }) {
  const [topTracks, setTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      setIsLoading(true);
      try {
        const tracks = await getUserTopTracks(authToken);
        setTopTracks(tracks);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken) {
      fetchTopTracks();
    }
  }, [authToken]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <h1 className="text-xl font-bold text-center my-4">Your Music Recommendations</h1>
        {isLoading ? (
          <div className="text-center">Loading your personalized recommendations...</div>
        ) : error ? (
          <div className="text-center text-red-500">An error occurred: {error.message}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {topTracks.map((track) => (
              <div key={track.id} className="card bg-white p-4 shadow-md rounded">
                <img src={track.album.images[0].url} alt={track.name} className="w-full h-64 object-cover rounded" />
                <div className="p-2">
                  <h2 className="text-lg font-semibold">{track.name}</h2>
                  <p className="text-sm text-gray-600">Artist: {track.artists.map((artist) => artist.name).join(', ')}</p>
                  <p className="text-sm text-gray-600">Album: {track.album.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
