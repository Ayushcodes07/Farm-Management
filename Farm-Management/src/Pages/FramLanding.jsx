import React from "react";
import { motion } from "framer-motion";
import Img1 from "../assets/crop1.png"; // replace with your image paths
import Img2 from "../assets/crop2.png";
import Img3 from "../assets/crop3.jpg";
import Img4 from "../assets/crop4.jpg";

export default function FarmLanding() {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Top stats strip */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center border-b border-gray-200 pb-6 font-bold ">
          <Stat number="50+" title="Year Of Experience" />
          <Stat number="200+" title="Field In Progress" />
          <Stat number="120,000+" title="Farmer Around World" />
          <Stat number="$15 Billion" title="Agricultural Product" />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Next-Gen Solutions For
              <br /> Optimal Crop Growth
            </h1>
          </div>

          <div className="text-sm text-gray-500">
            We provide cutting-edge services to help farmers maximize crop
            yields. Our precision farming, crop monitoring, and automation
            solutions aim to revolutionize agriculture.
          </div>
        </div>

        {/* Image cards strip */}
        <div className="mt-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <Card
              img={Img1}
              number="03"
              caption="Technology Irrigation"
              className="translate-y-0 md:translate-y-6"
            />
            <Card
              img={Img2}
              number="02"
              caption="Organic Fertilizer"
              className="-translate-y-6 md:-translate-y-3"
            />
            <Card
              img={Img3}
              number="03"
              caption="Technology Irrigation"
              className="translate-y-6 md:translate-y-10"
            />
            <Card
              img={Img4}
              number="04"
              caption="Agricultural Monitoring"
              className="-translate-y-0 md:-translate-y-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ number, title }) {
  return (
    <div className="py-4">
      <div className="text-4xl md:text-4xl font-semibold">{number}</div>
      <div className="text-sm text-gray-500 mt-1">{title}</div>
    </div>
  );
}

function Card({ img, number, caption, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div
        className="w-full rounded-2xl overflow-hidden shadow-lg"
        style={{ borderRadius: "20px" }}
      >
        <img
          src={img}
          alt={caption}
          className="w-full h-100 object-cover block"
        />
      </div>
      <div className="w-full flex items-center justify-between mt-4 text-xs text-gray-600 px-1">
        <div className="">{number}</div>
        <div className="text-center flex-1">{caption}</div>
      </div>
    </motion.div>
  );
}
