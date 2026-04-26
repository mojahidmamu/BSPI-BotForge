import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import AdminNoticeList from './AdminNoticeList';

const CreateNotice = () => {
    const [form, setForm] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNotice = {
            id: Date.now(),
            title: form.title,
            description: form.description,
            date: new Date().toISOString(),
        };

        // 🔥 Get old notices
        const oldNotices = JSON.parse(localStorage.getItem('notices')) || [];

        // 🔥 Add new notice (latest first)
        const updatedNotices = [newNotice, ...oldNotices];

        // 🔥 Save to localStorage
        localStorage.setItem('notices', JSON.stringify(updatedNotices));

        toast.success("✅ Notice created!");

        setForm({ title: '', description: '' });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">📢 Create Notice</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Notice Title"
                    className="w-full p-3 border rounded-lg"
                    required
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Notice Description"
                    className="w-full p-3 border rounded-lg"
                    rows="4"
                    required
                />

                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    Create Notice
                </button>
            </form>


            <AdminNoticeList></AdminNoticeList>
        </div>
    );
};

export default CreateNotice;