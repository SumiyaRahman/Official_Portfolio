import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

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
        <div className="min-h-screen bg-[#0F172A] py-20 px-4 lg:px-8">
            <motion.div 
                className="container mx-auto max-w-6xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.div 
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-400 text-transparent bg-clip-text">
                            Educational Journey
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My academic background and qualifications
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto mt-6"></div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-indigo-600"></div>

                    {/* Education Items */}
                    {educationData?.map((edu, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`flex flex-col md:flex-row gap-8 mb-12 relative ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-8px] md:left-1/2 top-0 w-4 h-4 rounded-full bg-purple-500 
                                          transform md:-translate-x-1/2 border-4 border-[#0F172A]"></div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 ml-8 md:ml-0">
                                <motion.div 
                                    className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50
                                             hover:border-purple-500/50 transition-all duration-300
                                             transform hover:-translate-y-1"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Institution */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaUniversity className="text-purple-500 text-xl" />
                                        <h3 className="text-xl font-bold text-white">
                                            {edu.instituteName}
                                        </h3>
                                    </div>

                                    {/* Degree */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <FaGraduationCap className="text-purple-400 text-xl" />
                                        <h4 className="text-lg text-purple-400">
                                            {edu.degree}
                                        </h4>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                                        <FaCalendarAlt />
                                        <span>{edu.yearRange}</span>
                                    </div>

                                    {/* Achievements/Highlights */}
                                    {edu.achievements && (
                                        <div className="mt-4">
                                            <h5 className="text-purple-400 font-semibold mb-2">Highlights:</h5>
                                            <ul className="list-disc list-inside text-gray-300 space-y-1">
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
            </motion.div>
        </div>
    );
};

export default Education;