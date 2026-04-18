import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Search, 
    Filter, 
    Eye, 
    RefreshCw,
    Calendar,
    User,
    Shield,
    Activity,
    CheckCircle,
    XCircle,
    AlertCircle,
    Download,
    Trash2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [actionFilter, setActionFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);
    const [selectedLog, setSelectedLog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // ডামি ডাটা (ব্যাকেন্ড তৈরি না হওয়া পর্যন্ত)
    const dummyLogs = [
        {
            _id: '1',
            action: 'USER_LOGIN',
            adminEmail: 'admin@bspi.edu.bd',
            adminName: 'Super Admin',
            targetType: 'USER',
            targetId: 'user_123',
            targetName: 'Rahim Uddin',
            details: { ip: '192.168.1.1', browser: 'Chrome' },
            status: 'success',
            timestamp: new Date('2024-04-18T10:30:00')
        },
        {
            _id: '2',
            action: 'APPROVE_MEMBER',
            adminEmail: 'admin@bspi.edu.bd',
            adminName: 'Super Admin',
            targetType: 'MEMBER',
            targetId: 'member_456',
            targetName: 'Karim Khan',
            details: { memberId: 'member_456', previousStatus: 'pending', newStatus: 'approved' },
            status: 'success',
            timestamp: new Date('2024-04-18T09:15:00')
        },
        {
            _id: '3',
            action: 'REJECT_MEMBER',
            adminEmail: 'moderator@bspi.edu.bd',
            adminName: 'Moderator',
            targetType: 'MEMBER',
            targetId: 'member_789',
            targetName: 'Fatema Begum',
            details: { reason: 'Invalid documents', previousStatus: 'pending', newStatus: 'rejected' },
            status: 'success',
            timestamp: new Date('2024-04-17T14:45:00')
        },
        {
            _id: '4',
            action: 'UPDATE_USER_ROLE',
            adminEmail: 'admin@bspi.edu.bd',
            adminName: 'Super Admin',
            targetType: 'USER',
            targetId: 'user_234',
            targetName: 'Jamal Hossain',
            details: { oldRole: 'user', newRole: 'admin' },
            status: 'success',
            timestamp: new Date('2024-04-17T11:20:00')
        },
        {
            _id: '5',
            action: 'SUSPEND_USER',
            adminEmail: 'admin@bspi.edu.bd',
            adminName: 'Super Admin',
            targetType: 'USER',
            targetId: 'user_345',
            targetName: 'Hasina Begum',
            details: { reason: 'Violation of club rules', duration: '30 days' },
            status: 'success',
            timestamp: new Date('2024-04-16T16:00:00')
        },
        {
            _id: '6',
            action: 'DELETE_TRANSACTION',
            adminEmail: 'moderator@bspi.edu.bd',
            adminName: 'Moderator',
            targetType: 'TRANSACTION',
            targetId: 'trx_567',
            targetName: 'TRX-2024-001',
            details: { amount: 500, type: 'income' },
            status: 'failed',
            timestamp: new Date('2024-04-16T09:30:00')
        },
        {
            _id: '7',
            action: 'ADD_ADMIN',
            adminEmail: 'admin@bspi.edu.bd',
            adminName: 'Super Admin',
            targetType: 'USER',
            targetId: 'user_456',
            targetName: 'New Admin',
            details: { email: 'newadmin@bspi.edu.bd', role: 'admin' },
            status: 'success',
            timestamp: new Date('2024-04-15T13:45:00')
        },
        {
            _id: '8',
            action: 'UPDATE_SETTINGS',
            adminEmail: 'admin@bspi.edu.bd',
            adminName: 'Super Admin',
            targetType: 'SYSTEM',
            targetId: 'settings',
            targetName: 'System Settings',
            details: { setting: 'maintenance_mode', oldValue: 'false', newValue: 'true' },
            status: 'success',
            timestamp: new Date('2024-04-15T08:00:00')
        }
    ];

    // Action icons and colors
    const getActionConfig = (action) => {
        const configs = {
            USER_LOGIN: { icon: <Activity className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700', label: 'User Login' },
            USER_LOGOUT: { icon: <Activity className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700', label: 'User Logout' },
            APPROVE_MEMBER: { icon: <CheckCircle className="w-4 h-4" />, color: 'bg-green-100 text-green-700', label: 'Approve Member' },
            REJECT_MEMBER: { icon: <XCircle className="w-4 h-4" />, color: 'bg-red-100 text-red-700', label: 'Reject Member' },
            UPDATE_USER_ROLE: { icon: <Shield className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700', label: 'Update User Role' },
            SUSPEND_USER: { icon: <AlertCircle className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700', label: 'Suspend User' },
            ACTIVATE_USER: { icon: <CheckCircle className="w-4 h-4" />, color: 'bg-green-100 text-green-700', label: 'Activate User' },
            DELETE_USER: { icon: <Trash2 className="w-4 h-4" />, color: 'bg-red-100 text-red-700', label: 'Delete User' },
            CREATE_TRANSACTION: { icon: <Activity className="w-4 h-4" />, color: 'bg-green-100 text-green-700', label: 'Create Transaction' },
            DELETE_TRANSACTION: { icon: <Trash2 className="w-4 h-4" />, color: 'bg-red-100 text-red-700', label: 'Delete Transaction' },
            ADD_ADMIN: { icon: <Shield className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700', label: 'Add Admin' },
            UPDATE_SETTINGS: { icon: <Activity className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-700', label: 'Update Settings' }
        };
        return configs[action] || { icon: <Activity className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700', label: action };
    };

    useEffect(() => {
        fetchLogs();
    }, [actionFilter, search, page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            // ব্যাকেন্ড API কল (যখন তৈরি হবে)
            // const response = await axios.get('http://localhost:5000/api/admin/audit-logs', {
            //     params: { search, action: actionFilter, page, limit: 20 }
            // });
            // setLogs(response.data.data);
            // setTotalLogs(response.data.total);
            // setTotalPages(response.data.pages);
            
            // ডামি ডাটা (ডেমোর জন্য)
            setTimeout(() => {
                let filtered = [...dummyLogs];
                
                if (actionFilter !== 'all') {
                    filtered = filtered.filter(log => log.action === actionFilter);
                }
                if (search) {
                    filtered = filtered.filter(log => 
                        log.adminName.toLowerCase().includes(search.toLowerCase()) ||
                        log.adminEmail.toLowerCase().includes(search.toLowerCase()) ||
                        log.targetName?.toLowerCase().includes(search.toLowerCase()) ||
                        log.action.toLowerCase().includes(search.toLowerCase())
                    );
                }
                
                setLogs(filtered);
                setTotalLogs(filtered.length);
                setTotalPages(Math.ceil(filtered.length / 20));
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching logs:', error);
            toast.error('Failed to fetch audit logs');
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        const headers = ['Timestamp', 'Admin', 'Action', 'Target Type', 'Target Name', 'Status', 'Details'];
        const csvData = logs.map(log => [
            new Date(log.timestamp).toLocaleString(),
            `${log.adminName} (${log.adminEmail})`,
            getActionConfig(log.action).label,
            log.targetType,
            log.targetName || 'N/A',
            log.status,
            JSON.stringify(log.details)
        ]);
        
        const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Exported successfully!');
    };

    const getStatusBadge = (status) => {
        if (status === 'success') {
            return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Success</span>;
        }
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Failed</span>;
    };

    // Unique actions for filter
    const uniqueActions = [...new Set(dummyLogs.map(log => log.action))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📋 Audit Logs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Track all admin actions and system activities
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={exportToCSV}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button
                        onClick={fetchLogs}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Total Actions</p><p className="text-2xl font-bold text-purple-600">{totalLogs}</p></div>
                        <div className="p-3 bg-purple-100 rounded-full"><Activity className="w-6 h-6 text-purple-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Successful</p><p className="text-2xl font-bold text-green-600">{logs.filter(l => l.status === 'success').length}</p></div>
                        <div className="p-3 bg-green-100 rounded-full"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Failed</p><p className="text-2xl font-bold text-red-600">{logs.filter(l => l.status === 'failed').length}</p></div>
                        <div className="p-3 bg-red-100 rounded-full"><XCircle className="w-6 h-6 text-red-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Unique Admins</p><p className="text-2xl font-bold text-blue-600">{new Set(logs.map(l => l.adminEmail)).size}</p></div>
                        <div className="p-3 bg-blue-100 rounded-full"><User className="w-6 h-6 text-blue-600" /></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by admin name, email or target..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>
                    
                    <select
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value)}
                        className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="all">All Actions</option>
                        {uniqueActions.map(action => (
                            <option key={action} value={action}>{getActionConfig(action).label}</option>
                        ))}
                    </select>
                    
                    <button
                        onClick={fetchLogs}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Audit Logs Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">All Activities ({totalLogs})</h3>
                </div>
                
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading audit logs...</p>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No audit logs found</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left">Timestamp</th>
                                    <th className="p-3 text-left">Admin</th>
                                    <th className="p-3 text-left">Action</th>
                                    <th className="p-3 text-left">Target</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Details</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => {
                                    const actionConfig = getActionConfig(log.action);
                                    return (
                                        <tr key={log._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-3 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 text-gray-400" />
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-medium">{log.adminName}</p>
                                                    <p className="text-xs text-gray-500">{log.adminEmail}</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${actionConfig.color}`}>
                                                    {actionConfig.icon}
                                                    {actionConfig.label}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-medium">{log.targetName || 'N/A'}</p>
                                                    <p className="text-xs text-gray-500">{log.targetType}</p>
                                                </div>
                                            </td>
                                            <td className="p-3">{getStatusBadge(log.status)}</td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => { setSelectedLog(log); setShowModal(true); }}
                                                    className="p-1 text-blue-500 hover:text-blue-700"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => { setSelectedLog(log); setShowModal(true); }}
                                                    className="text-xs text-purple-500 hover:text-purple-700"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 p-4 border-t">
                        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Previous</button>
                        <span className="px-3 py-1">Page {page} of {totalPages}</span>
                        <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
                    </div>
                )}
            </div>

            {/* Log Details Modal */}
            {showModal && selectedLog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Audit Log Details</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div><p className="text-sm text-gray-500">Timestamp</p><p className="font-medium">{new Date(selectedLog.timestamp).toLocaleString()}</p></div>
                                <div><p className="text-sm text-gray-500">Action</p><p className="font-medium">{getActionConfig(selectedLog.action).label}</p></div>
                                <div><p className="text-sm text-gray-500">Admin</p><p className="font-medium">{selectedLog.adminName} ({selectedLog.adminEmail})</p></div>
                                <div><p className="text-sm text-gray-500">Status</p><span className={selectedLog.status === 'success' ? 'text-green-600' : 'text-red-600'}>{selectedLog.status}</span></div>
                                <div><p className="text-sm text-gray-500">Target Type</p><p className="font-medium">{selectedLog.targetType}</p></div>
                                <div><p className="text-sm text-gray-500">Target ID</p><p className="font-mono text-sm">{selectedLog.targetId}</p></div>
                                <div className="col-span-2"><p className="text-sm text-gray-500">Target Name</p><p className="font-medium">{selectedLog.targetName || 'N/A'}</p></div>
                                <div className="col-span-2"><p className="text-sm text-gray-500">Details</p><pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">{JSON.stringify(selectedLog.details, null, 2)}</pre></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditLogs;