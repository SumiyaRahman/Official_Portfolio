import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 sm:py-6 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <motion.p 
                    className="text-center text-gray-400 text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
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
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;