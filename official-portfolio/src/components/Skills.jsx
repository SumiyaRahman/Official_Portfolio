import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Skills = () => {
    const { data: skillsData } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/skills');
            return res.data;
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const skillVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const logoVariants = {
        hidden: { scale: 0, rotate: -360 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        hover: {
            rotate: 360,
            transition: {
                duration: 0.8,
                type: "spring"
            }
        }
    };

    return (
        <div id="skills" className="min-h-screen bg-gradient-to-b from-[#060911] to-[#0e131a] py-20 px-4 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <motion.div 
                className="container mx-auto relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.div 
                    className="text-center mb-20"
                    variants={skillVariants}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 playfair">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text">
                            Technical Arsenal
                        </span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Crafting digital experiences with cutting-edge technologies
                    </p>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {skillsData?.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={skillVariants}
                            className="group relative"
                        >
                            <div className="relative z-10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl
                                         backdrop-blur-xl border border-gray-700/50 
                                         hover:border-purple-500/50 transition-all duration-500
                                         hover:shadow-2xl hover:shadow-purple-500/20
                                         transform hover:-translate-y-2">
                                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
                                    <motion.img 
                                        src={skill.logo} 
                                        alt={skill.name}
                                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]
                                                 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-300"
                                        variants={logoVariants}
                                        whileHover="hover"
                                    />
                                    <motion.span 
                                        className="text-gray-200 font-medium text-sm sm:text-base md:text-lg tracking-wide"
                                        variants={skillVariants}
                                    >
                                        {skill.name}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Skills;