import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Calendar, MapPin, Trophy, BookOpen, Users, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BuildTogether from './BuildTogether';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, [activeTab]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/events?status=${activeTab}`);
            setEvents(res.data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Competition': return <Trophy className="w-4 h-4" />;
            case 'Workshop': return <BookOpen className="w-4 h-4" />;
            case 'Seminar': return <Users className="w-4 h-4" />;
            default: return <Sparkles className="w-4 h-4" />;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 md:px-8">
            <Helmet>
                <title>BSPI BotForge | Events</title>
            </Helmet>

            {/* Header */}
            <div className="max-w-4xl mx-auto pt-16 text-center space-y-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900 dark:text-white">Event </span>
                    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                        BSPIRC
                    </span>
                </h2>
                <div className="flex justify-center">
                    <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse" />
                </div>
                <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm md:text-base">
                    Explore our upcoming and completed events with detailed insights and highlights.
                </p>
            </div>

            {/* Tabs */}
            <div className="max-w-3xl mx-auto flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                        activeTab === 'upcoming'
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                        activeTab === 'completed'
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                    }`}
                >
                    Completed
                </button>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto mb-12">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No {activeTab} events found.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {events.map((event, index) => (
                                <motion.div
                                    key={event._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        {/* Date Badge */}
                                        <div className="inline-block bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg px-3 py-1 text-sm font-bold mb-4">
                                            {event.date}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-3">
                                            <MapPin className="w-4 h-4 text-purple-500" />
                                            {event.venue}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full">
                                                {getTypeIcon(event.type)}
                                                {event.type}
                                            </span>
                                            {event.description && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Bottom glow */}
                                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>


            {/*  */}
            {/* Call to Action Section */}
            <section className="py-16 bg-gray-900 dark:bg-gray-950 ">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your Robotics Journey?
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Join BSPI Robotics Club today and be part of an innovative community!
                    </p>
                    <Link to="/contribute/member">
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105">
                        Apply for Membership
                    </button>
                    </Link>
                </div>
            </section>

             {/* Right - Newsletter Subscription */}
            <BuildTogether></BuildTogether>
        </div>
    );
};

export default Events;