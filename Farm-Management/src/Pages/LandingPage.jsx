import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import landingImage from "../assets/image.png";
import { Link } from "react-router";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6 bg-transparent">
        {/* Logo */}
        <div className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
          <span>Agrismart</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 bg-gray-900 text-white px-6 py-2 rounded-full shadow-md">
          <a href="#" className="text-white bg-white/10 px-4 py-1 rounded-full">
            Home
          </a>
          <a href="#" className="hover:text-emerald-300 transition">
            About Us
          </a>
          <a href="#" className="hover:text-emerald-300 transition">
            Solutions
          </a>
          <a href="#" className="hover:text-emerald-300 transition">
            Investors
          </a>
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-800 hover:text-gray-900 transition">
            Sign In
          </button>
          <button className="px-5 py-2 border bg-black text-white  border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition">
            Sign up Free
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-800"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-20 left-0 right-0  border-t z-40 md:hidden">
          <nav className="flex flex-col gap-4 p-6 text-center">
            <a href="#" className="hover:text-emerald-500">
              Home
            </a>
            <a href="#" className="hover:text-emerald-500">
              About Us
            </a>
            <a href="#" className="hover:text-emerald-500">
              Solutions
            </a>
            <a href="#" className="hover:text-emerald-500">
              Investors
            </a>
            <button className="hover:text-emerald-500">Sign In</button>
            <button className="px-6 py-2 border border-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition">
              Sign up Free
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center">
        {/* Decorative Background */}

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

        {/* Badge */}
        <div className="relative z-10 mb-4 inline-flex items-center gap-2 text-sm text-gray-800">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Top Notch Webinar Platform</span>
        </div>

        {/* Heading */}
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-gray-900 leading-tight top-40">
          Regenerating The Earth <br /> With Nano-Biotechnology
        </h1>
        {/* CTA Button */}

        <Link to="/login">
          <button className="relative z-10 flex items-center gap-3 px-8 py-3 bg-gradient-to-b from-gray-900 to-black text-white rounded-full shadow-lg hover:scale-105 transition top-44">
            Get Started
            <ArrowRight size={20} />
          </button>
        </Link>

        {/* Tractor Image */}
        <div className="relative w-full mt-40">
          <img
            src={landingImage}
            alt="Tractor field"
            className="w-full object-cover rounded-lg shadow-2xl"
          />
        </div>

        {/* Decorative plus icons */}
        <div className="absolute text-gray-400 text-3xl top-1/4 left-10 opacity-40">
          ✦
        </div>
        <div className="absolute text-gray-400 text-3xl bottom-1/3 right-16 opacity-40">
          ✦
        </div>
        <div className="absolute text-gray-400 text-3xl bottom-20 left-1/3 opacity-40">
          ✦
        </div>
      </section>
    </div>
  );
}
