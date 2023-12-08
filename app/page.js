import React from "react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component here */}
      <h1>Welcome to MelodyScout</h1>
      <p>Discover and enjoy personalized music recommendations.</p>
      {/* You can add more content here */}
    </div>
  );
}
