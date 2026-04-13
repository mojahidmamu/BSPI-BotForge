import React from "react";
import { motion } from "framer-motion";
import Head from "../../assets/image/Moderator/Principal.jpeg";
import image1 from "../../assets/image/Moderator/A.jpeg";
import image2 from "../../assets/image/Moderator/B.jpeg";
import image3 from "../../assets/image/Moderator/C.jpeg";
import image4 from "../../assets/image/Moderator/D.jpeg";
import image5 from "../../assets/image/Moderator/E.jpeg";
import image6 from "../../assets/image/Moderator/F.jpeg";
import image7 from "../../assets/image/Moderator/G.jpeg";
import image8 from "../../assets/image/Moderator/H.jpeg";

const Moderator = () => {

    // 👉 Principal (from your image)
    const principal = {
        name: "Ropak Kanti Biswas",
        role: "Principal of BSPI",
        image: {Head}
    };

    // 👉 Teachers (replace with your real data)
    const teachers = [
        { id: 1, name: "Teacher 1", role: "Instructor", image: {image1} },
        { id: 2, name: "Teacher 2", role: "Instructor", image: {image2} },
        { id: 3, name: "Teacher 3", role: "Instructor", image: {image3} },
        { id: 4, name: "Teacher 4", role: "Instructor", image: {image4} },
        { id: 5, name: "Teacher 5", role: "Instructor", image: {image5} },
        { id: 6, name: "Teacher 6", role: "Instructor", image: {image6} },
        { id: 7, name: "Teacher 7", role: "Instructor", image: {image7} },
        { id: 8, name: "Teacher 8", role: "Instructor", image: {image8} },
    ];

     // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const teacherCardVariants = {
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

    return (
        <section className=" md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Moderator Panel 2025–26
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Our respected principal and teachers guiding BSPI Robotics Club
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                {/* ⭐ PRINCIPAL CARD - Full Width with Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-16"
                >
                    <div className="relative group">
                        {/* Glowing Background Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                        
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="grid md:grid-cols-3 gap-0">
                                {/* Image Section - Full height on left */}
                                <div className="relative md:col-span-1 h-80 md:h-auto">
                                    <img
                                        src={principal.image}
                                        alt={principal.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"></div>
                                </div>

                                {/* Content Section */}
                                <div className="md:col-span-2 p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2z"/>
                                        </svg>
                                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Chief Moderator</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {principal.name}
                                    </h3>
                                    <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-4">
                                        {principal.role}
                                    </p>
                                    
                                    {/* Quote */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border-l-4 border-purple-500">
                                        <p className="text-gray-700 dark:text-gray-300 italic">
    "We don't just teach robotics; we inspire innovation, foster creativity, and build a community of future tech leaders who will change the world."
</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 👨‍🏫 TEACHERS GRID - Full Image Cards (2 rows x 4 columns) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, threshold: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {teachers.map((teacher, index) => (
                        <motion.div
                            key={teacher.id}
                            variants={teacherCardVariants}
                            whileHover={{ y: -8 }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                                {/* Image Section - Full width card image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={teacher.image}
                                        alt={teacher.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    
                                    {/* Role Badge */}
                                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full z-10">
                                        {teacher.role === "Senior Moderator" && "⭐ Senior"}
                                        {teacher.role === "Technical Moderator" && "🔧 Tech"}
                                        {teacher.role === "Workshop Coordinator" && "🛠️ Workshop"}
                                        {teacher.role === "Research Moderator" && "🔬 Research"}
                                        {teacher.role === "Lab Moderator" && "⚡ Lab"}
                                        {teacher.role === "Project Moderator" && "📱 Project"}
                                        {teacher.role === "Competition Moderator" && "🏆 Competition"}
                                        {teacher.role === "Event Moderator" && "🎉 Event"}
                                    </div>
                                </div>

                                {/* Content Section - Overlay on image bottom */}
                                {/* <div className="p-4 text-center relative">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                                        {teacher.name}
                                    </h3>
                                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                                        {teacher.role}
                                    </p>
                                </div> */}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Decorative Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 px-6 py-3 rounded-full">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2z"/>
                        </svg>
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