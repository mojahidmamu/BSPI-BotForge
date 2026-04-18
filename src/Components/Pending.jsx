import React, { useState } from 'react';

const Pending = () => {
    const [pending, setPending] = useState([]);
    return (
        <div>
            
             <h1 className="text-2xl font-bold mb-6">Pending Requests</h1>
             {/* Pending Requests Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <h3 className="font-bold p-4 border-b">Pending Requests ({pending.length})</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Roll</th>
                                <th className="p-3 text-left">Dept</th>
                                <th className="p-3 text-left">CGPA</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pending.map(student => (
                                <tr key={student._id} className="border-t">
                                    <td className="p-3">{student.name}</td>
                                    <td className="p-3">{student.roll}</td>
                                    <td className="p-3">{student.department}</td>
                                    <td className="p-3">{student.cgpa}</td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => handleAction(student._id, 'approve')}
                                            className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                                        <button onClick={() => {
                                            const reason = prompt('Rejection reason:');
                                            if (reason) handleAction(student._id, 'reject', reason);
                                        }} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Pending;