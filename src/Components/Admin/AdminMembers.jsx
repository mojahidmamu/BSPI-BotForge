import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Components/context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
    Search, 
    RefreshCw, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    Eye,
    Filter,
    ChevronLeft,
    ChevronRight,
    Users,
    UserCheck,
    UserX,
    Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminMembers = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalMembers, setTotalMembers] = useState(0);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchMembers();
        fetchDepartments();
    }, [search, statusFilter, departmentFilter, page]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                search,
                status: statusFilter,
                department: departmentFilter,
                page,
                limit: 10
            });
            const res = await axios.get(`http://localhost:5000/api/admin/students?${params}`, {
                headers: { 'X-User-Email': user?.email }
            });
            if (res.data.success) {
                setMembers(res.data.data);
                setTotalMembers(res.data.total);
                setTotalPages(res.data.pages);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
            toast.error('Failed to load members');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/departments');
            setDepartments(res.data.data || []);
        } catch {
            setDepartments(['CST', 'MT', 'ET', 'AT', 'CWT', 'CONT']);
        }
    };

    const handleAction = async (id, action) => {
        const confirmMsg = action === 'approve' ? 'Approve this member?' :
                           action === 'reject' ? 'Reject this member?' :
                           'Delete this member?';
        if (!window.confirm(confirmMsg)) return;

        try {
            if (action === 'delete') {
                await axios.delete(`http://localhost:5000/api/admin/students/${id}`, {
                    headers: { 'X-User-Email': user?.email }
                });
                toast.success('Member deleted');
            } else {
                // Approve/Reject via student-action endpoint
                await axios.put('http://localhost:5000/api/admin/student-action', {
                    id,
                    action,
                    rejectionReason: action === 'reject' ? prompt('Rejection reason:') : null
                }, {
                    headers: { 'X-User-Email': user?.email }
                });
                toast.success(`Member ${action}ed`);
            }
            fetchMembers();
        } catch (error) {
            console.error('Action error:', error);
            toast.error('Action failed');
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'approved': return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approved</span>;
            case 'pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
            case 'rejected': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
            default: return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-500" />
                        All Members
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total {totalMembers} members</p>
                </div>
                <button
                    onClick={fetchMembers}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name, roll, or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="all">All Departments</option>
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : members.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No members found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Name</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Roll</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Department</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Session</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Status</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={member.photo || `https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${member.name}`}
                                                alt={member.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="font-medium">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{member.roll}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{member.department}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{member.session}</td>
                                    <td className="p-3">{getStatusBadge(member.status)}</td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            {member.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(member._id, 'approve')}
                                                        className="p-1 text-green-500 hover:text-green-700 transition"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(member._id, 'reject')}
                                                        className="p-1 text-red-500 hover:text-red-700 transition"
                                                        title="Reject"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            <Link to={`/member/${member._id}`} target="_blank">
                                                <button className="p-1 text-blue-500 hover:text-blue-700 transition" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleAction(member._id, 'delete')}
                                                className="p-1 text-gray-500 hover:text-red-700 transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-gray-700 dark:text-gray-300">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminMembers;