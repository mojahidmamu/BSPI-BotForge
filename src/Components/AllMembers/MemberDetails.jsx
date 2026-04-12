import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Droplet,
    Code,
    Award,
    GraduationCap,
    Calendar,
    User,
    IdCard,
    Activity,
    Share2,
    Download,
    Printer,
    Heart,
    AlertCircle,
    Briefcase,
    Link as LinkIcon,
    Clock
} from 'lucide-react';

const MemberDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchMemberDetails();
        } else {
            setError('Invalid member ID');
            setLoading(false);
        }
    }, [id]);

    // FIXED: Removed process.env
    const fetchMemberDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Use direct URL - no process.env in browser
            const API_URL = 'http://localhost:5000';
            
            console.log('Fetching member with ID:', id);
            const response = await axios.get(`${API_URL}/api/students/${id}`);
            
            console.log('API Response:', response.data);
            
            if (response.data.success) {
                setMember(response.data.data);
            } else {
                setError(response.data.error || 'Failed to load member details');
            }
        } catch (error) {
            console.error('Error fetching member details:', error);
            
            if (error.response) {
                if (error.response.status === 404) {
                    setError('Member not found. The profile may have been removed.');
                } else if (error.response.status === 403) {
                    setError('This profile is not publicly available yet.');
                } else {
                    setError(error.response.data?.error || 'Failed to load member details');
                }
            } else if (error.request) {
                setError('Cannot connect to server. Please check if the backend is running on port 5000');
            } else {
                setError('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${member?.name} - BSPI Robotics Club`,
                text: `Check out ${member?.name}'s profile`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'approved':
                return <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">Active Member</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">Pending</span>;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-red-500 text-xl mb-4">{error}</p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/members')}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                            Back to Members
                        </button>
                        <button
                            onClick={() => fetchMemberDetails()}
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <p className="text-gray-500 text-xl mb-4">No member data available</p>
                    <button
                        onClick={() => navigate('/members')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        Back to Members
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/members')}
                    className="mb-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Members</span>
                </motion.button>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Cover Photo / Header */}
                    <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={handleShare}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                            >
                                <Share2 className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={handlePrint}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                            >
                                <Printer className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Profile Image */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
                            <div className="relative">
                                <img
                                    src={member.photo || 'https://via.placeholder.com/200?text=No+Image'}
                                    alt={member.name}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                                    }}
                                />
                                <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-purple-500 transition-all duration-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 pb-8 px-6 md:px-8">
                        <div className="text-center md:text-left md:flex md:justify-between md:items-start">
                            <div>
                                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                        {member.name}
                                    </h1>
                                    {getStatusBadge(member.status)}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                        {member.department}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                        {member.role === 'executive' ? 'Executive Member' : member.role === 'teacher' ? 'Teacher' : 'Student'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Download Button */}
                            <button className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Profile
                            </button>
                        </div>

                        {/* Details Grid */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-purple-500" />
                                    Personal Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Full Name</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Email Address</p>
                                            <a href={`mailto:${member.email}`} className="text-gray-800 dark:text-white font-medium hover:text-purple-500 transition-colors break-all">
                                                {member.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Phone Number</p>
                                            <a href={`tel:${member.phone}`} className="text-gray-800 dark:text-white font-medium hover:text-purple-500 transition-colors">
                                                {member.phone}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">District</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.district || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Droplet className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Blood Group</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.bloodGroup || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-purple-500" />
                                    Academic Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <IdCard className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Roll Number</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.roll}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <IdCard className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Registration Number</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.registration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Award className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">CGPA</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.cgpa}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Session</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.session}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Department</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.department}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-purple-500" />
                                    Professional Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Briefcase className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Current Job/Organization</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.currentJob || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <LinkIcon className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Social/Portfolio Link</p>
                                            {member.socialLink ? (
                                                <a href={member.socialLink} target="_blank" rel="noopener noreferrer" 
                                                   className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">
                                                    {member.socialLink}
                                                </a>
                                            ) : (
                                                <p className="text-gray-800 dark:text-white font-medium">Not specified</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Member Since</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {new Date(member.appliedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Code className="w-5 h-5 text-purple-500" />
                                    Skills & Expertise
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills ? (
                                        member.skills.split(',').map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">No skills listed</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Connect Section */}
                        <div className="mt-8 text-center">
                            <a
                                href={`mailto:${member.email}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
                            >
                                <Mail className="w-4 h-4" />
                                Send Message
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
                    <Heart className="inline w-3 h-3 text-red-500" /> BSPI Robotics Club Family
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;