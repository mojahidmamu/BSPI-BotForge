import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Notices = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('notices')) || [];
        setNotices(data);
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
            <Helmet>
                <title>BSPI BotForge | Notice</title>
            </Helmet>

            {/* 🔥 Header */}
            <div className="text-center mb-10 space-y-3">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900 dark:text-white">📢 Official </span>
                    <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
                        Notices
                    </span>
                </h2>

                {/* animated underline */}
                <div className="flex justify-center">
                    <span className="h-1 w-28 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400 animate-pulse"></span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Stay updated with the latest announcements and updates from BSPIRC.
                </p>
            </div>

            {/* ❌ Empty State */}
            {notices.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
                    <p className="text-gray-500 text-lg">🚫 No notices available</p>
                    <p className="text-sm text-gray-400 mt-2">
                        New notices will appear here when published.
                    </p>
                </div>
            )}

            {/* 📢 Notice Cards */}
            <div className="grid gap-6">
                {notices.map((notice) => (
                    <div
                        key={notice.id}
                        className="relative p-5 rounded-xl border border-gray-200 dark:border-gray-700 
                        bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                        shadow-md hover:shadow-xl transition-all duration-300 
                        hover:-translate-y-1 group"
                    >

                        {/* Left gradient bar */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-indigo-500 to-teal-400 rounded-l-xl"></div>

                        {/* Content */}
                        <div className="ml-3">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white group-hover:text-purple-500 transition">
                                {notice.title}
                            </h2>

                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                {notice.description}
                            </p>

                            {/* Footer */}
                            <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                                <span>
                                    {new Date(notice.date).toLocaleString()}
                                </span>

                                <span className="text-purple-500 font-medium">
                                    BSPIRC
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notices;