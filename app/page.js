"use client";

import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Include the Navbar component at the top */}
      <main className="flex-grow">
        <h1>Welcome to MelodyScout</h1>
        <p>Discover and enjoy personalized music recommendations.</p>
        {/* You can add more content here */}
      </main>
      <Footer /> {/* Include the Footer component at the bottom */}
    </div>
  );
}
