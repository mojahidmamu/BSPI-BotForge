import { Shield } from 'lucide-react';  
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
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
  Eye,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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
    
    // Email validation modal state
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [selectedMemberName, setSelectedMemberName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [verifying, setVerifying] = useState(false);

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
            toast.error('মেম্বার লোড করতে সমস্যা হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    // Handle card click - open email validation modal
    const handleCardClick = (memberId, memberName) => {
        setSelectedMemberId(memberId);
        setSelectedMemberName(memberName);
        setShowEmailModal(true);
        setEmailInput('');
    };

    // Verify email before accessing details
    const verifyEmailAndProceed = async () => {
        if (!emailInput) {
            toast.error('আপনার ইমেইল এড্রেস দিন', {
                icon: '📧',
                duration: 3000,
            });
            return;
        }

        setVerifying(true);
        
        try {
            // Check if email exists in approved members
            const response = await axios.post('http://localhost:5000/api/students/verify-email', {
                email: emailInput
            });
            
            if (response.data.success) {
                // Email verified - navigate to member details
                toast.success('স্বাগতম! প্রোফাইল দেখতে পারবেন', {
                    icon: '✅',
                    duration: 2000,
                });
                setShowEmailModal(false);
                navigate(`/member/${selectedMemberId}`);
            } else {
                // Email not found - show error with suggestion
                toast.error(
                    (t) => (
                        <div className="flex flex-col gap-2 min-w-[280px]">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="font-bold text-red-700">ইমেইল ভ্যালিড নয়!</span>
                            </div>
                            <div className="text-sm text-red-600">
                                এই ইমেইলটি আমাদের ডাটাবেসে নেই।
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                আপনি কি সদস্য হননি? প্রথমে মেম্বারশিপ অ্যাপ্লাই করুন।
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        navigate('/contribute/member');
                                    }}
                                    className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                                >
                                    অ্যাপ্লাই করুন
                                </button>
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg"
                                >
                                    বন্ধ করুন
                                </button>
                            </div>
                        </div>
                    ),
                    {
                        duration: 8000,
                        position: 'top-center',
                        style: {
                            background: '#fee2e2',
                            border: '1px solid #ef4444',
                            padding: '16px',
                        },
                    }
                );
            }
        } catch (error) {
            console.error('Email verification error:', error);
            toast.error('ভেরিফিকেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setVerifying(false);
        }
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

            <Helmet>
                <title>BSPI BotForge | Member List</title>
            </Helmet>
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
                    <div className="mt-3 text-sm text-gray-500">
                        ⚠️ শুধুমাত্র রেজিস্টার্ড মেম্বাররা প্রোফাইল দেখতে পারবেন
                    </div>
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
                                    onClick={() => handleCardClick(member._id, member.name)}
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

            {/* Email Validation Modal */}
            <AnimatePresence>
                {showEmailModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowEmailModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                        ইমেইল ভেরিফিকেশন প্রয়োজন
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowEmailModal(false)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="space-y-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    <p className="text-sm text-blue-800 dark:text-blue-300">
                                        <strong>{selectedMemberName}</strong> এর প্রোফাইল দেখতে আপনার 
                                        রেজিস্টার্ড ইমেইল এড্রেস দিন।
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        আপনার ইমেইল এড্রেস
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            placeholder="youremail@example.com"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            autoFocus
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') verifyEmailAndProceed();
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        ⚠️ শুধুমাত্র BSPI Robotics Club এর রেজিস্টার্ড মেম্বাররা দেখতে পারবেন
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={verifyEmailAndProceed}
                                        disabled={verifying}
                                        className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {verifying ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                ভেরিফাই করা হচ্ছে...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                ভেরিফাই করুন
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowEmailModal(false)}
                                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                                    >
                                        বন্ধ করুন
                                    </button>
                                </div>

                                {/* Link to Apply */}
                                <div className="text-center pt-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        সদস্য নন?{' '}
                                        <button
                                            onClick={() => {
                                                setShowEmailModal(false);
                                                navigate('/contribute/member');
                                            }}
                                            className="text-purple-600 hover:text-purple-700 font-medium"
                                        >
                                            এখনই মেম্বারশিপ অ্যাপ্লাই করুন →
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllMembers;