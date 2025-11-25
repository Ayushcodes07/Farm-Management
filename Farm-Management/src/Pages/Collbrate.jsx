import React from "react";
import { motion } from "framer-motion";
import { HiMapPin } from "react-icons/hi2"; // Location icon from react-icons
import bgImage from "../assets/crop3.jpg";

export default function HeroSection() {
  return (
    <div className="flex justify-center items-center">
      <section
        className="relative w-6xl h-[400px] md:h-[500px] rounded-6xl overflow-hidden flex items-center justify-center p-2 mt-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "40px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 text-white px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
              Collaborate And Learn <br />
              From Industry Experts <br />
              And Enthusiasts
            </h1>

            {/* Location */}
            <div className="flex items-center mt-6 gap-2 text-sm md:text-base">
              <HiMapPin className="w-5 h-5" />
              <span>Ponorogo, Indonesia</span>
            </div>

            {/* Button */}
            <button className="mt-8 bg-white text-black font-medium rounded-full px-6 py-2 flex items-center gap-2 hover:bg-gray-100 transition">
              Get Started
              <span>↗</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
