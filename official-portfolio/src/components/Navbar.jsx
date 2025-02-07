import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo/logo3.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for scrollTo in location state when component mounts or updates
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth"
          });
          setActiveSection(targetId);
        }, 100); // Small delay to ensure DOM is ready
      }
      // Clear the state after scrolling
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = e.target.getAttribute("href").slice(1);
    setActiveSection(targetId);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: targetId } });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  };

  const links = (
    <>
      <motion.li 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        onClick={handleLinkClick}
      >
        <a href="#home" className={`transition-colors duration-300 ${activeSection === 'home' ? 'text-purple-400 bg-gradient-to-r from-primary to-secondary' : 'hover:text-white hover:bg-gradient-to-r from-primary to-secondary'}`}>Home</a>
      </motion.li>
      <motion.li 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        onClick={handleLinkClick}
      >
        <a href="#about" className={`transition-colors duration-300 ${activeSection === 'about' ? 'text-purple-400 bg-gradient-to-r from-primary to-secondary' : 'hover:text-white hover:bg-gradient-to-r from-primary to-secondary'}`}>About Me</a>
      </motion.li>
      <motion.li 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        onClick={handleLinkClick}
      >
        <a href="#skills" className={`transition-colors duration-300 ${activeSection === 'skills' ? 'text-purple-400 bg-gradient-to-r from-primary to-secondary' : 'hover:text-white hover:bg-gradient-to-r from-primary to-secondary'}`}>Skills</a>
      </motion.li>
      <motion.li 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        onClick={handleLinkClick}
      >
        <a href="#projects" className={`transition-colors duration-300 ${activeSection === 'projects' ? 'text-purple-400 bg-gradient-to-r from-primary to-secondary' : 'hover:text-white hover:bg-gradient-to-r from-primary to-secondary'}`}>Projects</a>
      </motion.li>
      <motion.li 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.95 }}
        onClick={handleLinkClick}
      >
        <a href="#contact" className={`transition-colors duration-300 ${activeSection === 'contact' ? 'text-purple-400 bg-gradient-to-r from-primary to-secondary' : 'hover:text-white hover:bg-gradient-to-r from-primary to-secondary'}`}>Contact</a>
      </motion.li>
    </>
  );
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-3 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <motion.div
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
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
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  tabIndex={0}
                  className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-gradient-to-r from-[#0f0715]/95 via-[#2a1454]/95 to-[#0f0715]/95 text-white backdrop-blur-md"
                >
                  {links}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:sumiyabintearahman24@gmail.com"
            className="text-xl text-white font-medium tracking-wider playfair"
          >
            <h1 className="flex items-center">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text playfair">S</span>
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text playfair ml-0.5">R</span>
            </h1>
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
