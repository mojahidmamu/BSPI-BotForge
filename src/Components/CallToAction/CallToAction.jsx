import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <div>
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
        </div>
    );
};

export default CallToAction;