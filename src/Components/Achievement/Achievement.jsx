import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Trophy, Star, Medal, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const achievements = [
    {
        id: 1,
        title: "Codeforces Pupil",
        name: "Mojahid",
        description: "Reached 1200+ rating in competitive programming",
        icon: <Trophy className="text-yellow-500" />,
    },
    {
        id: 2,
        title: "Hackathon Finalist",
        name: "Team BotForge",
        description: "Selected in top 10 teams in national hackathon",
        icon: <Medal className="text-purple-500" />,
    },
    {
        id: 3,
        title: "Top Contributor",
        name: "Community Members",
        description: "Active contribution in projects and events",
        icon: <Star className="text-indigo-500" />,
    },
];

const Achievement = () => {
    return (
        <div className="pb-16">
            <Helmet>
                <title>BSPI BotForge | Achievement</title>
            </Helmet>

            {/* Header */}
            <div className="max-w-4xl mx-auto pt-20 text-center space-y-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900 dark:text-white">Achievement </span>
                    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                        BSPIRC
                    </span>
                </h2>

                <div className="flex justify-center">
                    <span className="h-1 w-32 md:w-40 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                </div>

                <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm md:text-base">
                    Celebrating the success, dedication, and growth of our community members.
                </p>
            </div>

            {/* 🔢 Stats Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 px-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                    <Users className="mx-auto text-blue-500 mb-2" size={28} />
                    <h3 className="text-2xl font-bold">150+</h3>
                    <p className="text-sm text-gray-500">Active Members</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                    <Trophy className="mx-auto text-yellow-500 mb-2" size={28} />
                    <h3 className="text-2xl font-bold">25+</h3>
                    <p className="text-sm text-gray-500">Achievements</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                    <Medal className="mx-auto text-purple-500 mb-2" size={28} />
                    <h3 className="text-2xl font-bold">10+</h3>
                    <p className="text-sm text-gray-500">Hackathons</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
                    <Star className="mx-auto text-indigo-500 mb-2" size={28} />
                    <h3 className="text-2xl font-bold">50+</h3>
                    <p className="text-sm text-gray-500">Projects</p>
                </div>
            </div>

            {/* 🏆 Achievement Cards */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
                {achievements.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {item.icon}
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">
                            <strong>{item.name}</strong>
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* 🚀 Call To Action */}
            <div className="text-center mt-16">
                <h3 className="text-xl font-semibold mb-2">
                    Want to be featured here? 🚀
                </h3>
                <p className="text-gray-500 mb-4">
                    Participate in events, build projects, and grow with BSPIRC.
                </p>

                <Link to="https://www.facebook.com/bspirc">
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow hover:scale-105 transition">
                        Join our Community
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Achievement;