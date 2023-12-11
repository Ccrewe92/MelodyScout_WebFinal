import axios from "axios";
import qs from "qs";
import spotifyConfig from "./spotify";
import { headers } from "../../next.config";

const BASE_URL = "https://accounts.spotify.com/api";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export const getAccessToken = async (code) => {
  const encodedCredentials = Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString("base64");

  const tokenResponse = await axios.post(
    `${BASE_URL}/token`,
    qs.stringify({ grant_type: "authorization_code", code, redirect_uri: spotifyConfig.redirectUri }),
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }

  );
  return tokenResponse.data.access_token;
};
export const getUserTopTracks = async (accessToken) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/me/top/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.items; // Assuming the Spotify API returns the user's top tracks in an 'items' array
  } catch (error) {
    console.error('Error fetching user top tracks:', error);
    throw error; // It's good practice to throw the error so the calling function can handle it
  }
};

export const searchTracks = async (accessToken, query) => {
  const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
    params: {
      q: query,
      type: "track",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.tracks.items;
};
