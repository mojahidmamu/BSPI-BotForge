import React, { useEffect, useState } from 'react';

const Notices = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('notices')) || [];
        setNotices(data);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">📢 Notices</h1>

            {notices.length === 0 && (
                <p className="text-gray-500">No notices yet...</p>
            )}

            <div className="space-y-4">
                {notices.map((notice) => (
                    <div key={notice.id} className="p-4 border rounded-lg shadow hover:shadow-md transition">
                        <h2 className="text-xl font-semibold">{notice.title}</h2>
                        <p className="text-gray-600">{notice.description}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(notice.date).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notices;