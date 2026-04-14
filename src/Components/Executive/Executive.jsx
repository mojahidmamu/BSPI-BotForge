import React from 'react';

import { motion } from "framer-motion";
import { useState } from "react";
import president from "../../assets/image/Executive2025/precident.jpeg";
import A from "../../assets/image/Executive2025/A.jpeg";
import B from "../../assets/image/Executive2025/B.jpeg";
import C from "../../assets/image/Executive2025/C.jpeg";
import D from "../../assets/image/Executive2025/D.jpeg";
import E from "../../assets/image/Executive2025/E.jpeg";
import F from "../../assets/image/Executive2025/F.jpeg";
import G from "../../assets/image/Executive2025/G.jpeg";
import H from "../../assets/image/Executive2025/H.jpeg";
import I from "../../assets/image/Executive2025/I.jpeg";
import J from "../../assets/image/Executive2025/J.jpeg";
import K from "../../assets/image/Executive2025/K.jpeg";
import L from "../../assets/image/Executive2025/L.jpeg";
// 
import president2 from "../../assets/image/Executive2026/President.jpeg";
import a from "../../assets/image/Executive2026/A.jpeg";
import b from "../../assets/image/Executive2026/B.jpeg";
import c from "../../assets/image/Executive2026/C.jpeg";
import d from "../../assets/image/Executive2026/D.jpeg";
import e from "../../assets/image/Executive2026/E.jpeg";
import f from "../../assets/image/Executive2026/F.jpeg";
import g from "../../assets/image/Executive2026/G.jpeg"; 
import i from "../../assets/image/Executive2026/I.jpeg";
import j from "../../assets/image/Executive2026/J.jpeg";
import k from "../../assets/image/Executive2026/K.jpeg";
import l from "../../assets/image/Executive2026/L.jpeg";
import m from "../../assets/image/Executive2026/M.jpeg";
import n from "../../assets/image/Executive2026/N.jpeg";
import o from "../../assets/image/Executive2026/O.jpeg";
import p from "../../assets/image/Executive2026/P.jpeg";
// 
import Alumnai1 from "../../assets/image/Alumnai/A.jpeg";
import Alumnai2 from "../../assets/image/Alumnai/B.jpeg";
import Alumnai3 from "../../assets/image/Alumnai/C.jpeg";
import Alumnai4 from "../../assets/image/Alumnai/D.jpeg";
import Alumnai5 from "../../assets/image/Alumnai/E.jpeg";
import Alumnai6 from "../../assets/image/Alumnai/F.jpeg";
import { Helmet } from 'react-helmet-async';

const data = {

    "2024-2025": [
            {
            name: "Rishad Mahmud",
            role: "President",
            img: president,
            },
            {
            name: "Rezuan Sajid Nahin",
            role: "Central Secretary",
            img: A,
            },
            {
            name: "Tahsin Kabir Ratul",
            role: "Joint Secretary ",
            img: B,
            },
            {
            name: "Saiful Islam",
            role: "Vice President",
            img: C,
            },
            {
            name: "Md. Tarek",
            role: "Joint Secretary",
            img: D, 
            },
            {
            name: "Md. Maruful Islam",
            role: "PR of Socail Department",
            img: E,
            },
            {
            name: "Md. Rayan",
            role: "Finance Secretary",
            img: F,
            },
            {
            name: "Md. Shahidullah Kaisar",
            role: "Event Planing & Management",
            img: G,
            },
            {
            name: "Md. Sayed Sabbir",
            role: "Event Planing & Management",
            img: H,
            },
            {
            name: "Md. Sohel",
            role: "Joint Secretary",
            img: I,
            },
            {
            name: "Rodra Biswas",
            role: "Secretary Technical Dept. ",
            img: J,
            },
            {
            name: "Arafat Uddin Rafit",
            role: "PR of Socail Department",
            img: K,
            },
            {
            name: "Emon Datta",
            role: "Secretary Technical Dept. ",
            img: L,
            },
    ],

    "2025-2026": [
            {
            name: "Tarek Hossain",
            role: "President",
            img: president2,
            },
            {
            name: "Md. Ansar ",
            role: "Vice President",
            img: a,
            },
            {
            name: "Tsmail Hossain Maruf",
            role: "General Secretary",
            img: b,
            },
            {
            name: "Md. Samiullah Haque Saim",
            role: "Vice President",
            img: c, 
            },
            {
            name: "Fazle Rob",
            role: "Finance Secretary",
            img: d,
            },
            {
            name: "Sanbin Shakawat Sahel",
            role: "IT Secretary",
            img: e,
            },
            {
            name: "Md. Misbahul Islam",
            role: "Joint Secretary",
            img: f,
            },
            {
            name: "Sanjida Jannat Saom",
            role: "Assistant Joint IT Secretary",
            img: g,
            },
            {
            name: "Md. Nadim Miah",
            role: "Event Secretary",
            img: i,
            },
            {
            name: "Arafat Uddin Rafit",
            role: "PR of Socail Department",
            img: j,
            },
            {
            name: "Raful Hosun Ratul",
            role: "Joint IT Secretary ",
            img: j,
            },
            {
            name: "Nur Jahan Akter Shimu",
            role: "Joint IT Secretary",
            img: k,
            },
            {
            name: "Atiqul Islam",
            role: "PR of Socail Media",
            img: l,
            },
            {
            name: "Mirhad Hossain Riad",
            role:"PR of Socail Media",
            img: m,
            },
            {
            name: "Joynal Abedin",
            role: "Assistant Joint IT Secretary",
            img: n,
            },
            {
            name: "Emhan Datta",
            role: "Joint Technical Secretary ",
            img: o,
            },
            {
            name: "Abdullah all Zawat",
            role: "Technical Secretary",
            img: p,
            },

    ],

    "2026-2027": [
        {
            name: "Future President will be select in 2027",
            role: "President",
            img: "",
        },    
    ],
};

const Executive = () => {

    const [activeTab, setActiveTab] = useState("2025-2026");

    const members = data[activeTab];
    const president = members.find((m) => m.role === "President");
    const others = members.filter((m) => m.role !== "President");

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

    const cardVariants = {
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

    const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
};


    return (
        <div max-w-7xl mx-auto px-4 py-10>
            <Helmet>
                <title>BSPI BotForge | Our Hero</title>
            </Helmet>
            {/* Header & Title  */}
            <div className="max-w-4xl mx-auto pt-20 text-center space-y-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900 dark:text-white">Executive </span>
                    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                        Members
                    </span>
                </h2>

                {/* Gradient Underline */}
                <div className="flex justify-center ">
                    <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                </div>

                {/* Optional Subtext */}
                {/* <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm md:text-base">
                    Here’s a summary of my academic journey and milestones.
                </p> */}
            </div>

            {/* Tabs */}
            <div role="tablist" className="tabs tabs-lift mb-8 ml-116">
                {Object.keys(data).map((year) => (
                <a
                    key={year}
                    role="tab"
                    className={`font-bold tab ${activeTab === year ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(year)}
                >
                    {year}
                </a>
                ))}
            </div>

           {/* President Card (Full Row - Large & Prominent) */}
        {president && (
            <div className="mb-16">
                <div className="relative group">
                    {/* Glowing Background Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-purple-500/30">
                        <div className="grid lg:grid-cols-3 gap-0">
                            {/* Image Section - Larger & Centered */}
                            <div className="relative lg:col-span-1 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 flex items-center justify-center">
                                <div className="relative">
                                    {/* Animated Ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-ping opacity-20"></div>
                                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-xl opacity-50"></div>
                                    <img
                                        src={president.img}
                                        alt={president.name}
                                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-2xl z-10"
                                        onError={handleImageError}
                                    />
                                    {/* Crown/Star Badge */}
                                    <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2 z-20 shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section - Larger Text */}
                            <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                                {/* Role Badge */}
                                <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full w-fit mb-4">
                                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2z"/>
                                    </svg>
                                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Executive President</span>
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                                    {president.name}
                                </h2>
                                
                                <p className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-semibold mb-4">
                                    {president.role}
                                </p>
                                
                                {/* Quote/Message */}
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 mb-5 border-l-4 border-purple-500">
                                    <p className="text-gray-700 dark:text-gray-300 text-lg italic">
                                        "Leading BSPI Robotics Club with innovation, excellence, and a vision to build future tech leaders."
                                    </p>
                                </div>
                                
                                {/* Stats or Quick Info */}
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">150+</div>
                                        <div className="text-xs text-gray-500">Active Members</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">30+</div>
                                        <div className="text-xs text-gray-500">Projects</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">15+</div>
                                        <div className="text-xs text-gray-500">Awards</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}


        {/* Other Members Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, threshold: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {others.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="group cursor-pointer"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                            {/* Image Section - Full width card image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={member.img}  // ✅ FIXED: Changed from member.image to member.img
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={handleImageError}
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                
                                {/* Role Badge */}
                                <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full z-10">
                                    {member.role}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-4 text-center relative">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                                    {member.name}
                                </h3>
                                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>


            {/* Alumnai */}
            <div>
                {/* Header & Title  */}
                <div className="max-w-4xl mx-auto pt-20 text-center space-y-4 mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        <span className="text-slate-900 dark:text-white">Our </span>
                        <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                            Hero
                        </span>
                    </h2>

                    {/* Gradient Underline */}
                    <div className="flex justify-center ">
                        <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                    </div>

                    {/* Optional Subtext */}
                    <p className="text-gray-500 dark:text-gray-300 font-bold mt-2 text-sm md:text-base">
                        Our Alumnai who support and advice our BSPI Robotics Club
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    {/* Card 1 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai1}
                                alt="Sukanta Sharma"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Sukanta Sharma</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Robotics & Automation Expert</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai2}
                                alt="Pial Barua"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Pial Barua</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">AI & Machine Learning Specialist</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai3}
                                alt="Abdullah all Kibria"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Abdullah all Kibria</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Embedded Systems Engineer</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai4}
                                alt="Eng. Md. Abu Huraira"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Eng. Md. Abu Huraira</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">IoT & Smart Systems Expert</p>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai5}
                                alt="Noyon Chowdhory"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Noyon Chowdhory</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Computer Vision Researcher</p>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <figure className="px-6 pt-6">
                            <img
                                src={Alumnai6}
                                alt="Md. Faisal Ahmed"
                                className="rounded-full w-32 h-32 object-cover border-4 border-purple-500"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-bold">Md. Faisal Ahmed</h2>
                            <p className="text-sm text-purple-600 font-semibold">Advisor</p>
                            <p className="text-xs text-gray-500">Robotics Engineering Lead</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Executive;