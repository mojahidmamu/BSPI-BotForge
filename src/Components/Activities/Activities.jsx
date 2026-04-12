import React from 'react';

const Activities = () => {
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
        </div>
    );
};

export default Activities;