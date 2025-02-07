import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("https://official-portfolio-server.vercel.app/project");
      return res.data;
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div id="projects" className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12">
      <motion.div
        className="container mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="text-center mb-12 sm:mb-16 lg:mb-20" variants={cardVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="playfair bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Explore my creative works and innovative solutions
          </p>
          <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto mt-6 sm:mt-8 rounded-full"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projectsData?.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-gray-900/60 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-lg
                        border border-gray-700/50 hover:border-purple-500/50 
                        transition-all duration-500 group shadow-xl hover:shadow-purple-500/20"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 sm:h-52 lg:h-56">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                  {project.projectName}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-purple-500/20 text-purple-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to={`/project/${project._id}`}
                    className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                             text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-purple-700 
                             hover:to-pink-700 transition-all duration-300 text-center
                             shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  >
                    View Details
                  </Link>
                  <div className="flex justify-center gap-3">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                       className="p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 rounded-lg sm:rounded-xl text-gray-300 hover:text-white transition-all">
                      <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                       className="p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 rounded-lg sm:rounded-xl text-gray-300 hover:text-white transition-all">
                      <FaExternalLinkAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
