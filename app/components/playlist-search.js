import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaylistSearch = ({ authToken, recommendations }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
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
                    setPlaylists(response.data.playlists.items);
                } catch (error) {
                    console.error("Error fetching playlists:", error);
                }
            }
        };

        fetchPlaylists();
    }, [authToken, selectedSong]);

    const handleSongClick = (song) => {
        setSelectedSong(song);
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
        </div>
    );
};

export default PlaylistSearch;