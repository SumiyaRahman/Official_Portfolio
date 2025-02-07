import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

const Achievement = () => {
    const { data: achievements = [] } = useQuery({
        queryKey: ['achievements'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/achievements');
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
        <div className="py-16 bg-[#0F172A]">
            <motion.div 
                className="container mx-auto px-4 max-w-6xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <motion.div 
                    className="text-center mb-12 sm:mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-400 text-transparent bg-clip-text">
                            My Achievements
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                        Recognition and milestones in my journey
                    </p>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto mt-4 sm:mt-6"></div>
                </motion.div>

                <div className="space-y-6">
                    {achievements.map((achievement) => (
                        <motion.div 
                            key={achievement._id}
                            variants={itemVariants}
                            className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50
                                     hover:border-purple-500/50 transition-all duration-300
                                     transform hover:-translate-y-1"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-start gap-4 sm:gap-6">
                                <div className="flex-shrink-0">
                                    <FaTrophy className="text-purple-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-300 transform group-hover:scale-110" />
                                </div>
                                <div className="flex-1 space-y-2 sm:space-y-3">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        {achievement.name}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {achievements.length === 0 && (
                    <p className="text-center text-gray-400 text-lg">
                        No achievements found
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default Achievement;
