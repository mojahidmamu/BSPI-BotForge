import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Users, Mail, Linkedin, Award, BookOpen, Cpu, Zap, Shield, Star, ChevronRight } from 'lucide-react';

const Moderator = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.1 });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    // Principal Data
    const principal = {
        name: "Engr. Md. Joy Krishan Dey",
        position: "Principal & Chief Moderator",
        department: "BSPI, Rangamati",
        expertise: "Robotics & Automation",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        quote: "Where Brilliance Meets Excellence",
        email: "principal@bspi.edu.bd",
        linkedin: "#",
        education: "M.Sc. in Robotics Engineering",
        experience: "15+ Years in Education"
    };

    // Moderator Teachers Data
    const moderators = [
        {
            id: 1,
            name: "Prof. Dr. Md. Abdur Rahman",
            position: "Senior Moderator",
            department: "Computer Science",
            expertise: "AI & Machine Learning",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            email: "rahman@bspi.edu.bd",
            linkedin: "#",
            education: "PhD in AI"
        },
        {
            id: 2,
            name: "Engr. Farhana Akhter",
            position: "Technical Moderator",
            department: "Electronics",
            expertise: "Embedded Systems",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            email: "farhana@bspi.edu.bd",
            linkedin: "#",
            education: "M.Sc. in Electronics"
        },
        {
            id: 3,
            name: "Md. Kamal Hossain",
            position: "Workshop Coordinator",
            department: "Mechatronics",
            expertise: "Automation & Control",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            email: "kamal@bspi.edu.bd",
            linkedin: "#",
            education: "B.Sc. in Mechatronics"
        },
        {
            id: 4,
            name: "Sharmin Sultana",
            position: "Research Moderator",
            department: "Robotics",
            expertise: "Computer Vision",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            email: "sharmin@bspi.edu.bd",
            linkedin: "#",
            education: "M.Sc. in Robotics"
        },
        {
            id: 5,
            name: "Engr. Rafiqul Islam",
            position: "Lab Moderator",
            department: "Electrical Engineering",
            expertise: "Power Systems",
            image: "https://randomuser.me/api/portraits/men/4.jpg",
            email: "rafiqul@bspi.edu.bd",
            linkedin: "#",
            education: "B.Sc. in Electrical"
        },
        {
            id: 6,
            name: "Nusrat Jahan",
            position: "Project Moderator",
            department: "Software Engineering",
            expertise: "Web & Mobile Dev",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            email: "nusrat@bspi.edu.bd",
            linkedin: "#",
            education: "M.Sc. in Software"
        },
        {
            id: 7,
            name: "Md. Shahidul Alam",
            position: "Competition Moderator",
            department: "Mechanical Engineering",
            expertise: "CAD & Design",
            image: "https://randomuser.me/api/portraits/men/5.jpg",
            email: "shahidul@bspi.edu.bd",
            linkedin: "#",
            education: "B.Sc. in Mechanical"
        },
        {
            id: 8,
            name: "Tahmina Akter",
            position: "Event Moderator",
            department: "Communication",
            expertise: "Public Relations",
            image: "https://randomuser.me/api/portraits/women/4.jpg",
            email: "tahmina@bspi.edu.bd",
            linkedin: "#",
            education: "MBA in Marketing"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const principalVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
            },
        },
    };

    return (
        <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: -30 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-4">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Moderator Teacher Panel
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Meet our dedicated faculty members who guide and inspire the next generation of robotics innovators
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-3 font-semibold">
                        📅 Academic Year 2025-26
                    </p>
                </motion.div>

                {/* Principal Card - Top Row (Single Card) */}
                <motion.div
                    variants={principalVariants}
                    initial="hidden"
                    animate={controls}
                    className="mb-12"
                >
                    <div className="relative group">
                        {/* Glowing Background Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                        
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Image Section */}
                                <div className="relative md:col-span-1 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                                        <img
                                            src={principal.image}
                                            alt={principal.name}
                                            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2 z-20">
                                            <Star className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="md:col-span-2 p-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Award className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Chief Moderator</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {principal.name}
                                    </h3>
                                    <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-4">
                                        {principal.position}
                                    </p>
                                    
                                    {/* Quote */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-4 border-l-4 border-purple-500">
                                        <p className="text-gray-700 dark:text-gray-300 italic">
                                            "{principal.quote}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-purple-600" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{principal.education}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-purple-600" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{principal.experience}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Cpu className="w-4 h-4 text-purple-600" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{principal.expertise}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-purple-600" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{principal.department}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <a href={principal.linkedin} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                            <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </a>
                                        <a href={`mailto:${principal.email}`} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Moderators Grid - 2 Rows with 4 Cards Each */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {moderators.map((moderator, index) => (
                        <motion.div
                            key={moderator.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                                {/* Image Section */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 pt-6">
                                    <div className="relative w-28 h-28 mx-auto">
                                        <img
                                            src={moderator.image}
                                            alt={moderator.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 transition-all duration-300"></div>
                                    </div>
                                    
                                    {/* Badge */}
                                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                                        {moderator.position === "Senior Moderator" && "⭐ Senior"}
                                        {moderator.position === "Technical Moderator" && "🔧 Tech"}
                                        {moderator.position === "Workshop Coordinator" && "🛠️ Workshop"}
                                        {moderator.position === "Research Moderator" && "🔬 Research"}
                                        {moderator.position === "Lab Moderator" && "⚡ Lab"}
                                        {moderator.position === "Project Moderator" && "📱 Project"}
                                        {moderator.position === "Competition Moderator" && "🏆 Competition"}
                                        {moderator.position === "Event Moderator" && "🎉 Event"}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 text-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {moderator.name}
                                    </h3>
                                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-2">
                                        {moderator.position}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                        {moderator.department}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                        {moderator.expertise}
                                    </p>
                                    
                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full">
                                            {moderator.expertise.split(' ')[0]}
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-2">
                                        <a href={moderator.linkedin} className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                            <Linkedin className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                        </a>
                                        <a href={`mailto:${moderator.email}`} className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                                            <Mail className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Decorative Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={controls}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 px-6 py-3 rounded-full">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            WHERE BRILLIANCE MEETS EXCELLENCE
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Moderator;