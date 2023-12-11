import axios from "axios";
import qs from "qs";
import spotifyConfig from "./spotify";

const BASE_URL = "https://accounts.spotify.com/api";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export const getAccessToken = async () => {
  const credentials = `${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const tokenResponse = await axios.post(
    `${BASE_URL}/token`,
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return tokenResponse.data.access_token;
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
