import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTwitter, FaGithub, FaLinkedinIn, FaDribbble } from "react-icons/fa";

const Banner = () => {
  const { data: bannerData } = useQuery({
    queryKey: ["bannerIntro"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/banner-intro");
      return res.data;
    },
  });

  const socialLinks = [
    { icon: <FaTwitter />, url: bannerData?.[0]?.twitter || "#" },
    { icon: <FaDribbble />, url: bannerData?.[0]?.dribbble || "#" },
    { icon: <FaLinkedinIn />, url: bannerData?.[0]?.linkedin || "#" },
    { icon: <FaGithub />, url: bannerData?.[0]?.github || "#" },
  ];

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-white"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="playfair text-2xl md:text-xl tracking-[0.2rem]"
            >
              {bannerData?.[0]?.name || "Sumiya Binte A Rahman"}
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-8"
            >
              <span className="playfair bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-400 text-transparent bg-clip-text text-2xl md:text-[55px] font-medium leading-[1.8rem] tracking-[0.2rem]">
                {(bannerData?.[0]?.designation || "Next-Level Web Developer.").split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.4 + index * 0.1,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white text-opacity-70 font-light text-[15px] tracking-wider leading-[1.8rem] mb-8 max-w-2xl"
            >
              {bannerData?.[0]?.description ||
                "I break down complex user experience problems to create integrity focused solutions that connect billions of people"}
            </motion.p>

            {/* Social Links & CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
              >
                Resume
              </motion.button>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: "#A855F7" }}
                    className="text-gray-400 text-xl hover:text-purple-500 transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            >
              <div className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-8xl font-bold">
                  {bannerData?.[0]?.name ? bannerData[0].name.charAt(0) : "S"}
                </span>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
