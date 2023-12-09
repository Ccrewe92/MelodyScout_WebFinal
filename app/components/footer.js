"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <img
                  src="/melodyscout.png"
                  className="h-8 mr-3"
                  alt="MelodyScout Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </span>
            </Link>
          </div>
          {/* Placeholder for additional columns or content */}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 MelodyScout. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link href="https://github.com/yourusername/yourrepository">
              <span className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                {/* Insert your GitHub SVG or icon here */}
                <span className="sr-only">GitHub account</span>
              </span>
            </Link>
            {/* Placeholder for additional social media links */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
