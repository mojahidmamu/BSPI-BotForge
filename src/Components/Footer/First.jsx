    import React from "react";
    import { FaFacebook, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

    const First = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* About */}
            <div>
                <h3 className="text-white font-bold text-lg mb-3">BSPI Robotics Club</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                Innovating robotics education and technology at Bangladesh 
                Sweden Polytechnic Institute, Rangamati.
                </p>
                <p className="text-xl text-gray-300 font-bold leading-relaxed">From: 25-February-2024</p>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-1 text-sm">
                <li><a href="/executive" className="text-gray-400 hover:text-purple-400">About Us</a></li>
                <li><a href="/activities" className="text-gray-400 hover:text-purple-400">Events</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-purple-400">Contact</a></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h3 className="text-white font-bold text-lg mb-3">Contact</h3>
                <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-400" />
                    <span className="text-gray-400">Kaptai, Rangamati, Bangladesh</span>
                </li>
                <li className="flex items-center gap-2">
                    <FaPhone className="text-purple-400" />
                    <a href="tel:+880234461404" className="text-gray-400 hover:text-purple-400">+880 1834-822958</a>
                </li>
                <li className="flex items-center gap-2">
                    <FaEnvelope className="text-purple-400" />
                    <a href="mailto:principal.bspi@yahoo.com" className="text-gray-400 hover:text-purple-400 text-sm break-all">
                   bspiroboticsclub@gmail.com
                    </a>
                </li>
                </ul>
                <div className="flex gap-3 mt-3">
                <a href="https://www.facebook.com/groups/1680854132892299" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-blue-500 transition-colors">
                    <FaFacebook size={20} />
                </a>
                <a href="https://www.linkedin.com/company/bspi-robotics-club/" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700 transition-colors">
                    <FaLinkedin size={20} />
                </a>
                </div>
            </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
            <p>© {currentYear} BSPI Robotics Club. Made with <FaHeart className="inline text-red-500" /> for innovation</p>
            </div>
        </div>
        </footer>
        
    );
    };

    export default First;