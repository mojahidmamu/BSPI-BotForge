import React from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BuildTogether from './BuildTogether';
import { Helmet } from 'react-helmet-async';

const Events = () => {
    // Upcoming Events
    const events = [
        {
            id: 1,
            title: "Intra Club Competition 2026",
            date: "April 26-30, 2026",
            venue: "Robotics Lab",
            type: "Competition"
        },
        {
            id: 2,
            title: "National Robotics Competition 2024",
            date: "May 15-17, 2024",
            venue: "BSPI Auditorium",
            type: "Competition"
        },
        {
            id: 3,
            title: "Workshop on Arduino Programming",
            date: "Jyly 25, 2024",
            venue: "Robotics Lab",
            type: "Workshop"
        },
        {
            id: 4,
            title: "AI & Robotics Seminar",
            date: "December 5, 2024",
            venue: "Conference Hall",
            type: "Seminar"
        }
    ];

    // Completed Events
    const completedEvents = [
        {
            id: 1,
            title: "Innovation Inventra",
            date: "November 26-29, 2025",
            venue: "BSPI Auditorium",
            type: "Seminer"
        },
        {
            id: 1,
            title: "Line Following Robot Workshop",
            date: "October 10, 2025",
            venue: "Robotics Lab",
            type: "Workshop"
        },
        {
            id: 2,
            title: "Inter Department Robotics Contest",
            date: "September 18-19, 2025",
            venue: "BSPI Auditorium",
            type: "Competition"
        },
        {
            id: 3,
            title: "Intra Club Project Competition",
            date: "April 28, 2025",
            venue:"Robotics Lab",
            type: "Competetion"
        },
        {
            id: 4,
            title: "Grand Opening Ceremony and Freshers Reception",
            date: "February 25, 2025",
            venue: "BSPI Auditorium",
            type: "Seminar"
        }
    ];


    return (
        <div>
            <Helmet>
                        <title>BSPI BotForge | Events</title>
                    </Helmet>
             {/* Header & Title  */}
            <div className="max-w-4xl mx-auto pt-20 text-center space-y-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900 dark:text-white">Event </span>
                    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                        BSPIRC
                    </span>
                </h2>

                {/* Gradient Underline */}
                <div className="flex justify-center ">
                    <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                </div>

                {/* Optional Subtext */}
                <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm md:text-base">
                        Explore our upcoming and completed events with detailed insights and highlights.
                    </p>
            </div>

            {/* Event */}
             {/* Upcoming Events Section */}
            <section className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left - Events */}
                        <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
>
    {/* Title */}
    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-purple-600 animate-pulse" />
        Upcoming Events in 2026
    </h2>

    {/* Cards */}
    <div className="space-y-5">
        {events.map((event, index) => (
            <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group bg-gradient-to-r from-white via-purple-50 to-indigo-50 
                dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 
                border border-purple-100 dark:border-gray-700
                rounded-2xl p-5 shadow-md hover:shadow-xl 
                transition-all duration-300"
            >
                <div className="flex items-start gap-4">

                    {/* Date Box */}
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-500 
                        text-white rounded-xl p-3 text-center min-w-[80px] shadow-md">
                        <div className="font-bold text-lg">
                            {event.date.split(',')[0].split(' ')[0]}
                        </div>
                        <div className="text-xs opacity-90">
                            {event.date.split(',')[0].split(' ')[1]}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-lg group-hover:text-purple-600 transition">
                            {event.title}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            {event.venue}
                        </p>

                        {/* Badge */}
                        <span className="inline-block mt-3 px-3 py-1 
                            bg-purple-100 dark:bg-purple-900/30 
                            text-purple-600 dark:text-purple-400 
                            text-xs rounded-full font-medium tracking-wide">
                            {event.type}
                        </span>
                    </div>
                </div>

                {/* Bottom Glow Line */}
                <div className="h-1 mt-4 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"></div>
            </motion.div>
        ))}
    </div>
</motion.div>

                        {/* Completed Event */}
                        {/* Right - Events */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-green-600" />
                                Completed Events in 2025
                            </h2>

                            <div className="space-y-4">
                                {completedEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-start gap-4">

                                            {/* Date Box */}
                                            <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-3 text-center min-w-[80px]">
                                                <div className="text-green-600 dark:text-green-400 font-bold">
                                                    {event.date.split(',')[0].split(' ')[0]}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    {event.date.split(',')[0].split(' ')[1]}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                    {event.title}
                                                </h3>

                                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                    <MapPin className="w-3 h-3" />
                                                    {event.venue}
                                                </p>

                                                {/* Type Badge */}
                                                <span className="inline-block mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs rounded-full">
                                                    {event.type}
                                                </span>

                                                {/* Completed Badge (Optional 🔥) */}
                                                <span className="ml-2 inline-block mt-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                                    Completed
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        
                    </div>
                </div>
            </section>

           

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