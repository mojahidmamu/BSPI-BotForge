import React, { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', roll: '', registration: '',
        department: '', session: '', cgpa: '', district: '', currentJob: '',
        skills: '', socialLink: '', role: 'student'
    });
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const departments = ['CST', 'MT', 'ET', 'AT', 'CWT', 'CONT'];
    const roles = ['student', 'executive', 'teacher'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        
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
        
        if (formData.roll.length !== 6) {
            setMessage({ type: 'error', text: 'Roll number must be exactly 6 digits!' });
            return;
        }
        
        if (formData.registration.length !== 10) {
            setMessage({ type: 'error', text: 'Registration number must be exactly 10 digits!' });
            return;
        }
        
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
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">📝 Student Membership Application</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Full Name *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="email" name="email" placeholder="Email *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="tel" name="phone" placeholder="Phone *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}
                            className="p-2 border rounded-lg" />
                        <input type="text" name="roll" placeholder="Roll Number (6 digits) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="text" name="registration" placeholder="Registration (10 digits) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <select name="department" required onChange={handleChange} className="p-2 border rounded-lg">
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <input type="text" name="session" placeholder="Session (e.g., 2020-2024) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="number" step="0.01" name="cgpa" placeholder="CGPA *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="text" name="district" placeholder="District *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <input type="text" name="skills" placeholder="Skills (comma separated) *" required onChange={handleChange}
                            className="p-2 border rounded-lg" />
                        <select name="role" onChange={handleChange} className="p-2 border rounded-lg">
                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
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

export default MemberForm;