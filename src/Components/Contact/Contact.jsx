    import React, { useState } from "react";
    import { Helmet } from "react-helmet-async"; 
    import { CheckCircle, Send, Loader2 } from "lucide-react";
    import { motion, AnimatePresence } from "framer-motion";

    import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaLinkedin, 
    FaFacebook,
    FaGlobe, 
    } from "react-icons/fa"; 

    const contactItems = [
    {
        icon: <FaGlobe />,
        text: "BSPI Official Website",
        label: "Website",
        link: "https://bspi.polytech.gov.bd/",
    },
    {
        icon: <FaLinkedin />,
        text: "BSPI Robotics Club",
        label: "LinkedIn",
        link: "https://www.linkedin.com/company/bspi-robotics-club/",
    },
    {
        icon: <FaFacebook />,
        text: "BSPI Robotics Club",
        label: "Facebook",
        link: "https://www.facebook.com/groups/1680854132892299",
    },
    {
        icon: <FaEnvelope />,
        text: " bspiroboticsclub@gmail.com",
        label: "Email here",
        email: true,
    },
    { 
        icon: <FaPhone />, 
        text: "+880 1834-822958", 
        label: "Call her-(President)",
        phone: true,
    },
    {
        icon: <FaMapMarkerAlt />,
        text: "Kaptai, Rangamati, BANGLADESH",
        label: "Location",
    },
    ];

    const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    
    const [sent, setSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(""); 
        
        try {
            // Make actual API call to your backend
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),  
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Show success message
                setSent(true);
                
                // Reset form fields
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
                
                // Auto hide success message after 4 seconds
                setTimeout(() => setSent(false), 4000);
            } else {
                // Show error message from server
                setError(data.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setError("Network error. Please check if the server is running and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Helmet>
            <title>BSPI BotForge | Contact</title>
        </Helmet>

        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-start gap-12 max-w-7xl mx-auto"
        >
            {/* Left - Header / Text */}
            <motion.div variants={itemVariants} className="md:w-1/2 flex flex-col justify-center space-y-2">
            <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center md:text-left leading-tight">
                <span className="text-slate-900 dark:text-white">Let's Connect </span>
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                    with BSPI BotForge
                </span>
                </h2>
            </div>

            {/* Underline with animation */}
            <div className="flex justify-center md:justify-start">
                <motion.span 
                initial={{ width: 0 }}
                animate={{ width: 112 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                />
            </div>

        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-md text-center md:text-left mt-2 leading-relaxed">
            Welcome to BSPI Robotics Club! We're passionate about building robots, 
            solving real-world problems, and competing in national challenges. 
            Got questions about membership, workshops, or upcoming events? 
            Let's connect and build the future together!
        </p>
            {/* Contact List */}
            <div className="space-y-4 mt-4">
                {contactItems.map((item, index) => (
                <motion.div 
                    key={index} 
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                >
                    {/* Icon Box */}
                    <div
                    className="w-12 h-12 flex items-center justify-center rounded-2xl 
                        bg-gradient-to-br from-teal-500/10 to-purple-500/10 text-teal-500
                        group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-purple-600
                        group-hover:text-white group-hover:shadow-lg
                        transition-all duration-300"
                    >
                    {item.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500/70 dark:text-slate-400">
                        {item.label}
                    </p>
                    {item.link ? (
                        <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-800 dark:text-white hover:text-teal-500 transition-colors duration-200 inline-block"
                        >
                        {item.text}
                        </a>
                    ) : item.email ? (
                        <a
                        href={`mailto:${item.text}`}
                        className="font-medium text-slate-800 dark:text-white hover:text-teal-500 transition-colors duration-200 inline-block"
                        >
                        {item.text}
                        </a>
                    ) : item.phone ? (
                        <a
                        href={`tel:${item.text}`}
                        className="font-medium text-slate-800 dark:text-white hover:text-teal-500 transition-colors duration-200 inline-block"
                        >
                        {item.text}
                        </a>
                    ) : (
                        <p className="font-medium text-slate-800 dark:text-white">
                        {item.text}
                        </p>
                    )}
                    </div>
                </motion.div>
                ))}
            </div>

            {/* Optional: Add social proof or working hours */}
            <motion.div 
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Usually responds within 24 hours</span>
                </div>
            </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div variants={itemVariants} className="md:w-1/2">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-5 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
            >
                {/* Error message display */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <div className="text-center mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send a Message</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">I'll get back to you as soon as possible</p>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-purple-500">*</span> Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-purple-500">*</span> Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-purple-500">*</span> Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry / Collaboration / Question"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-purple-500">*</span> Your Message
                </label>
                <textarea
                    name="message"
                    placeholder="Tell me about your project or what you'd like to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                </div>

                {/* Submit Button */}
                <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                {isSubmitting ? (
                    <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                    </>
                ) : (
                    <>
                    <Send size={20} />
                    Send Message
                    </>
                )}
                </motion.button>
            </form>

            {/* Success Message Toast */}
            <AnimatePresence>
                {sent && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    className="fixed top-20 right-4 left-4 md:left-auto md:right-8 md:min-w-[320px] flex gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 shadow-2xl z-50 backdrop-blur-sm"
                >
                    <div className="flex-shrink-0">
                    <CheckCircle className="text-green-600 dark:text-green-400 text-2xl" />
                    </div>
                    <div>
                    <p className="font-semibold text-green-800 dark:text-green-300">
                        Message sent successfully! ✨
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-0.5">
                        Thanks for reaching out — I'll reply within 24 hours.
                    </p>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
            </motion.div>
        </motion.div>
        </div>
    );
    };

    export default Contact;