// Navbar.js
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
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:space-x-10">
          <div className="flex-shrink-0">
            <Link href="/">
              <img src="/melodyscout.png" className="h-8 w-auto" alt="Logo" />
            </Link>
          </div>
          <div className="flex-shrink-0">
            {isLoggedIn ? (
              // You can customize the logged-in state if needed
              <span>User is logged in</span>
            ) : (
              <button onClick={handleLoginClick}>Log In</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
