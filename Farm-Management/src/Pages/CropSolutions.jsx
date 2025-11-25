import React from "react";
import { motion } from "framer-motion";
import farming1 from "../assets/crop6.jpg";
import farming2 from "../assets/crop4.jpg";
import farming3 from "../assets/crop5.png";

export default function CropSolutions() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    
    <section className="w-full py-16 px-3 md:px-20 bg-white">
      <div className="max-w-8xl mx-auto">
        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Next-Gen Solutions For <br /> Optimal Crop Growth
            </h2>
          </div>
          <p className="text-gray-600 max-w-md">
            We provide cutting-edge services to help farmers maximize crop
            yields. Our precision farming, crop monitoring, and automation
            solutions aim to revolutionize agriculture.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <img
              src={farming1}
              alt="Farming Precision"
              className="w-full h-100 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              Farming Precision
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Our precision farming employs state-of-the-art technology to
              optimize every aspect of farm operations.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <img
              src={farming2}
              alt="Crop Surveillance"
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              Crop Surveillance
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Track your crops' health and growth in real-time with our
              innovative solutions.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col"
          >
            <img
              src={farming3}
              alt="Automated Farming"
              className="w-full h-100 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              Automated Farming
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Enhance farm efficiency and productivity with our cutting-edge
              automation solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
