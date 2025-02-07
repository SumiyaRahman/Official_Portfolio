import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo3.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const linkVariants = {
        hover: {
            scale: 1.1,
            color: "#6D28D9", // Matches your purple theme
            transition: {
                duration: 0.2
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.footer 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-gray-300 border-t border-gray-800 py-20"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col justify-center items-center gap-6">
                    {/* Logo Section */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2"
                    >
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="w-20 h-20"
                        />
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.div 
                        className="flex space-x-6 py-5"
                        variants={containerVariants}
                    >
                        {['About', 'Services', 'Portfolios', 'Contact'].map((item) => (
                            <motion.div
                                key={item}
                                variants={linkVariants}
                                whileHover="hover"
                            >
                                <Link 
                                    to={`/${item.toLowerCase()}`}
                                    className="hover:text-purple-600 transition-colors duration-300"
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Copyright Section */}
                <motion.div 
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-gray-400 text-xs">
                        © {currentYear} All rights reserved by{' '}
                        <motion.span
                            whileHover={{ 
                                color: '#6D28D9',
                                scale: 1.05 
                            }}
                            className="font-semibold cursor-pointer"
                        >
                            Sumiya Binte A Rahman
                        </motion.span>
                    </p>
                </motion.div>

                {/* Scroll to Top Button */}
                <motion.div 
                    className="fixed bottom-8 right-8"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 10l7-7m0 0l7 7m-7-7v18" 
                            />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;