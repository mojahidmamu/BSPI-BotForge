import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const departments = ['CST', 'MT', 'ET', 'AT', 'CWT', 'CONT'];
    const blood = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', roll: '', registration: '',
        department: '', session: '', cgpa: '', district: '', currentJob: '',
        skills: '', socialLink: '',   bloodGroup: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // bloodGroup এর জন্য আলাদা validation (ঐচ্ছিক)
        if (name === 'bloodGroup') {
            setFormData({ ...formData, [name]: value });
            return;
        }
        
        if (name === 'roll') {
            const onlyDigits = value.replace(/[^0-9]/g, '');
            if (onlyDigits.length <= 6) {
                setFormData({ ...formData, [name]: onlyDigits });
            }
            return;
        }
        
        if (name === 'registration') {
            const onlyDigits = value.replace(/[^0-9]/g, '');
            if (onlyDigits.length <= 10) {
                setFormData({ ...formData, [name]: onlyDigits });
            }
            return;
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Roll validation
        if (formData.roll.length !== 6) {
            setMessage({ type: 'error', text: 'Roll number must be exactly 6 digits!' });
            return;
        }
        
        // Registration validation
        if (formData.registration.length !== 10) {
            setMessage({ type: 'error', text: 'Registration number must be exactly 10 digits!' });
            return;
        }
        
        // Blood group validation (optional)
        const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''];
        if (formData.bloodGroup && !validBloodGroups.includes(formData.bloodGroup)) {
            setMessage({ type: 'error', text: 'Please select a valid blood group!' });
            return;
        }
        
        // if (formData.roll.length !== 6) {
        //     setMessage({ type: 'error', text: 'Roll number must be exactly 6 digits!' });
        //     return;
        // }
        
        // if (formData.registration.length !== 10) {
        //     setMessage({ type: 'error', text: 'Registration number must be exactly 10 digits!' });
        //     return;
        // }
        
        setLoading(true);
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) submitData.append(key, formData[key]);
        });
        if (photo) submitData.append('photo', photo);
        
        try {
            const res = await axios.post('http://localhost:5000/api/students/apply', submitData);
            setMessage({ type: 'success', text: res.data.message });
            setTimeout(() => window.location.href = '/status', 2000);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Submission failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl mt-4 shadow-xl overflow-hidden">
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


                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">📝 Student Membership Application</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <input type="text" name="name" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Profile Photo *</label>
                            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}
                                className="w-full px-4 py-2 border rounded-lg"/>
                            <p className="text-xs text-gray-500 mt-1">Max 2MB, JPG/PNG only</p>
                        </div>
                        {/* <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}
                            className="p-2 border rounded-lg" /> */}
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


                        {/* <input type="email" name="email" placeholder="Email *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />

                        <input type="tel" name="phone" placeholder="Phone *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}
                        
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
                        {/* <input type="text" name="roll" placeholder="Roll Number (6 digits) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}

                        {/* <input type="text" name="registration" placeholder="Registration (10 digits) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}

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
                            <select name="department" required onChange={handleChange}  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        </div>

                        {/* <select name="department" required onChange={handleChange} className="p-2 border rounded-lg">
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select> */}

                        {/* <input type="text" name="session" placeholder="Session (e.g., 2020-2024) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}

                        <div>
                            <label className="block text-sm font-medium mb-2">Session *</label>
                            <input type="text" name="session" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 2020-2021" />
                        </div>

                        {/* <input type="number" step="0.01" name="cgpa" placeholder="CGPA *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}
                        <div>
                            <label className="block text-sm font-medium mb-2">CGPA *</label>
                            <input type="number" step="0.01" name="cgpa" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Last Semester or Final CGPA" min="0" max="4" />
                        </div>

                        {/* <input type="text" name="district" placeholder="District *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}
                        <div>
                            <label className="block text-sm font-medium mb-2">District *</label>
                            <input type="text" name="district" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Your District" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Blood Group</label>
                            <select name="bloodGroup"  onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="">Select Blood Group</option>
                                {blood.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        {/* <input type="text" name="skills" placeholder="Skills    *" required onChange={handleChange}
                            className="p-2 border rounded-lg" /> */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Skills / Expertise *</label>
                            <input type="text" name="skills" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="React, Node.js, Python, etc." />
                        </div>

                        {/* <select name="role" onChange={handleChange} className="p-2 border rounded-lg">
                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                        </select> */}
                    </div>
                    
                    {message && (
                        <div className={`p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700">
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;