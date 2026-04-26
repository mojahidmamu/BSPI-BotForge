import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const AdminNoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', description: '' });

    // 🔄 Load notices
    const loadNotices = () => {
        const data = JSON.parse(localStorage.getItem('notices')) || [];
        setNotices(data);
    };

    useEffect(() => {
        loadNotices();
    }, []);

    // ❌ Delete Notice
    const handleDelete = (id) => {
        const updated = notices.filter(n => n.id !== id);
        localStorage.setItem('notices', JSON.stringify(updated));
        setNotices(updated);
        toast.success("🗑 Notice deleted!");
    };

    // ✏️ Start Edit
    const handleEdit = (notice) => {
        setEditingId(notice.id);
        setEditForm({
            title: notice.title,
            description: notice.description
        });
    };

    // 💾 Save Edit
    const handleUpdate = () => {
        const updated = notices.map(n =>
            n.id === editingId ? { ...n, ...editForm } : n
        );

        localStorage.setItem('notices', JSON.stringify(updated));
        setNotices(updated);

        setEditingId(null);
        toast.success("✅ Notice updated!");
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow mt-6">
            <h2 className="font-bold mb-3 text-lg">📢 Manage Notices</h2>

            {notices.length === 0 ? (
                <p className="text-sm text-gray-500">No notices yet</p>
            ) : (
                notices.slice(0, 5).map(n => (
                    <div key={n.id} className="border-b py-3 space-y-2">

                        {editingId === n.id ? (
                            <>
                                <input
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="font-semibold">{n.title}</h3>
                                <p className="text-sm text-gray-500">{n.description}</p>

                                <div className="flex gap-2 mt-1">
                                    <button
                                        onClick={() => handleEdit(n)}
                                        className="text-xs px-2 py-1 bg-blue-500 text-white rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(n.id)}
                                        className="text-xs px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminNoticeList;