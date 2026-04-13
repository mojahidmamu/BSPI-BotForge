import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Rocket, Zap, Cpu, CircuitBoard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/image/Logo2.jpeg";

const Banner = () => {
    const navigate = useNavigate();

    const roles = ["Innovators", "Engineers", "Creators", "Problem Solvers"];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];

        const timer = setTimeout(() => {
            if (isDeleting) {
                setDisplayText(currentRole.substring(0, displayText.length - 1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setRoleIndex((prev) => (prev + 1) % roles.length);
                }
            } else {
                setDisplayText(currentRole.substring(0, displayText.length + 1));
                if (displayText.length === currentRole.length) {
                    setIsDeleting(true);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex]);

    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">

            {/* Glow Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-purple-400 rounded-full w-2 h-2"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    animate={{ y: [0, -50, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            ))}

            <div className="relative max-w-7xl mx-auto px-4 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-white/90">Since 25 February,  2025 • BSPI</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="text-white">BSPI </span>
                            <span className="text-purple-400">Robotics Club</span>
                        </h1>

                        <div className="mb-6 text-xl text-white">
                            We are{" "}
                            <span className="text-purple-400 font-bold border-r-2 border-purple-400 pr-1">
                                {displayText}
                            </span>
                        </div>

                        <p className="text-gray-300 mb-6">
                            Build, innovate and lead the future with robotics and AI.
                        </p>

                        <div className="flex gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => navigate('/contribute/member')}
                                className="px-6 py-3 bg-purple-600 rounded-lg text-white"
                            >
                                Join with Us
                            </button>

                            <button
                                onClick={() => navigate('/activities')}
                                className="px-6 py-3 border border-purple-400 text-purple-400 rounded-lg flex items-center gap-2"
                            >
                                Explore <ChevronRight />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative bg-white/5 backdrop-blur-sm p-12 rounded-3xl text-center border border-purple-500/20 shadow-2xl overflow-hidden">

                            {/* Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-3xl"></div>

                            {/* BIG Animated Logo */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    scale: [1, 1.08, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative z-10 flex justify-center"
                            >
                                <img
                                    src={logo}
                                    alt="BSPI Robotics Club Logo"
                                    className="w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-2xl rounded-xl"
                                />
                            </motion.div>

                            {/* Animated Icon */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="mt-6 flex justify-center"
                            >
                                <Zap className="w-12 h-12 text-yellow-400" />
                            </motion.div>

                            {/* Text */}
                            <p className="text-gray-300 mt-4 text-sm md:text-base tracking-wide relative z-10">
                                Powered by Innovation & Robotics
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Banner;