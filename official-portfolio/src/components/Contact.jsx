import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const templateParams = {
            name: `${formRef.current.firstName.value} ${formRef.current.lastName.value}`,
            description: formRef.current.message.value,
            email: formRef.current.email.value,
            phone: formRef.current.phone.value,
            subject: formRef.current.subject.value
        };
        
        try {
            await emailjs.send(
                'service_j8nwhek',
                'template_woujkxj',
                templateParams,
                '7TFhA1yYWSh9_Su_s'
            );
            setSubmitStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error('Email error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 3000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
                className="container mx-auto"
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
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 playfair">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text">
                            Let's Connect
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        I design and code beautifully simple things and i love what i do. Just simple like that!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div variants={itemVariants}>
                        <form 
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                                             text-gray-300 focus:outline-none focus:border-purple-500 
                                             transition-colors duration-300"
                                    variants={itemVariants}
                                />
                                <motion.input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                                             text-gray-300 focus:outline-none focus:border-purple-500 
                                             transition-colors duration-300"
                                    variants={itemVariants}
                                />
                            </div>

                            <motion.input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                                         text-gray-300 focus:outline-none focus:border-purple-500 
                                         transition-colors duration-300"
                                variants={itemVariants}
                            />

                            <motion.input
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                                         text-gray-300 focus:outline-none focus:border-purple-500 
                                         transition-colors duration-300"
                                variants={itemVariants}
                            />

                            <motion.select
                                name="subject"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                                         text-gray-300 focus:outline-none focus:border-purple-500 
                                         transition-colors duration-300"
                                variants={itemVariants}
                            >
                                <option value="">Select an option</option>
                                <option value="project">Project Inquiry</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="other">Other</option>
                            </motion.select>

                            <motion.textarea
                                name="message"
                                placeholder="Message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                                         text-gray-300 focus:outline-none focus:border-purple-500 
                                         transition-colors duration-300 resize-none"
                                variants={itemVariants}
                            />

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                                         rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 
                                         transition-all duration-300 disabled:opacity-50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {submitStatus === 'success' && (
                                <p className="text-green-500 text-center">Message sent successfully!</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-8"
                    >
                        <motion.div 
                            className="flex items-center space-x-4"
                            whileHover={{ x: 10 }}
                        >
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                <FaPhone className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-300 font-semibold">Phone</h3>
                                <p className="text-gray-400">+880 1739345183</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="flex items-center space-x-4"
                            whileHover={{ x: 10 }}
                        >
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                <FaEnvelope className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-300 font-semibold">Email</h3>
                                <p className="text-gray-400">sumiyabintearahman24@gmail.com</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="flex items-center space-x-4"
                            whileHover={{ x: 10 }}
                        >
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                <FaMapMarkerAlt className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-gray-300 font-semibold">Address</h3>
                                <p className="text-gray-400">Jashore, Bangladesh</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;