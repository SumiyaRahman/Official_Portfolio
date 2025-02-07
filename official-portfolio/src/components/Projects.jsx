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
      const res = await axios.get("http://localhost:3000/project");
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
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] py-24 px-6 lg:px-12">
      <motion.div
        className="container mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="text-center mb-20" variants={cardVariants}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore my creative works and innovative solutions
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData?.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-gray-900/60 rounded-2xl overflow-hidden backdrop-blur-lg
                        border border-gray-700/50 hover:border-purple-500/50 
                        transition-all duration-500 group shadow-xl hover:shadow-purple-500/20"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {project.projectName}
                </h3>
                <p className="text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-4">
                  <Link
                    to={`/project/${project._id}`}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                             text-white rounded-xl font-semibold hover:from-purple-700 
                             hover:to-pink-700 transition-all duration-300 text-center
                             shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  >
                    View Details
                  </Link>
                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                       className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 hover:text-white transition-all">
                      <FaGithub size={20} />
                    </a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                       className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 hover:text-white transition-all">
                      <FaExternalLinkAlt size={20} />
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
