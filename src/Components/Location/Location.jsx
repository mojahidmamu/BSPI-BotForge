import React from "react";
import { MapPin } from "lucide-react";

const Location = () => {
    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">

                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        <span className="text-gray-900 dark:text-white">Our </span>
                        <span className="text-purple-600">Location</span>
                    </h2>

                    <p className="text-gray-500 dark:text-gray-300 mt-2">
                        Visit BSPI Robotics Club and explore our innovation hub
                    </p>
                </div>

                {/* Map + Info */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* Map */}
                    <div className="w-full h-[380px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        <iframe
                            src="https://www.google.com/maps?q=Bangladesh+Sweden+Polytechnic+Institute&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="BSPI Location"
                        ></iframe>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <MapPin className="text-purple-600" />
                            Bangladesh Sweden Polytechnic Institute
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            BSPI, Rangamati, Bangladesh
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Our Robotics Club is located inside Bangladesh Sweden Polytechnic Institute campus.
                            Students can easily visit, join workshops, and participate in hands-on robotics activities.
                        </p>

                        {/* Button */}
                        <a
                            href="https://www.google.com/maps/place/Bangladesh+Sweden+Polytechnic+Institute/@22.5051673,92.2096436,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;