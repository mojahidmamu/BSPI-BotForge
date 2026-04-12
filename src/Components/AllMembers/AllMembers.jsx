import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Users, 
  GraduationCap,
  Calendar,
  Award,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Code,
  Eye
} from 'lucide-react';

const AllMembers = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({ 
        search: '', 
        department: 'all', 
        sortBy: 'newest', 
        cgpaOrder: 'desc' 
    });
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const departments = ['all', 'CST', 'MT', 'ET', 'AT', 'CWT', 'CONT'];

    useEffect(() => {
        fetchMembers();
    }, [filters]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.department !== 'all') params.append('department', filters.department);
            if (filters.sortBy === 'cgpa') params.append('sortBy', 'cgpa');
            if (filters.sortBy === 'session') params.append('sortBy', 'session');
            params.append('order', filters.cgpaOrder);
            
            const res = await axios.get(`http://localhost:5000/api/students/approved?${params}`);
            setMembers(res.data.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (memberId) => {
        navigate(`/member/${memberId}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        },
        hover: {
            y: -8,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-4">
                        <Users className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Our Team Members
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm md:text-base">
                        Meet the talented individuals driving innovation at BSPI Robotics Club
                    </p>
                </motion.div>

                {/* Search & Filters Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
                >
                    <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, roll, or skills..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>
                            
                            {/* Filter Toggle Button for Mobile */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filters</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Filters - Desktop always visible, Mobile toggle */}
                            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:flex-1`}>
                                <select
                                    value={filters.department}
                                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                                    className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {departments.map(d => (
                                        <option key={d} value={d}>
                                            {d === 'all' ? 'All Departments' : d}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                                    className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="cgpa">Sort by CGPA</option>
                                    <option value="session">Sort by Session</option>
                                </select>

                                {filters.sortBy === 'cgpa' && (
                                    <select
                                        value={filters.cgpaOrder}
                                        onChange={(e) => setFilters({...filters, cgpaOrder: e.target.value})}
                                        className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="desc">Highest CGPA First</option>
                                        <option value="asc">Lowest CGPA First</option>
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Count */}
                {!loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 text-gray-600 dark:text-gray-400 text-sm"
                    >
                        Found {members.length} member{members.length !== 1 ? 's' : ''}
                    </motion.div>
                )}

                {/* Members Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Loading members...</p>
                    </div>
                ) : members.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl"
                    >
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No members found</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
                    >
                        <AnimatePresence>
                            {members.map((member) => (
                                <motion.div
                                    key={member._id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    onClick={() => handleCardClick(member._id)}
                                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                >
                                    {/* Image Section */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 pt-6">
                                        <div className="relative w-32 h-32 mx-auto">
                                            <img
                                                src={member.photo || 'https://via.placeholder.com/150?text=No+Image'}
                                                alt={member.name}
                                                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20 transition-all duration-300"></div>
                                        </div>
                                        
                                        {/* View Details Badge */}
                                        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Eye className="w-3 h-3 text-white" />
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 text-center">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {member.name}
                                        </h3>
                                        
                                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-3">
                                            {member.department}
                                        </p>
                                        
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                                                <GraduationCap className="w-4 h-4 text-purple-500" />
                                                <span>Roll: {member.roll}</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                                                <Calendar className="w-4 h-4 text-purple-500" />
                                                <span>Session: {member.session}</span>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AllMembers;