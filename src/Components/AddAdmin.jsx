import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    UserPlus, 
    Mail, 
    Shield, 
    Crown, 
    X, 
    CheckCircle,
    AlertCircle,
    Search,
    RefreshCw,
    Trash2,
    Send
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AddAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        role: 'admin',
        permissions: {
            manageUsers: true,
            manageContent: true,
            manageOrders: false,
            manageSystem: false,
            viewAuditLogs: true,
            manageSupport: true
        }
    });

    // লোকাল স্টোরেজ থেকে ডাটা লোড করা
    useEffect(() => {
        loadAdminsFromStorage();
    }, []);

    // লোকাল স্টোরেজে ডাটা সেভ করা
    const saveAdminsToStorage = (adminList) => {
        localStorage.setItem('bspi_admins', JSON.stringify(adminList));
    };

    // লোকাল স্টোরেজ থেকে ডাটা লোড করা
    const loadAdminsFromStorage = () => {
        setLoading(true);
        try {
            const storedAdmins = localStorage.getItem('bspi_admins');
            
            if (storedAdmins) {
                // লোকাল স্টোরেজে ডাটা থাকলে সেটা ব্যবহার করবে
                setAdmins(JSON.parse(storedAdmins));
            } else {
                // প্রথমবার ডিফল্ট ডাটা সেট করবে
                const defaultAdmins = [
                    {
                        _id: '1',
                        name: 'Abdullah All Mojahid',
                        email: 'abdullahallmojahidstudent@gmail.com',
                        role: 'super_admin',
                        permissions: {
                            manageUsers: true,
                            manageContent: true,
                            manageOrders: true,
                            manageSystem: true,
                            viewAuditLogs: true,
                            manageSupport: true
                        },
                        createdAt: new Date().toISOString().split('T')[0],
                        lastLogin: new Date().toISOString().split('T')[0],
                        isActive: true,
                        addedBy: 'System'
                    }
                ];
                setAdmins(defaultAdmins);
                saveAdminsToStorage(defaultAdmins);
            }
        } catch (error) {
            console.error('Error loading admins:', error);
            toast.error('Failed to load admins');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        
        if (!formData.email) {
            toast.error('Please enter an email address');
            return;
        }

        setAdding(true);
        try {
            const newAdmin = {
                _id: Date.now().toString(),
                name: formData.name || formData.email.split('@')[0],
                email: formData.email,
                role: formData.role,
                permissions: formData.permissions,
                createdAt: new Date().toISOString().split('T')[0],
                lastLogin: null,
                isActive: true,
                addedBy: 'Current Admin'
            };
            
            const updatedAdmins = [newAdmin, ...admins];
            setAdmins(updatedAdmins);
            saveAdminsToStorage(updatedAdmins); // লোকাল স্টোরেজে সেভ
            
            toast.success(`Admin added successfully!`);
            
            setFormData({
                email: '',
                name: '',
                role: 'admin',
                permissions: {
                    manageUsers: true,
                    manageContent: true,
                    manageOrders: false,
                    manageSystem: false,
                    viewAuditLogs: true,
                    manageSupport: true
                }
            });
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding admin:', error);
            toast.error('Failed to add admin');
        } finally {
            setAdding(false);
        }
    };

    const handleRemoveAdmin = async (adminId, adminEmail) => {
        if (window.confirm(`Are you sure you want to remove ${adminEmail} as admin?`)) {
            setDeleting(adminId);
            try {
                const updatedAdmins = admins.filter(a => a._id !== adminId);
                setAdmins(updatedAdmins);
                saveAdminsToStorage(updatedAdmins); // লোকাল স্টোরেজ আপডেট
                toast.success('Admin removed successfully');
            } catch (error) {
                console.error('Error removing admin:', error);
                toast.error('Failed to remove admin');
            } finally {
                setDeleting(null);
            }
        }
    };

    const handleResendInvitation = async (adminEmail) => {
        try {
            toast.success(`Invitation resent to ${adminEmail}`);
        } catch (error) {
            console.error('Error resending invitation:', error);
            toast.error('Failed to resend invitation');
        }
    };

    // ফিল্টার করা অ্যাডমিন লিস্ট
    const filteredAdmins = admins.filter(a => 
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
    );

    const getRoleBadge = (role) => {
        if (role === 'super_admin') {
            return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs flex items-center gap-1"><Crown className="w-3 h-3" /> Super Admin</span>;
        }
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>;
    };

    const getPermissionBadge = (hasPermission) => {
        return hasPermission ? 
            <span className="text-green-500"><CheckCircle className="w-3 h-3 inline" /></span> : 
            <span className="text-red-500"><X className="w-3 h-3 inline" /></span>;
    };

    const permissionLabels = {
        manageUsers: 'Manage Users',
        manageContent: 'Manage Content',
        manageOrders: 'Manage Orders',
        manageSystem: 'Manage System',
        viewAuditLogs: 'View Audit Logs',
        manageSupport: 'Manage Support'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">👑 Admin Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Add, remove and manage admin users
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add New Admin
                    </button>
                    <button
                        onClick={loadAdminsFromStorage}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Total Admins</p><p className="text-2xl font-bold text-purple-600">{admins.length}</p></div>
                        <div className="p-3 bg-purple-100 rounded-full"><Shield className="w-6 h-6 text-purple-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Super Admins</p><p className="text-2xl font-bold text-amber-600">{admins.filter(a => a.role === 'super_admin').length}</p></div>
                        <div className="p-3 bg-amber-100 rounded-full"><Crown className="w-6 h-6 text-amber-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Regular Admins</p><p className="text-2xl font-bold text-blue-600">{admins.filter(a => a.role === 'admin').length}</p></div>
                        <div className="p-3 bg-blue-100 rounded-full"><UserPlus className="w-6 h-6 text-blue-600" /></div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
            </div>

            {/* Admins Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">All Administrators ({filteredAdmins.length})</h3>
                </div>
                
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading admins...</p>
                        </div>
                    ) : filteredAdmins.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No admins found</p>
                            <button onClick={() => setShowAddModal(true)} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">Add First Admin</button>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left">Admin</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Role</th>
                                    <th className="p-3 text-left">Permissions</th>
                                    <th className="p-3 text-left">Added On</th>
                                    <th className="p-3 text-left">Last Login</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAdmins.map((admin) => (
                                    <tr key={admin._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img src={`https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${admin.name}`} alt={admin.name} className="w-8 h-8 rounded-full" />
                                                <span className="font-medium">{admin.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-gray-600">{admin.email}</td>
                                        <td className="p-3">{getRoleBadge(admin.role)}</td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {Object.entries(admin.permissions).slice(0, 3).map(([key, value]) => (
                                                    <span key={key} className="text-xs" title={permissionLabels[key]}>
                                                        {getPermissionBadge(value)}
                                                    </span>
                                                ))}
                                                <span className="text-xs text-gray-400 cursor-pointer" title={Object.entries(admin.permissions).filter(([_, v]) => v).map(([k]) => permissionLabels[k]).join(', ')}>
                                                    +{Object.values(admin.permissions).filter(v => v).length}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-gray-600">{admin.createdAt}</td>
                                        <td className="p-3 text-gray-600">{admin.lastLogin || 'Never'}</td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleResendInvitation(admin.email)} className="p-1 text-blue-500 hover:text-blue-700" title="Resend Invitation"><Send className="w-4 h-4" /></button>
                                                {admin.role !== 'super_admin' && (
                                                    <button onClick={() => handleRemoveAdmin(admin._id, admin.email)} disabled={deleting === admin._id} className="p-1 text-red-500 hover:text-red-700" title="Remove Admin">
                                                        {deleting === admin._id ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div> : <Trash2 className="w-4 h-4" />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add Admin Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-2xl font-bold">Add New Admin</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        
                        <form onSubmit={handleAddAdmin} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="admin@example.com" required className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">An invitation email will be sent to this address</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Name (Optional)</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Full name" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Admin Role</label>
                                <select value={formData.role} onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3">Permissions</label>
                                <div className="space-y-2">
                                    {Object.entries(formData.permissions).map(([key, value]) => (
                                        <label key={key} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <span className="text-sm">{permissionLabels[key]}</span>
                                            <input type="checkbox" checked={value} onChange={(e) => setFormData(prev => ({ ...prev, permissions: { ...prev.permissions, [key]: e.target.checked } }))} className="w-4 h-4 rounded" />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={adding} className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50">
                                    {adding ? 'Adding...' : 'Add Admin'}
                                </button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAdmin;