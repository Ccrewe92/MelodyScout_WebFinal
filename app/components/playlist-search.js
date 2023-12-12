import React, { useState } from "react";
import axios from "axios";

const PlaylistSearch = ({ authToken, recommendations }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    const handleSongClick = async (song) => {
        setSelectedSong(song);
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/recommendations/playlists?track_id=${song.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setPlaylists(response.data.items);
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };

    return (
        <div>
            {selectedSong && (
                <div>
                    <h2>Selected Song: {selectedSong.name}</h2>
                    <h3>Playlists including this song:</h3>
                    {playlists.length > 0 ? (
                        <ul>
                            {playlists.map((playlist) => (
                                <li key={playlist.id}>{playlist.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No playlists found.</p>
                    )}
                </div>
            )}
            {/* Render your search results */}
            {/* Example: recommendations is the array of search results */}
            {recommendations.map((song) => (
                <div
                    key={song.id}
                    className="song-card"
                    onClick={() => handleSongClick(song)}
                >
                    <h3>{song.name}</h3>
                    <p>Artist: {song.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
            ))}
        </div>
    );
};

export default PlaylistSearch;