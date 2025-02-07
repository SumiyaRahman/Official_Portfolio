import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import coding from '../assets/coding.png'

const AboutMe = () => {
    const { data: aboutData } = useQuery({
        queryKey: ['aboutMe'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/about-me');
            return res.data;
        }
    });

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 lg:px-8 about">
            <motion.div 
                className="container mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.div 
                    className="text-center mb-16"
                    variants={fadeInUpVariants}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="playfair tracking-[0.2rem] bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-400 text-transparent bg-clip-text">
                            About Me
                        </span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto"></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Content - Text */}
                    <motion.div 
                        className="flex-1 space-y-8"
                        variants={containerVariants}
                    >
                        {/* Main Description */}
                        <motion.div 
                            className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-xl text-purple-400 font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Who I Am</h3>
                            <p className="text-gray-300 text-[15px] leading-[1.8rem] tracking-[0.01rem]">
                                {aboutData?.[0]?.description || 
                                "A passionate web developer with a keen eye for creating elegant solutions..."}
                            </p>
                        </motion.div>

                        {/* Programming Journey */}
                        <motion.div 
                            className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-xl text-purple-400 font-semibold mb-3 group-hover:text-primary transition-colors duration-300">My Programming Journey</h3>
                            <p className="text-gray-300 text-[15px] leading-[1.8rem] tracking-[0.01rem]">
                                {aboutData?.[0]?.programmingJourney || 
                                "Started my journey in web development..."}
                            </p>
                        </motion.div>

                        {/* Work Interests */}
                        <motion.div 
                            className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-xl text-purple-400 font-semibold mb-3 group-hover:text-primary transition-colors duration-300">What I Love to Do</h3>
                            <p className="text-gray-300 text-[15px] leading-[1.8rem] tracking-[0.01rem]">
                                {aboutData?.[0]?.workInterests || 
                                "Specializing in building responsive web applications..."}
                            </p>
                        </motion.div>

                        {/* Hobbies & Personality */}
                        <motion.div 
                            className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-xl text-purple-400 font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Beyond Coding</h3>
                            <div className="space-y-4">
                                <p className="text-gray-300 text-[15px] leading-[1.8rem] tracking-[0.01rem]">
                                    <span className="font-semibold text-purple-300"></span>{' '}
                                    {aboutData?.[0]?.hobbies || 
                                    "When I'm not coding, you'll find me..."}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - GIF */}
                    <motion.div 
                        className="flex-1 flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full max-w-md">
                            {/* Main GIF */}
                            <img 
                                src={coding}
                                alt="Coding Animation"
                                className="w-full h-full rounded-lg"
                            />
                            
                            {/* Gradient Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutMe;