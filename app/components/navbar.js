"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
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
            <Link href="/login">Log in</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
