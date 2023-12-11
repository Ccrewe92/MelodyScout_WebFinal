"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import qs from "qs";
import Cookies from "js-cookie";
import spotifyConfig from "../utils/spotify";

const Navbar = () => {
  // State to track the login status and user token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  // Handler function for the "Log In" button click
  const handleLoginClick = () => {
    console.log("Log In button clicked");
    // Define the Spotify API endpoint
    const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";

    // Specify the scopes (permissions) your app needs
    const scopes = ["user-read-private", "user-read-email"];

    // Construct the authorization URL with query parameters
    const authUrl =
      `${spotifyAuthEndpoint}?` +
      qs.stringify({
        client_id: "74f2f2fb31124bae932f4c83f5f3b337",
        redirect_uri: "https://melody-scout-web-final.vercel.app/", // Replace with your actual redirect URI
        response_type: "code",
        scope: scopes.join(" "),
      });

    // Redirect the user to the Spotify authorization page
    window.location.href = authUrl;
  };

  // Handler function for the "Log Out" button click
  const handleLogoutClick = () => {
    // Clear the user token from cookies
    Cookies.remove("userToken");
    setUserToken(null);

    // Add your additional logout logic here
    // For example, you can perform any necessary cleanup
    console.log("Log Out button clicked");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check if the user is already logged in (you can replace this with your actual check)
    const storedUserToken = Cookies.get("userToken");

    if (storedUserToken) {
      setIsLoggedIn(true);
      setUserToken(storedUserToken);
    }
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:space-x-10">
          {/* Logo on the far left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img src="/melodyscout.png" className="h-8 w-auto" alt="Logo" />
            </Link>
          </div>

          {/* Log in or Log out button on the far right */}
          <div className="flex-shrink-0">
            {isLoggedIn ? (
              <button onClick={handleLogoutClick}>Log Out</button>
            ) : (
              <a href="#" onClick={handleLoginClick}>
                Log in
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
