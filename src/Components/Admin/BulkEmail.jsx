import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Send, Loader2, Users, Filter } from 'lucide-react';

const BulkEmail = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        recipientType: 'all', // 'all', 'department', 'bloodGroup'
        department: '',
        bloodGroup: '',
    });
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState({ sent: 0, total: 0 });

    const departments = ['CST', 'MT', 'ET', 'AT', 'CWT', 'CONT'];
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject || !formData.message) {
            toast.error('Subject and message are required');
            return;
        }

        setLoading(true);
        setProgress({ sent: 0, total: 0 });

        try {
            const response = await axios.post(
                'http://localhost:5000/api/admin/send-bulk-email',
                formData,
                { headers: { 'X-User-Email': user?.email } }
            );

            if (response.data.success) {
                toast.success(`Email sent to ${response.data.sentCount} recipients`);
                setProgress({ sent: response.data.sentCount, total: response.data.total });
                setFormData(prev => ({ ...prev, subject: '', message: '' }));
            } else {
                toast.error(response.data.error || 'Failed to send emails');
            }
        } catch (error) {
            console.error('Bulk email error:', error);
            toast.error(error.response?.data?.error || 'Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-purple-500" />
                Bulk Email / Newsletter
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">Send to</label>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="recipientType"
                                value="all"
                                checked={formData.recipientType === 'all'}
                                onChange={handleChange}
                                className="accent-purple-500"
                            />
                            All Members
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="recipientType"
                                value="department"
                                checked={formData.recipientType === 'department'}
                                onChange={handleChange}
                                className="accent-purple-500"
                            />
                            By Department
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="recipientType"
                                value="bloodGroup"
                                checked={formData.recipientType === 'bloodGroup'}
                                onChange={handleChange}
                                className="accent-purple-500"
                            />
                            By Blood Group
                        </label>
                    </div>
                </div>

                {/* Department Filter */}
                {formData.recipientType === 'department' && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        >
                            <option value="">Select Department</option>
                            {departments.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Blood Group Filter */}
                {formData.recipientType === 'bloodGroup' && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Newsletter: Monthly Update"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="8"
                        placeholder="Write your message here..."
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 resize-none"
                    />
                </div>

                {/* Progress */}
                {progress.total > 0 && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-sm">
                            Sent {progress.sent} of {progress.total} emails
                        </p>
                        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mt-1">
                            <div
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(progress.sent / progress.total) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Email
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default BulkEmail;