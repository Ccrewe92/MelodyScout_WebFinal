import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import qs from "qs";
import spotifyConfig from "../utils/spotify"; // Make sure this path is correct

const Navbar = () => {
  // State to manage login status based on the userToken cookie
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("userToken") ? true : false
  );

  // Effect to set the isLoggedIn state based on the cookie presence
  useEffect(() => {
    const token = Cookies.get("userToken");
    setIsLoggedIn(!!token); // The double bang (!!) converts a truthy/falsy value to a boolean true/false
  }, []);

  // Handler for login button click
  const handleLoginClick = () => {
    // Define Spotify's authorization endpoint
    const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
    // Define the scopes required for the Spotify access
    const scopes = ["user-read-private", "user-read-email"];
    // Construct the full authorization URL
    const authUrl = `${spotifyAuthEndpoint}?${qs.stringify({
      client_id: spotifyConfig.clientId,
      redirect_uri: spotifyConfig.redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
    })}`;
    // Redirect the user to Spotify's authorization page
    window.location.href = authUrl;
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          {/* Just place the image inside the Link component, Next.js will handle the rest */}
          <img
            src="/melodyscout.png"
            height="32" // Adjust as needed
            width="32" // Adjust as needed
            alt="Logo"
            className="h-8 w-auto cursor-pointer" // Added cursor-pointer to imply it's clickable
          />
        </Link>
        <div>
          {isLoggedIn ? (
            <button
              onClick={() => { Cookies.remove("userToken"); setIsLoggedIn(false); }}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Log In with Spotify
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;