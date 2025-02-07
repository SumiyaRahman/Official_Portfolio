import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo/logo3.png";

const Navbar = () => {
  const links = (
    <>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a href="#home">Home</a>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a href="#about">About Me</a>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a href="#skills">Skills</a>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a href="#projects">Projects</a>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <a href="#contact">Contact</a>
      </motion.li>
    </>
  );
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-3"
    >
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <motion.div
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-gradient-to-r from-[#0f0715] via-[#2a1454] to-[#0f0715] text-white"
            >
              {links}
            </motion.ul>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:sumiyabintearahman24@gmail.com"
            className="text-xl text-white font-medium tracking-wider playfair"
          >
            <img className="w-10 h-10" src={logo} alt="logo" />
            {/* <div>
              <span className=" text-white text-xl font-light hidden lg:inline">
                Sumiya Binte A Rahman
              </span>
            </div> */}
          </motion.a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-white text-sm px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-primary to-secondary text-white text-sm md:text-base font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full tracking-wider hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Resume
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
