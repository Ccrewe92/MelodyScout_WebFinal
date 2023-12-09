"use client";

import React from "react";
import Navbar from "../app/components/navbar"; // Adjust the path to your navbar component
import Footer from "../app/components/footer"; // Adjust the path to your footer component

export default function Contact() {
  return (
    <div className="h-screen bg-gray-800">
      <Navbar />
      <div className="pt-10 md:pt-20">
        <div className="p-4 md:p-8">
          <h1 className="text-white text-center pb-8 font-light text-4xl md:text-5xl lg:text-6xl">
            Contact Me
          </h1>
          <form
            action="https://fabform.io/f/{form-id}" // Replace with your form URL
            method="post"
            className="flex flex-col items-center"
          >
            {/* Your form inputs here */}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
