import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaTools, FaLightbulb, FaRocket } from 'react-icons/fa';

const ViewDetails = () => {
    const { id } = useParams();

    const { data: project } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/project/${id}`);
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
                animate="visible"
                variants={containerVariants}
            >
                {/* Project Header */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text">
                            {project?.projectName}
                        </span>
                    </h1>
                    <div className="flex justify-center gap-6 mt-10">
                        <a 
                            href={project?.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-primary
                                     rounded-lg cursor-pointer text-white hover:from-purple-700 hover:to-indigo-700 transition-all"
                        >
                            <FaExternalLinkAlt /> Live Demo
                        </a>
                        <a 
                            href={project?.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg text-white 
                                     hover:bg-gray-700 cursor-pointer transition-all"
                        >
                            <FaGithub /> Source Code
                        </a>
                    </div>
                </motion.div>

                {/* Project Image */}
                <motion.div 
                    variants={itemVariants}
                    className="relative rounded-2xl overflow-hidden mb-12 group"
                >
                    <img 
                        src={project?.image} 
                        alt={project?.projectName}
                        className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>
                </motion.div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div 
                        variants={itemVariants}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Description */}
                        <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {project?.description}
                            </p>
                        </div>

                        {/* Challenges */}
                        <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <FaTools className="text-purple-500" /> Challenges & Solutions
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                {project?.challenges}
                            </p>
                        </div>

                        {/* Future Plans */}
                        <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <FaRocket className="text-purple-500" /> Future Improvements
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                {project?.improvements}
                            </p>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-8"
                    >
                        {/* Tech Stack */}
                        <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <FaLightbulb className="text-purple-500" /> Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                            <p className="text-gray-300 leading-relaxed">
                                {project?.techStack}
                            </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ViewDetails;