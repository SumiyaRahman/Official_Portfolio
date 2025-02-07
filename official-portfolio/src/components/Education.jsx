import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import Achievement from './Achievement';

const Education = () => {
    const { data: educationData } = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/educational-qualification');
            return res.data;
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div id="education" className="min-h-screen bg-[#0F172A] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="container mx-auto max-w-6xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.div 
                    className="text-center mb-12 sm:mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-400 text-transparent bg-clip-text">
                            Educational Journey
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                        My academic background and qualifications
                    </p>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto mt-4 sm:mt-6"></div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 sm:w-1 bg-gradient-to-b from-purple-600 to-indigo-600"></div>

                    {/* Education Items */}
                    <div className="space-y-3 sm:space-y-6">
                        {educationData?.map((edu, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`flex flex-col sm:flex-row gap-6 sm:gap-8 relative ${
                                    index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[14px] sm:left-1/2 top-0 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-purple-500 transform sm:-translate-x-1/2 border-2 sm:border-4 border-[#0F172A] z-10"></div>

                                {/* Content */}
                                <div className={`w-full pl-12 sm:pl-0 sm:w-1/2 ${
                                    index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'
                                }`}>
                                    <motion.div 
                                        className="bg-gray-900/50 p-4 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm border border-gray-700/50
                                                hover:border-purple-500/50 transition-all duration-300
                                                transform hover:-translate-y-1"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        {/* Institution */}
                                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                            <FaUniversity className="text-purple-500 text-lg sm:text-xl" />
                                            <h3 className="text-lg sm:text-xl font-bold text-white">
                                                {edu.instituteName}
                                            </h3>
                                        </div>

                                        {/* Degree */}
                                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                            <FaGraduationCap className="text-purple-400 text-lg sm:text-xl" />
                                            <h4 className="text-base sm:text-lg text-purple-400">
                                                {edu.degree}
                                            </h4>
                                        </div>

                                        {/* Duration */}
                                        <div className="flex items-center gap-2 text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                                            <FaCalendarAlt />
                                            <span>{edu.yearRange}</span>
                                        </div>

                                        {/* Achievements/Highlights */}
                                        {edu.achievements && (
                                            <div className="mt-3 sm:mt-4">
                                                <h5 className="text-purple-400 font-semibold mb-2 text-sm sm:text-base">Highlights:</h5>
                                                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                                                    {edu.achievements.map((achievement, idx) => (
                                                        <li key={idx}>{achievement}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
            <Achievement></Achievement>
        </div>
    );
};

export default Education;