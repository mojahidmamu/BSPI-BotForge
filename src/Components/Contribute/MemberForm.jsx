// components/MemberForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        photo: null,
        roll: '',
        registration: '',
        department: '',
        cgpa: '',
        email: '',
        phone: '',
        district: '',
        currentJob: '',
        skills: '',
        socialLink: '',
        session: '',
        role: 'student'
    });

    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Department options
    const departments = ['CST', 'MT', 'ET', 'AT', 'CWT', 'CONT'];
    // Blood Group: 
    const blood = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    
    // Role options
    // const roles = ['student', 'executive', 'teacher'];

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Roll number validation (only 6 digits)
        if (name === 'roll') {
            const onlyDigits = value.replace(/[^0-9]/g, '');
            if (onlyDigits.length <= 6) {
                setFormData({ ...formData, [name]: onlyDigits });
            }
            return;
        }
        
        // Registration number validation (only 10 digits)
        if (name === 'registration') {
            const onlyDigits = value.replace(/[^0-9]/g, '');
            if (onlyDigits.length <= 10) {
                setFormData({ ...formData, [name]: onlyDigits });
            }
            return;
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Roll number validation
        if (formData.roll.length !== 6) {
            setMessage({ type: 'error', text: 'Roll number must be exactly 6 digits!' });
            return;
        }
        
        // Registration number validation
        if (formData.registration.length !== 10) {
            setMessage({ type: 'error', text: 'Registration number must be exactly 10 digits!' });
            return;
        }
        
        if (!agreed) {
            setMessage('Please accept the terms & conditions');
            return;
        }

        setLoading(true);
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'photo' && formData.photo) {
                submitData.append(key, formData.photo);
            } else if (formData[key]) {
                submitData.append(key, formData[key]);
            }
        });

        try {
            const res = await axios.post('/api/members/apply', submitData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ type: 'success', text: 'Application submitted! Wait for admin approval.' });
            setTimeout(() => window.location.href = '/status', 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Submission failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Rules & Commitment Section */}
            <div className="bg-gradient-to-r mt-12 from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-8 border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📜</span>
                    <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">Important Rules & Commitment</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-red-500">⚠️</span>
                            <p><strong>Authentic Information:</strong> All information must be 100% authentic. False information will lead to immediate rejection.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-500">⚠️</span>
                            <p><strong>Unique Registration:</strong> Each student can apply only once with unique Roll & Registration number.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-500">⚠️</span>
                            <p><strong>Photo Requirements:</strong> Recent passport-size photo (max 2MB, JPG/PNG).</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-500">⚠️</span>
                            <p><strong>CGPA Requirement:</strong> Minimum CGPA 2.50 for student membership.</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <p><strong>Code of Conduct:</strong> Follow all organizational rules and maintain discipline.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <p><strong>Active Participation:</strong> Regular attendance in meetings and events is mandatory.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <p><strong>Contribution:</strong> Every member must contribute to at least one committee.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <p><strong>Privacy:</strong> Your data will be kept confidential and used only for official purposes.</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        ⭐ <strong>Note:</strong> If your Roll & Registration already exists in our system, you will be automatically redirected to your existing profile.
                    </p>
                </div>
            </div>

            {/* Application Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">📝 Student Membership Application</h2>
                    <p className="text-purple-100">Please fill all required fields carefully</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <input type="text" name="name" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Profile Photo *</label>
                            <input type="file" name="photo" accept="image/*" required onChange={handleFileChange}
                                className="w-full px-4 py-2 border rounded-lg" />
                            <p className="text-xs text-gray-500 mt-1">Max 10MB, JPG/PNG only</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Roll Number *</label>
                            <input 
                                type="text" 
                                name="roll" 
                                required 
                                onChange={handleChange}
                                pattern="[0-9]{6}"
                                maxLength="6"
                                minLength="6"
                                title="Roll number must be exactly 6 digits"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 123456" 
                            />
                            <p className="text-xs text-gray-500 mt-1">🔢 6 digit number only (e.g., 123456)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Registration Number *</label>
                            <input 
                                type="text" 
                                name="registration" 
                                required 
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                maxLength="10"
                                minLength="10"
                                title="Registration number must be exactly 10 digits"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 2020123456" 
                            />
                            <p className="text-xs text-gray-500 mt-1">🔢 10 digit number only (e.g., 2020123456)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Department *</label>
                            <select name="department" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="">Select Department</option>
                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">CGPA *</label>
                            <input type="number" step="0.01" name="cgpa" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Last Semester or Final CGPA" min="0" max="4" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Gmail *</label>
                            <input type="email" name="email" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="example@gmail.com" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <input type="tel" name="phone" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="01XXX XXXXXX" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">District *</label>
                            <input type="text" name="district" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Your District" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Session *</label>
                            <input type="text" name="session" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 2020-2021" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Blood Group</label>
                            <select name="department" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="">Select Blood Group</option>
                                {blood.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Skills / Expertise *</label>
                            <input type="text" name="skills" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="React, Node.js, Python, etc." />
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">LinkedIn / Facebook Profile</label>
                            <input type="url" name="socialLink" onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="https://linkedin.com/in/username" />
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Role *</label>
                            <select name="role" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="student">Student</option>
                                <option value="executive">Executive</option> 
                            </select>
                        </div> */}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="border-t pt-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 w-5 h-5 text-purple-600 rounded" />
                            <div>
                                <span className="font-semibold">I confirm that all information provided is true and accurate.</span>
                                <p className="text-sm text-gray-500">I have read and agreed to all the rules, regulations, and commitments mentioned above.</p>
                            </div>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50">
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>

                    {message && (
                        <div className={`p-3 rounded-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default MemberForm;