import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div>
            {/* Right - Newsletter Subscription */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
                        >
                            <h2 className="text-2xl font-bold mb-4">Stay Updated!</h2>
                            <p className="mb-6 opacity-90">Subscribe to our newsletter for latest updates, events, and robotics news.</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs opacity-75 mt-4">No spam, unsubscribe anytime.</p>
                        </motion.div>
        </div>
    );
};

export default Banner;