import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/frame.png"; // update path if needed
import { ArrowRight } from "lucide-react";

export default function LandingFooter() {
  return (
    <section
      className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center text-white px-4"
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">
          Join the Agricultural <br /> Revolution Today!
        </h1>

        {/* Input + Button */}
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
       
          <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition">
            Subscribe <ArrowRight />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
