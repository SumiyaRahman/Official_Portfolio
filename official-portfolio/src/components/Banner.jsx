import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTwitter, FaGithub, FaLinkedinIn, FaDribbble } from "react-icons/fa";

const Banner = () => {
  const { data: bannerData } = useQuery({
    queryKey: ["bannerIntro"],
    queryFn: async () => {
      const res = await axios.get("https://official-portfolio-server.vercel.app/banner-intro");
      return res.data;
    },
  });

  const { data: socialLinks } = useQuery({
    queryKey: ["socialLinks"],
    queryFn: async () => {
      const res = await axios.get("https://official-portfolio-server.vercel.app/social-links");
      return res.data;
    },
  });

  const socialIcons = {
    twitter: FaTwitter,
    github: FaGithub,
    linkedin: FaLinkedinIn,
    dribbble: FaDribbble
  };

  return (
    <div id="home" className="min-h-screen flex items-center pt-20 md:pt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-8 md:py-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-white mt-16 lg:mt-0"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="playfair text-xl sm:text-2xl md:text-xl tracking-[0.2rem]"
            >
              {bannerData?.[0]?.name || "Sumiya Binte A Rahman"}
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-4 sm:my-6 md:my-8"
            >
              <span className="playfair bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text text-xl sm:text-2xl md:text-[55px] font-medium leading-normal md:leading-[1.8rem] tracking-[0.2rem]">
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
              className="text-white text-opacity-70 font-light text-sm sm:text-[15px] tracking-wider leading-[1.6rem] sm:leading-[1.8rem] mb-6 sm:mb-8 max-w-2xl"
            >
              {bannerData?.[0]?.description ||
                "I break down complex user experience problems to create integrity focused solutions that connect billions of people"}
            </motion.p>

            {/* Social Links & CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
              >
                Resume
              </motion.button>

              <div className="flex gap-4 mt-4 sm:mt-0">
                {/* social links */}
                {socialLinks?.map((link, index) => {
                  const Icon = socialIcons[link.name.toLowerCase()];
                  return Icon ? (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white hover:text-purple-400 transition-colors duration-300 text-xl sm:text-2xl"
                    >
                      <Icon />
                    </motion.a>
                  ) : null;
                })}
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
              className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]"
            >
              <div className="w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-6xl sm:text-7xl md:text-8xl font-bold">
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
