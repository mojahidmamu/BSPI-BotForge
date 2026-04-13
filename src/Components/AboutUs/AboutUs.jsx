import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Trophy } from "lucide-react";

const AboutUs = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold">
                        <span className="text-gray-900 dark:text-white">About </span>
                        <span className="text-purple-600">BSPI Robotics Club</span>
                    </h2>

                    <p className="mt-4 text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
                        A community of passionate students dedicated to innovation, robotics, and cutting-edge technology.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left - Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Who We Are
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            BSPI Robotics Club is a hub for innovation where students explore robotics, electronics, AI, and automation. 
                            We aim to develop real-world skills through hands-on projects, workshops, and competitions.
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Our club encourages creativity, teamwork, and problem-solving to prepare students for future technological challenges.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div>
                                <h4 className="text-2xl font-bold text-purple-600">150+</h4>
                                <p className="text-sm text-gray-500">Members</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-purple-600">30+</h4>
                                <p className="text-sm text-gray-500">Projects</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-purple-600">15+</h4>
                                <p className="text-sm text-gray-500">Awards</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        {/* Mission */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                            <Target className="w-8 h-8 text-purple-600 mb-3" />
                            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                                Our Mission
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                To empower students with practical knowledge in robotics and modern technologies.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                            <Lightbulb className="w-8 h-8 text-yellow-500 mb-3" />
                            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                                Our Vision
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                To become a leading robotics community inspiring innovation and creativity.
                            </p>
                        </div>

                        {/* Community */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                            <Users className="w-8 h-8 text-indigo-500 mb-3" />
                            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                                Our Community
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                A collaborative environment where students learn, build, and grow together.
                            </p>
                        </div>

                        {/* Achievements */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                            <Trophy className="w-8 h-8 text-green-500 mb-3" />
                            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                                Achievements
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Successfully organized competitions, workshops, and award-winning projects.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;