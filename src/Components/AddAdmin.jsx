import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Components/context/AuthContext';
import { Plus, Trash2, Mail, Shield, Crown, RefreshCw } from 'lucide-react';

const AddAdmin = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        role: 'admin'
    });
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/admin/admins', {
                headers: { 'X-User-Email': user?.email }
            });
            setAdmins(response.data.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
            toast.error('Failed to fetch admins');
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
            const response = await axios.post('http://localhost:5000/api/admin/admins', 
                formData,
                { headers: { 'X-User-Email': user?.email } }
            );
            
            if (response.data.success) {
                toast.success('Admin added successfully! Email sent to new admin.');
                setShowModal(false);
                setFormData({ email: '', name: '', role: 'admin' });
                fetchAdmins();
            }
        } catch (error) {
            console.error('Error adding admin:', error);
            toast.error(error.response?.data?.error || 'Failed to add admin');
        } finally {
            setAdding(false);
        }
    };

    const handleRemoveAdmin = async (adminId, adminEmail) => {
        if (window.confirm(`Are you sure you want to remove ${adminEmail} as admin?`)) {
            setDeletingId(adminId);
            try {
                await axios.delete(`http://localhost:5000/api/admin/admins/${adminId}`, {
                    headers: { 'X-User-Email': user?.email }
                });
                toast.success('Admin removed successfully');
                fetchAdmins();
            } catch (error) {
                console.error('Error removing admin:', error);
                toast.error(error.response?.data?.error || 'Failed to remove admin');
            } finally {
                setDeletingId(null);
            }
        }
    };

    const getRoleBadge = (role) => {
        if (role === 'super_admin') {
            return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs flex items-center gap-1"><Crown className="w-3 h-3" /> Super Admin</span>;
        }
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">👑 Admin Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Add or remove administrators
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Admin
                    </button>
                    <button
                        onClick={fetchAdmins}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Admins List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                        All Administrators ({admins.length})
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading admins...</p>
                        </div>
                    ) : admins.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No admins found</p>
                            <button onClick={() => setShowModal(true)} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
                                Add First Admin
                            </button>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left">Admin</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Role</th>
                                    <th className="p-3 text-left">Added By</th>
                                    <th className="p-3 text-left">Added On</th>
                                    <th className="p-3 text-left">Last Login</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={`https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${admin.name || admin.email}`} 
                                                    alt={admin.name} 
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-medium">{admin.name || admin.email.split('@')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">{admin.email}</td>
                                        <td className="p-3">{getRoleBadge(admin.role)}</td>
                                        <td className="p-3 text-gray-600">{admin.addedBy || 'System'}</td>
                                        <td className="p-3 text-gray-600">{new Date(admin.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3 text-gray-600">{admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}</td>
                                        <td className="p-3">
                                            {admin.role !== 'super_admin' && (
                                                <button
                                                    onClick={() => handleRemoveAdmin(admin._id, admin.email)}
                                                    disabled={deletingId === admin._id}
                                                    className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    {deletingId === admin._id ? (
                                                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            )}
                                            {admin.role === 'super_admin' && (
                                                <span className="text-xs text-gray-400">Super Admin</span>
                                            )}
                                         </td>
                                     </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add Admin Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Add New Admin</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        
                        <form onSubmit={handleAddAdmin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="admin@example.com"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    New admin will receive an email with access instructions
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Name (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Full name"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={adding}
                                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50"
                                >
                                    {adding ? 'Adding...' : 'Add Admin'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAdmin;