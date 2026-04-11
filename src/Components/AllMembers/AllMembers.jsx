import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllMembers = () => {
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({ search: '', department: 'all', sortBy: 'newest', cgpaOrder: 'desc' });
    const [loading, setLoading] = useState(true);

    const departments = ['all', 'CST', 'MT', 'ET', 'AT', 'CWT', 'CONT'];

    useEffect(() => {
        fetchMembers();
    }, [filters]);

    const fetchMembers = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.department !== 'all') params.append('department', filters.department);
        if (filters.sortBy === 'cgpa') params.append('sortBy', 'cgpa');
        if (filters.sortBy === 'session') params.append('sortBy', 'session');
        params.append('order', filters.cgpaOrder);
        
        const res = await axios.get(`http://localhost:5000/api/students/approved?${params}`);
        setMembers(res.data.data);
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white mt-12 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">👥 All Members</h2>
                </div>
                
                {/* Search & Filters */}
                <div className="p-6 border-b bg-gray-50">
                    <div className="grid md:grid-cols-4 gap-4">
                        <input type="text" placeholder="🔍 Search by name, skill, department..."
                            value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})}
                            className="p-2 border rounded-lg" />
                        <select value={filters.department} onChange={(e) => setFilters({...filters, department: e.target.value})}
                            className="p-2 border rounded-lg">
                            {departments.map(d => <option key={d} value={d}>{d === 'all' ? 'All Departments' : d}</option>)}
                        </select>
                        <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                            className="p-2 border rounded-lg">
                            <option value="newest">Newest First</option>
                            <option value="cgpa">Sort by CGPA</option>
                            <option value="session">Sort by Session</option>
                        </select>
                        {filters.sortBy === 'cgpa' && (
                            <select value={filters.cgpaOrder} onChange={(e) => setFilters({...filters, cgpaOrder: e.target.value})}
                                className="p-2 border rounded-lg">
                                <option value="desc">Highest CGPA First</option>
                                <option value="asc">Lowest CGPA First</option>
                            </select>
                        )}
                    </div>
                </div>
                
                {/* Members Grid */}
                {loading ? (
                    <div className="p-12 text-center">Loading...</div>
                ) : members.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No members found</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                        {members.map(member => (
                            <div key={member._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                                <div className="flex items-center gap-3">
                                    <img src={member.photo || 'https://via.placeholder.com/50'} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h3 className="font-bold">{member.name}</h3>
                                        <p className="text-sm text-gray-500">{member.roll} | {member.department}</p>
                                    </div>
                                </div>
                                <div className="mt-3 text-sm">
                                    <p>📧 {member.email}</p>
                                    <p>📱 {member.phone}</p>
                                    <p>🎓 CGPA: {member.cgpa} | Session: {member.session}</p>
                                    <p>🔧 Skills: {member.skills}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMembers;