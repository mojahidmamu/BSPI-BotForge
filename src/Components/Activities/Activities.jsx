import React from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BuildTogether from './BuildTogether';

const Activities = () => {
    // Upcoming Events
    const events = [
        {
            id: 1,
            title: "National Robotics Competition 2024",
            date: "December 15-17, 2024",
            venue: "BSPI Auditorium",
            type: "Competition"
        },
        {
            id: 2,
            title: "Workshop on Arduino Programming",
            date: "November 25, 2024",
            venue: "Robotics Lab",
            type: "Workshop"
        },
        {
            id: 3,
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
        title: "Line Following Robot Workshop",
        date: "October 10, 2024",
        venue: "Robotics Lab",
        type: "Workshop"
    },
    {
        id: 2,
        title: "Inter Department Robotics Contest",
        date: "September 18-19, 2024",
        venue: "BSPI Auditorium",
        type: "Competition"
    },
    {
        id: 3,
        title: "Intro to Machine Learning Seminar",
        date: "August 28, 2024",
        venue: "Conference Hall",
        type: "Seminar"
    }
];


    return (
        <div>
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
                    Our important event date with details incoming & upcoming & completed
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
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-purple-600" />
                                Upcoming Events
                            </h2>
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 text-center min-w-[80px]">
                                                <div className="text-purple-600 dark:text-purple-400 font-bold">
                                                    {event.date.split(',')[0].split(' ')[0]}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    {event.date.split(',')[0].split(' ')[1]}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                    <MapPin className="w-3 h-3" />
                                                    {event.venue}
                                                </p>
                                                <span className="inline-block mt-2 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full">
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
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
                                <Calendar className="w-6 h-6 text-purple-600" />
                                Completed Events
                            </h2>
                            <div className="space-y-4">
                                {completedEvents.map((event) => (
                                    <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 text-center min-w-[80px]">
                                                <div className="text-purple-600 dark:text-purple-400 font-bold">
                                                    {event.date.split(',')[0].split(' ')[0]}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    {event.date.split(',')[0].split(' ')[1]}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                    <MapPin className="w-3 h-3" />
                                                    {event.venue}
                                                </p>
                                                <span className="inline-block mt-2 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-full">
                                                    {event.type}
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

export default Activities;