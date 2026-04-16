import React, { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar, 
    Edit2, 
    Save, 
    X,
    Camera,
    CheckCircle,
    Award,
    BookOpen,
    Briefcase,
    Heart,
    LogOut
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../firebase/firebase.config';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        displayName: '',
        email: '',
        phone: '',
        bio: '',
        location: '',
        occupation: '',
        skills: '',
        joinDate: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Load user data
        if (user) {
            setProfileData({
                displayName: user.displayName || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                bio: user.bio || 'BSPI Robotics Club Member',
                location: user.location || 'Rangamati, Bangladesh',
                occupation: user.occupation || 'Student',
                skills: user.skills || 'Robotics, Programming',
                joinDate: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '2024'
            });
        }
    }, [user, isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Here you can update user profile in your backend
            // For now, just show success message
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const { success, error } = await logoutUser();
        if (success) {
            toast.success('Logged out successfully!');
            navigate('/');
        } else {
            toast.error(error);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Manage your personal information
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Cover Photo */}
                    <div className="relative h-32 md:h-48 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* Profile Image */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
                            <div className="relative">
                                <img
                                    src={user?.photoURL || `https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${profileData.displayName || 'User'}`}
                                    alt={profileData.displayName}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl"
                                />
                                <button className="absolute bottom-2 right-2 bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition">
                                    <Camera className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 pb-8 px-6 md:px-8">
                        {/* Header with Edit Button */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {profileData.displayName || 'User Name'}
                                </h2>
                                <p className="text-purple-600 dark:text-purple-400 mt-1">
                                    Member since {profileData.joinDate}
                                </p>
                            </div>
                            
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"
                                    >
                                        {loading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Profile Stats */}
                        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                                <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-gray-900 dark:text-white">5+</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                                <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-gray-900 dark:text-white">10+</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Workshops</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                                <Briefcase className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-gray-900 dark:text-white">3+</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Competitions</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                                <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-gray-900 dark:text-white">150+</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Connections</div>
                            </div>
                        </div> */}

                        {/* Profile Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Display Name */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={profileData.displayName}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1">
                                        <User className="w-4 h-4 text-purple-500" />
                                        <p className="text-gray-900 dark:text-white">{profileData.displayName || 'Not set'}</p>
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail className="w-4 h-4 text-purple-500" />
                                        <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                                    </div>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Phone className="w-4 h-4 text-purple-500" />
                                        <p className="text-gray-900 dark:text-white">{profileData.phone || 'Not set'}</p>
                                    </div>
                                )}
                            </div>

                            {/* Location */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Location
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1">
                                        <MapPin className="w-4 h-4 text-purple-500" />
                                        <p className="text-gray-900 dark:text-white">{profileData.location}</p>
                                    </div>
                                )}
                            </div>

                            {/* Occupation */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Occupation
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={profileData.occupation}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Briefcase className="w-4 h-4 text-purple-500" />
                                        <p className="text-gray-900 dark:text-white">{profileData.occupation}</p>
                                    </div>
                                )}
                            </div>

                            {/* Join Date */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Member Since
                                </label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4 text-purple-500" />
                                    <p className="text-gray-900 dark:text-white">{profileData.joinDate}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Bio
                                </label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white mt-1">{profileData.bio}</p>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                                    Skills
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="skills"
                                        value={profileData.skills}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="React, Node.js, Python, Robotics"
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {profileData.skills.split(',').map((skill, index) => (
                                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all mx-auto"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout from Account
                            </button>
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

export default Profile;