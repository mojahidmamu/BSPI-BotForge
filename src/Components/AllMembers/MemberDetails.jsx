import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/context/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import { toast } from 'react-hot-toast';
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
    Edit2,
    Save,
    X
} from 'lucide-react';

import { 
    FaFacebook, 
    FaLinkedin, 
    FaGithub, 
    FaGlobe, 
    FaTwitter, 
    FaInstagram,
    FaWhatsapp
} from 'react-icons/fa';

const MemberDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    
    // Complete profile edit data
    const [editedData, setEditedData] = useState({
        skills: '',
        currentJob: '',
        bio: '',
        phone: '',
        district: '',
        bloodGroup: '',
        socialLinks: {
            facebook: '',
            linkedin: '',
            github: '',
            portfolio: '',
            twitter: '',
            instagram: ''
        }
    });

    useEffect(() => {
        if (id) {
            fetchMemberDetails();
        } else {
            setError('Invalid member ID');
            setLoading(false);
        }
    }, [id, user]);

    const fetchMemberDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const API_URL = 'http://localhost:5000';
            console.log('Fetching member with ID:', id);
            const response = await axios.get(`${API_URL}/api/students/${id}`);
            
            console.log('API Response:', response.data);
            
            if (response.data.success) {
                const memberData = response.data.data;
                setMember(memberData);
                
                // Initialize edit data with member values
                const socialLinks = memberData.socialLinks || {};
                setEditedData({
                    skills: memberData.skills || '',
                    currentJob: memberData.currentJob || '',
                    bio: memberData.bio || '',
                    phone: memberData.phone || '',
                    district: memberData.district || '',
                    bloodGroup: memberData.bloodGroup || '',
                    socialLinks: {
                        facebook: socialLinks.facebook || '',
                        linkedin: socialLinks.linkedin || '',
                        github: socialLinks.github || '',
                        portfolio: socialLinks.portfolio || '',
                        twitter: socialLinks.twitter || '',
                        instagram: socialLinks.instagram || ''
                    }
                });
                
                // ✅ Check if this is the logged-in user's own profile
                const userEmail = user?.email?.toLowerCase().trim();
                const memberEmail = memberData?.email?.toLowerCase().trim();
                
                console.log('User Email:', userEmail);
                console.log('Member Email:', memberEmail);
                
                if (user && userEmail === memberEmail) {
                    setIsOwnProfile(true);
                    console.log('✅ Own profile - Edit enabled');
                } else {
                    setIsOwnProfile(false);
                    console.log('🔒 View only mode - Cannot edit');
                }
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

    // ✅ Edit handlers - Only for own profile
    const handleEditClick = () => {
        if (!isOwnProfile) {
            toast.error('You can only edit your own profile!');
            return;
        }
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset to original values
        const socialLinks = member?.socialLinks || {};
        setEditedData({
            skills: member?.skills || '',
            currentJob: member?.currentJob || '',
            bio: member?.bio || '',
            phone: member?.phone || '',
            district: member?.district || '',
            bloodGroup: member?.bloodGroup || '',
            socialLinks: {
                facebook: socialLinks.facebook || '',
                linkedin: socialLinks.linkedin || '',
                github: socialLinks.github || '',
                portfolio: socialLinks.portfolio || '',
                twitter: socialLinks.twitter || '',
                instagram: socialLinks.instagram || ''
            }
        });
    };

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setEditedData(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }));
    };

    // ✅ Save profile updates to database
    const handleSaveProfile = async () => {
        if (!isOwnProfile) {
            toast.error('You can only edit your own profile!');
            return;
        }
        
        setSaving(true);
        
        try {
            const API_URL = 'http://localhost:5000';
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Email': user?.email?.toLowerCase().trim()
                }
            };
            
            const updateData = {
                skills: editedData.skills,
                currentJob: editedData.currentJob,
                bio: editedData.bio,
                phone: editedData.phone,
                district: editedData.district,
                bloodGroup: editedData.bloodGroup,
                socialLinks: editedData.socialLinks
            };
            
            const response = await axios.put(
                `${API_URL}/api/students/update-profile/${id}`,
                updateData,
                config
            );
            
            if (response.data.success) {
                setMember(prev => ({
                    ...prev,
                    skills: editedData.skills,
                    currentJob: editedData.currentJob,
                    bio: editedData.bio,
                    phone: editedData.phone,
                    district: editedData.district,
                    bloodGroup: editedData.bloodGroup,
                    socialLinks: editedData.socialLinks
                }));
                setIsEditing(false);
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            if (error.response?.status === 403) {
                toast.error('You are not authorized to edit this profile!');
            } else {
                toast.error(error.response?.data?.error || 'Failed to update profile');
            }
        } finally {
            setSaving(false);
        }
    };

    // Download profile function
    const handleDownloadProfile = async () => {
        try {
            setDownloading(true);
            
            const profileHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>${member.name} - BSPI Robotics Club Profile</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; min-height: 100vh; }
                        .profile-container { max-width: 900px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
                        .profile-img { width: 150px; height: 150px; border-radius: 50%; border: 4px solid white; margin-bottom: 20px; object-fit: cover; }
                        .name { font-size: 32px; margin-bottom: 10px; }
                        .badge { display: inline-block; padding: 5px 15px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 14px; margin: 5px; }
                        .content { padding: 40px; }
                        .section { margin-bottom: 30px; }
                        .section-title { font-size: 24px; color: #667eea; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
                        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                        .info-item { margin-bottom: 15px; }
                        .info-label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
                        .info-value { color: #333; font-size: 16px; }
                        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
                        .skill-tag { background: #f0f0f0; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
                        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
                        @media print { body { background: white; padding: 0; } }
                    </style>
                </head>
                <body>
                    <div class="profile-container">
                        <div class="header">
                            <img src="${member.photo || 'https://via.placeholder.com/150'}" alt="${member.name}" class="profile-img" onerror="this.src='https://via.placeholder.com/150'">
                            <h1 class="name">${member.name}</h1>
                            <div>
                                <span class="badge">${member.department}</span>
                                <span class="badge">${member.role === 'executive' ? 'Executive Member' : member.role === 'teacher' ? 'Teacher' : 'Student'}</span>
                                ${member.status === 'approved' ? '<span class="badge">Active Member</span>' : ''}
                            </div>
                        </div>
                        
                        <div class="content">
                            <div class="section">
                                <h2 class="section-title">Personal Information</h2>
                                <div class="info-grid">
                                    <div class="info-item"><div class="info-label">Full Name</div><div class="info-value">${member.name}</div></div>
                                    <div class="info-item"><div class="info-label">Email Address</div><div class="info-value">${member.email}</div></div>
                                    <div class="info-item"><div class="info-label">Phone Number</div><div class="info-value">${member.phone}</div></div>
                                    <div class="info-item"><div class="info-label">District</div><div class="info-value">${member.district || 'Not specified'}</div></div>
                                    <div class="info-item"><div class="info-label">Blood Group</div><div class="info-value">${member.bloodGroup || 'Not specified'}</div></div>
                                </div>
                            </div>
                            
                            <div class="section">
                                <h2 class="section-title">Academic Information</h2>
                                <div class="info-grid">
                                    <div class="info-item"><div class="info-label">Roll Number</div><div class="info-value">${member.roll}</div></div>
                                    <div class="info-item"><div class="info-label">Registration Number</div><div class="info-value">${member.registration}</div></div>
                                    <div class="info-item"><div class="info-label">Department</div><div class="info-value">${member.department}</div></div>
                                    <div class="info-item"><div class="info-label">Session</div><div class="info-value">${member.session}</div></div>
                                    <div class="info-item"><div class="info-label">CGPA</div><div class="info-value">${member.cgpa}</div></div>
                                </div>
                            </div>
                            
                            <div class="section">
                                <h2 class="section-title">Professional Information</h2>
                                <div class="info-grid">
                                    <div class="info-item"><div class="info-label">Current Job</div><div class="info-value">${member.currentJob || 'Not specified'}</div></div>
                                </div>
                            </div>
                            
                            <div class="section">
                                <h2 class="section-title">Skills & Expertise</h2>
                                <div class="skills">
                                    ${member.skills ? member.skills.split(',').map(skill => `<span class="skill-tag">${skill.trim()}</span>`).join('') : '<p>No skills listed</p>'}
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>BSPI Robotics Club - Official Member Profile</p>
                            <p>Generated on ${new Date().toLocaleDateString()}</p>
                            <p>© ${new Date().getFullYear()} BSPI Robotics Club. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            const blob = new Blob([profileHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${member.name.replace(/\s+/g, '_')}_Profile.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            alert('Profile downloaded successfully!');
        } catch (error) {
            console.error('Error downloading profile:', error);
            alert('Failed to download profile. Please try again.');
        } finally {
            setDownloading(false);
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
                        <button onClick={() => navigate('/members')} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all">Back to Members</button>
                        <button onClick={() => fetchMemberDetails()} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all">Try Again</button>
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
                    <button onClick={() => navigate('/members')} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all">Back to Members</button>
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
                        
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button onClick={handleShare} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"><Share2 className="w-5 h-5 text-white" /></button>
                            <button onClick={handlePrint} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"><Printer className="w-5 h-5 text-white" /></button>
                        </div>

                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
                            <div className="relative">
                                <img src={member.photo || 'https://via.placeholder.com/200?text=No+Image'} alt={member.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 pb-8 px-6 md:px-8">
                        <div className="text-center md:text-left md:flex md:justify-between md:items-start">
                            <div>
                                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{member.name}</h1>
                                    {getStatusBadge(member.status)}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">{member.department}</span>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">{member.role === 'executive' ? 'Executive Member' : member.role === 'teacher' ? 'Teacher' : 'Student'}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                {/* ✅ Edit Button - Only shows for own profile */}
                                {isOwnProfile && !isEditing && (
                                    <button
                                        onClick={handleEditClick}
                                        className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                )}
                                
                                {/* Download Button - Shows for everyone */}
                                <button onClick={handleDownloadProfile} disabled={downloading} className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50">
                                    {downloading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Downloading...</> : <><Download className="w-4 h-4" />Download Profile</>}
                                </button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><User className="w-5 h-5 text-purple-500" />Personal Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3"><User className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Full Name</p><p className="text-gray-800 dark:text-white font-medium">{member.name}</p></div></div>
                                    <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Email Address</p><a href={`mailto:${member.email}`} className="text-gray-800 dark:text-white font-medium hover:text-purple-500 transition-colors break-all">{member.email}</a></div></div>
                                    <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Phone Number</p><p className="text-gray-800 dark:text-white font-medium">{member.phone}</p></div></div>
                                    <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">District</p><p className="text-gray-800 dark:text-white font-medium">{member.district || 'Not specified'}</p></div></div>
                                    <div className="flex items-start gap-3"><Droplet className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Blood Group</p><p className="text-gray-800 dark:text-white font-medium">{member.bloodGroup || 'Not specified'}</p></div></div>
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-purple-500" />Academic Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3"><IdCard className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Roll Number</p><p className="text-gray-800 dark:text-white font-medium">{member.roll}</p></div></div>
                                    <div className="flex items-start gap-3"><IdCard className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Registration Number</p><p className="text-gray-800 dark:text-white font-medium">{member.registration}</p></div></div>
                                    <div className="flex items-start gap-3"><Award className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">CGPA</p><p className="text-gray-800 dark:text-white font-medium">{member.cgpa}</p></div></div>
                                    <div className="flex items-start gap-3"><Calendar className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Session</p><p className="text-gray-800 dark:text-white font-medium">{member.session}</p></div></div>
                                    <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-purple-500 mt-0.5" /><div><p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Department</p><p className="text-gray-800 dark:text-white font-medium">{member.department}</p></div></div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-purple-500" />Professional Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Briefcase className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Current Job/Organization</p>
                                            <p className="text-gray-800 dark:text-white font-medium">{member.currentJob || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    {/* Facebook */}
                                    <div className="flex items-start gap-3">
                                        <FaFacebook className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Facebook</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {member.socialLinks?.facebook ? (
                                                    <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">{member.socialLinks.facebook}</a>
                                                ) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="flex items-start gap-3">
                                        <FaLinkedin className="w-5 h-5 text-blue-700 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">LinkedIn</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {member.socialLinks?.linkedin ? (
                                                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">{member.socialLinks.linkedin}</a>
                                                ) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* GitHub */}
                                    <div className="flex items-start gap-3">
                                        <FaGithub className="w-5 h-5 text-gray-900 dark:text-white mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">GitHub</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {member.socialLinks?.github ? (
                                                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">{member.socialLinks.github}</a>
                                                ) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Portfolio */}
                                    <div className="flex items-start gap-3">
                                        <FaGlobe className="w-5 h-5 text-purple-500 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Portfolio</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {member.socialLinks?.portfolio ? (
                                                    <a href={member.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">{member.socialLinks.portfolio}</a>
                                                ) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Twitter */}
                                    <div className="flex items-start gap-3">
                                        <FaTwitter className="w-5 h-5 text-blue-400 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Twitter/X</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {member.socialLinks?.twitter ? (
                                                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">{member.socialLinks.twitter}</a>
                                                ) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Instagram */}
                                    <div className="flex items-start gap-3">
                                        <FaInstagram className="w-5 h-5 text-pink-600 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Instagram</p>
                                            <p className="text-gray-800 dark:text-white font-medium">
                                                {member.socialLinks?.instagram ? (
                                                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 font-medium hover:underline break-all">{member.socialLinks.instagram}</a>
                                                ) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><Code className="w-5 h-5 text-purple-500" />Skills & Expertise</h2>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills ? member.skills.split(',').map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">{skill.trim()}</span>
                                    )) : <p className="text-gray-500 dark:text-gray-400">No skills listed</p>}
                                </div>
                            </div>
                        </div>

                        {/* Connect Section */}
                        <div className="mt-8 text-center flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => setShowEmailModal(true)} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"><Mail className="w-4 h-4" />Send Email</button>

                            {showEmailModal && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEmailModal(false)}>
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Send Email to {member.name}</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Email Address</label>
                                                <div className="flex gap-2">
                                                    <input type="text" value={member.email} readOnly className="flex-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700" />
                                                    <button onClick={() => { navigator.clipboard.writeText(member.email); alert('Email copied!'); }} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Copy</button>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 pt-4">
                                                <a href={`mailto:${member.email}`} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-center hover:shadow-lg transition-all" onClick={() => setShowEmailModal(false)}>Open Email Client</a>
                                                <button onClick={() => setShowEmailModal(false)} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <button onClick={() => { let phoneNumber = member.phone || ''; phoneNumber = phoneNumber.replace(/\D/g, ''); if (phoneNumber.startsWith('0')) { phoneNumber = '880' + phoneNumber.substring(1); } else if (!phoneNumber.startsWith('880') && phoneNumber.length === 10) { phoneNumber = '880' + phoneNumber; } const message = `Hello ${member.name}, I'm contacting you from BSPI Robotics Club website.`; window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank'); }} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"><FaWhatsapp className="w-4 h-4" />WhatsApp</button>
                        </div>
                    </div>
                </motion.div>

                {/* ✅ Edit Modal - Only for own profile */}
                {isEditing && isOwnProfile && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsEditing(false)}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Your Profile</h3>
                            
                            <div className="space-y-4">
                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        value={editedData.skills}
                                        onChange={(e) => handleInputChange('skills', e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="React, Node.js, Python, Robotics"
                                    />
                                </div>
                                
                                {/* Current Job */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Job/Organization</label>
                                    <input
                                        type="text"
                                        value={editedData.currentJob}
                                        onChange={(e) => handleInputChange('currentJob', e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="Software Engineer at Google"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={editedData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="01XXXXXXXXX"
                                    />
                                </div>

                                {/* District */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District</label>
                                    <input
                                        type="text"
                                        value={editedData.district}
                                        onChange={(e) => handleInputChange('district', e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="Your District"
                                    />
                                </div>

                                {/* Blood Group */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Group</label>
                                    <select
                                        value={editedData.bloodGroup}
                                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                                    <textarea
                                        value={editedData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        rows="3"
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                {/* Social Links Section */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Social Links</h4>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Facebook</label>
                                            <input
                                                type="url"
                                                value={editedData.socialLinks.facebook}
                                                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                                                placeholder="https://facebook.com/username"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">LinkedIn</label>
                                            <input
                                                type="url"
                                                value={editedData.socialLinks.linkedin}
                                                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                                                placeholder="https://linkedin.com/in/username"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">GitHub</label>
                                            <input
                                                type="url"
                                                value={editedData.socialLinks.github}
                                                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                                                placeholder="https://github.com/username"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Portfolio</label>
                                            <input
                                                type="url"
                                                value={editedData.socialLinks.portfolio}
                                                onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                                                placeholder="https://yourportfolio.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Twitter/X</label>
                                            <input
                                                type="url"
                                                value={editedData.socialLinks.twitter}
                                                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                                                placeholder="https://twitter.com/username"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Instagram</label>
                                            <input
                                                type="url"
                                                value={editedData.socialLinks.instagram}
                                                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                                                placeholder="https://instagram.com/username"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={saving}
                                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
                    <Heart className="inline w-3 h-3 text-red-500" /> BSPI Robotics Club Family
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;