import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is the main goal of BSPI Robotics Club?",
            answer:
                "Our main goal is to help students learn robotics, programming, and modern technologies through practical projects, workshops, and competitions."
        },
        {
            question: "I am a beginner. Can I join the club?",
            answer:
                "Yes! Beginners are always welcome. We guide you step by step from basic to advanced level with hands-on learning."
        },
        {
            question: "What kind of projects do you work on?",
            answer:
                "We work on robotics projects, Arduino, IoT systems, AI-based applications, and real-world automation solutions."
        },
        {
            question: "Do I need prior coding knowledge?",
            answer:
                "No, it's not required. We provide learning sessions to help you start from zero and grow your skills."
        },
        {
            question: "How will this club help my career?",
            answer:
                "You will gain practical skills, teamwork experience, and real project knowledge which are very valuable for jobs and higher studies."
        },
        {
            question: "How can I join BSPI Robotics Club?",
            answer:
                "You can apply through our membership form or contact any executive member of the club."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        <span className="text-gray-900 dark:text-white">Frequently Asked </span>
                        <span className="text-purple-600">Questions</span>
                    </h2>

                    <p className="text-gray-500 dark:text-gray-300 mt-3">
                        Everything you need to know before joining BSPI Robotics Club
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-5 text-left"
                            >
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {faq.question}
                                </span>

                                <motion.span
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-purple-600" />
                                </motion.span>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;