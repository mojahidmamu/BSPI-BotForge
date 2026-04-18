import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Search, 
    Shield, 
    User, 
    Crown, 
    Edit2, 
    Save, 
    X, 
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Users,
    Lock,
    Unlock,
    Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Roles = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [editingUser, setEditingUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [updating, setUpdating] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [roleRequests, setRoleRequests] = useState([]);

    // ডামি ইউজার ডাটা
    const dummyUsers = [
        {
            _id: '1',
            name: 'Abdullah All Mojahid',
            email: 'abdullahallmojahidstudent@gmail.com',
            role: 'super_admin',
            isActive: true,
            photoURL: 'https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Abdullah',
            createdAt: '2024-01-15',
            lastLogin: '2024-04-18'
        },
        {
            _id: '2',
            name: 'Ayesha',
            email: 'ayesha@example.com',
            role: 'admin',
            isActive: true,
            photoURL: 'https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Rahim',
            createdAt: '2024-02-20',
            lastLogin: '2024-04-17'
        },
        {
            _id: '3',
            name: 'Sanjida Jannat Saom',
            email: 'saom@example.com',
            role: 'admin',
            isActive: true,
            photoURL: 'https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Karim',
            createdAt: '2024-03-10',
            lastLogin: '2024-04-16'
        },
        {
            _id: '4',
            name: 'Umme Sadia Khairin',
            email: 'uskhairin520@example.com',
            role: 'user',
            isActive: true,
            photoURL: 'https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Fatema',
            createdAt: '2024-03-25',
            lastLogin: '2024-04-15'
        },
        {
            _id: '5',
            name: 'SBS Sahel',
            email: 'sbssahel@example.com',
            role: 'moderator',
            isActive: false,
            photoURL: 'https://ui-avatars.com/api/?background=7c3aed&color=fff&name=Jamal',
            createdAt: '2024-01-05',
            lastLogin: '2024-04-10'
        }
    ];

    // ডামি রোল রিকোয়েস্ট
    const dummyRequests = [
        {
            _id: 'req1',
            userId: 'user3',
            userName: 'Karim Khan',
            userEmail: 'karim@example.com',
            requestedRole: 'admin',
            currentRole: 'user',
            reason: 'I want to help manage the club activities',
            status: 'pending',
            requestedAt: '2024-04-17'
        },
        {
            _id: 'req2',
            userId: 'user4',
            userName: 'Fatema Begum',
            userEmail: 'fatema@example.com',
            requestedRole: 'moderator',
            currentRole: 'user',
            reason: 'I have experience in event management',
            status: 'pending',
            requestedAt: '2024-04-16'
        }
    ];

    useEffect(() => {
        fetchUsers();
        fetchRoleRequests();
    }, [roleFilter, search]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // ব্যাকেন্ড API কল
            // const response = await axios.get('http://localhost:5000/api/admin/users', {
            //     params: { search, role: roleFilter }
            // });
            // setUsers(response.data.data);
            
            // ডামি ডাটা
            setTimeout(() => {
                let filtered = [...dummyUsers];
                if (roleFilter !== 'all') {
                    filtered = filtered.filter(u => u.role === roleFilter);
                }
                if (search) {
                    filtered = filtered.filter(u => 
                        u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
                    );
                }
                setUsers(filtered);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
            setLoading(false);
        }
    };

    const fetchRoleRequests = async () => {
        try {
            // ব্যাকেন্ড API কল
            // const response = await axios.get('http://localhost:5000/api/admin/role-requests');
            // setRoleRequests(response.data.data);
            
            setRoleRequests(dummyRequests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        setUpdating(true);
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`, { role: newRole });
            toast.success(`User role updated to ${newRole}`);
            fetchUsers();
        } catch (error) {
            // ডেমো আপডেট
            setUsers(prev => prev.map(u => 
                u._id === userId ? { ...u, role: newRole } : u
            ));
            toast.success(`Role updated to ${newRole} (Demo mode)`);
        } finally {
            setUpdating(false);
            setEditingUser(null);
        }
    };

    const handleRoleRequest = async (requestId, action) => {
        try {
            // ব্যাকেন্ড API কল
            // await axios.put(`http://localhost:5000/api/admin/role-requests/${requestId}`, { action });
            
            if (action === 'approve') {
                const request = roleRequests.find(r => r._id === requestId);
                if (request) {
                    await updateUserRole(request.userId, request.requestedRole);
                }
            }
            
            setRoleRequests(prev => prev.filter(r => r._id !== requestId));
            toast.success(`Request ${action}d successfully`);
        } catch (error) {
            toast.error(`Failed to ${action} request`);
        }
    };

    const getRoleBadge = (role) => {
        switch(role) {
            case 'super_admin':
                return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs flex items-center gap-1"><Crown className="w-3 h-3" /> Super Admin</span>;
            case 'admin':
                return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>;
            case 'moderator':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center gap-1"><Users className="w-3 h-3" /> Moderator</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1"><User className="w-3 h-3" /> User</span>;
        }
    };

    const roleOptions = [
        { value: 'user', label: 'User', color: 'bg-gray-500' },
        { value: 'moderator', label: 'Moderator', color: 'bg-yellow-500' },
        { value: 'admin', label: 'Admin', color: 'bg-blue-500' },
        { value: 'super_admin', label: 'Super Admin', color: 'bg-purple-500' }
    ];

    const stats = {
        totalUsers: users.length,
        admins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length,
        moderators: users.filter(u => u.role === 'moderator').length,
        users: users.filter(u => u.role === 'user').length,
        pendingRequests: roleRequests.length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">👥 Roles & Permissions</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage user roles and permission requests
                    </p>
                </div>
                <button onClick={fetchUsers} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Total Users</p><p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p></div>
                        <div className="p-3 bg-purple-100 rounded-full"><Users className="w-6 h-6 text-purple-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Admins</p><p className="text-2xl font-bold text-blue-600">{stats.admins}</p></div>
                        <div className="p-3 bg-blue-100 rounded-full"><Shield className="w-6 h-6 text-blue-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Moderators</p><p className="text-2xl font-bold text-yellow-600">{stats.moderators}</p></div>
                        <div className="p-3 bg-yellow-100 rounded-full"><Users className="w-6 h-6 text-yellow-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Regular Users</p><p className="text-2xl font-bold text-gray-600">{stats.users}</p></div>
                        <div className="p-3 bg-gray-100 rounded-full"><User className="w-6 h-6 text-gray-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow cursor-pointer" onClick={() => setShowRequestModal(true)}>
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Pending Requests</p><p className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</p></div>
                        <div className="p-3 bg-orange-100 rounded-full"><Mail className="w-6 h-6 text-orange-600" /></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </div>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                        <option value="all">All Roles</option>
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                    <button onClick={fetchUsers} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">Apply Filters</button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700"><h3 className="font-bold">All Users ({users.length})</h3></div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-12"><div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-500">Loading users...</p></div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-12"><p className="text-gray-500">No users found</p></div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr><th className="p-3 text-left">User</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Current Role</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Joined</th><th className="p-3 text-left">Actions</th></tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3"><div className="flex items-center gap-3"><img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full" /><span className="font-medium">{user.name}</span></div></td>
                                        <td className="p-3 text-gray-600">{user.email}</td>
                                        <td className="p-3">{getRoleBadge(user.role)}</td>
                                        <td className="p-3">{user.isActive ? <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span> : <span className="text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Suspended</span>}</td>
                                        <td className="p-3 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3">
                                            {editingUser === user._id ? (
                                                <div className="flex gap-2">
                                                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="px-2 py-1 border rounded text-sm">
                                                        {roleOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                                    </select>
                                                    <button onClick={() => updateUserRole(user._id, selectedRole)} disabled={updating} className="p-1 text-green-500"><Save className="w-4 h-4" /></button>
                                                    <button onClick={() => setEditingUser(null)} className="p-1 text-red-500"><X className="w-4 h-4" /></button>
                                                </div>
                                            ) : (
                                                <button onClick={() => { setEditingUser(user._id); setSelectedRole(user.role); }} className="p-1 text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Role Requests Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowRequestModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b"><h2 className="text-2xl font-bold">Role Upgrade Requests</h2><button onClick={() => setShowRequestModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div>
                        {roleRequests.length === 0 ? (
                            <div className="p-12 text-center"><p className="text-gray-500">No pending requests</p></div>
                        ) : (
                            <div className="p-6 space-y-4">
                                {roleRequests.map(request => (
                                    <div key={request._id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div><h3 className="font-bold">{request.userName}</h3><p className="text-sm text-gray-500">{request.userEmail}</p></div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleRoleRequest(request._id, 'approve')} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                                                <button onClick={() => handleRoleRequest(request._id, 'reject')} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                                            </div>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm"><span className="text-gray-500">Current Role:</span><span>{getRoleBadge(request.currentRole)}</span><span className="text-gray-500">Requested Role:</span><span>{getRoleBadge(request.requestedRole)}</span><span className="text-gray-500">Reason:</span><span>{request.reason}</span><span className="text-gray-500">Requested:</span><span>{new Date(request.requestedAt).toLocaleDateString()}</span></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roles;