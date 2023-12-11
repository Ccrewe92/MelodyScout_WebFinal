"use client";

import Link from "next/link";
import React from "react";
import qs from "qs";
import spotifyConfig from "../utils/spotify";

const Navbar = () => {
  // Handler function for the "Log In" button click
  const handleLoginClick = () => {
    console.log("Log In button clicked");
    // Define the Spotify API endpoint
    const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";

    // Specify your Spotify Client ID and Redirect URI
    const spotifyConfig = {
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    };

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

          {/* Menu items in the middle */}
          <div className="hidden md:flex items-center justify-center flex-grow space-x-4">
            <Link href="../pages/contact">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Log in button on the far right */}
          <div className="flex-shrink-0">
            <a href="#" onClick={handleLoginClick}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
