import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Search, 
    Download, 
    Eye, 
    Plus,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Banknote,
    RefreshCw,
    X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        totalPending: 0,
        totalCompleted: 0
    });
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        type: 'income',
        category: '',
        amount: '',
        user: {
            name: '',
            email: '',
            roll: ''
        },
        paymentMethod: 'cash',
        description: ''
    });

    // Categories
    const categories = {
        income: ['Membership Fee', 'Workshop Registration', 'Donation', 'Competition Fee', 'Project Funding', 'Other'],
        expense: ['Equipment Purchase', 'Event Cost', 'Travel Allowance', 'Food & Refreshments', 'Printing', 'Other']
    };

    const paymentMethods = [
        { value: 'bkash', label: 'bKash', icon: '📱' },
        { value: 'nagad', label: 'Nagad', icon: '📱' },
        { value: 'rocket', label: 'Rocket', icon: '🚀' },
        { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
        { value: 'cash', label: 'Cash', icon: '💵' }
    ];

    // লোকাল স্টোরেজ থেকে ডাটা লোড করা
    useEffect(() => {
        loadTransactionsFromStorage();
    }, []);

    // লোকাল স্টোরেজে ডাটা সেভ করা
    const saveTransactionsToStorage = (transactionList) => {
        localStorage.setItem('bspi_transactions', JSON.stringify(transactionList));
    };

    // লোকাল স্টোরেজ থেকে ডাটা লোড করা
    const loadTransactionsFromStorage = () => {
        setLoading(true);
        try {
            const storedTransactions = localStorage.getItem('bspi_transactions');
            
            if (storedTransactions && JSON.parse(storedTransactions).length > 0) {
                // লোকাল স্টোরেজে ডাটা থাকলে সেটা ব্যবহার করবে
                const loadedTransactions = JSON.parse(storedTransactions);
                setTransactions(loadedTransactions);
                setTotalTransactions(loadedTransactions.length);
                setTotalPages(Math.ceil(loadedTransactions.length / 10));
            } else {
                // প্রথমবার ডিফল্ট ডাটা সেট করবে
                const defaultTransactions = [
                    {
                        _id: '1',
                        transactionId: 'TRX-2024-001',
                        date: new Date().toISOString().split('T')[0],
                        type: 'income',
                        category: 'Membership Fee',
                        amount: 500,
                        status: 'completed',
                        user: { name: 'Rahim Uddin', email: 'rahim@example.com', roll: 'CST-001' },
                        paymentMethod: 'bKash',
                        description: 'Annual membership fee 2024-25'
                    },
                    {
                        _id: '2',
                        transactionId: 'TRX-2024-002',
                        date: new Date().toISOString().split('T')[0],
                        type: 'income',
                        category: 'Workshop Registration',
                        amount: 300,
                        status: 'completed',
                        user: { name: 'Karim Khan', email: 'karim@example.com', roll: 'CST-002' },
                        paymentMethod: 'Nagad',
                        description: 'Robotics Workshop 2024'
                    },
                    {
                        _id: '3',
                        transactionId: 'TRX-2024-003',
                        date: new Date().toISOString().split('T')[0],
                        type: 'expense',
                        category: 'Equipment Purchase',
                        amount: 2500,
                        status: 'completed',
                        user: { name: 'Admin', email: 'admin@bspi.edu.bd', roll: 'ADMIN' },
                        paymentMethod: 'Bank Transfer',
                        description: 'Arduino kits and sensors'
                    }
                ];
                setTransactions(defaultTransactions);
                setTotalTransactions(defaultTransactions.length);
                saveTransactionsToStorage(defaultTransactions);
            }
        } catch (error) {
            console.error('Error loading transactions:', error);
            toast.error('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        calculateStats();
    }, [transactions]);

    useEffect(() => {
        // ফিল্টার এবং সার্চ করার জন্য
        const filtered = getFilteredTransactions();
        setTotalTransactions(filtered.length);
        setTotalPages(Math.ceil(filtered.length / 10));
    }, [search, typeFilter, statusFilter, transactions]);

    const getFilteredTransactions = () => {
        let filtered = [...transactions];
        if (typeFilter !== 'all') {
            filtered = filtered.filter(t => t.type === typeFilter);
        }
        if (statusFilter !== 'all') {
            filtered = filtered.filter(t => t.status === statusFilter);
        }
        if (search) {
            filtered = filtered.filter(t => 
                t.transactionId.toLowerCase().includes(search.toLowerCase()) ||
                t.user.name.toLowerCase().includes(search.toLowerCase()) ||
                t.user.email.toLowerCase().includes(search.toLowerCase())
            );
        }
        return filtered;
    };

    const getPaginatedTransactions = () => {
        const filtered = getFilteredTransactions();
        const start = (page - 1) * 10;
        const end = start + 10;
        return filtered.slice(start, end);
    };

    const calculateStats = () => {
        const totalIncome = transactions
            .filter(t => t.type === 'income' && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = transactions
            .filter(t => t.type === 'expense' && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalPending = transactions
            .filter(t => t.status === 'pending')
            .reduce((sum, t) => sum + t.amount, 0);
        
        setStats({ totalIncome, totalExpense, totalPending, totalCompleted: totalIncome + totalExpense });
    };

    const handleCreateTransaction = async (e) => {
        e.preventDefault();
        
        if (!newTransaction.category || !newTransaction.amount || !newTransaction.user.name || !newTransaction.user.email) {
            toast.error('Please fill all required fields');
            return;
        }
        
        setCreating(true);
        try {
            const newTrans = {
                _id: Date.now().toString(),
                transactionId: `TRX-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                type: newTransaction.type,
                category: newTransaction.category,
                amount: parseFloat(newTransaction.amount),
                status: 'completed',
                user: newTransaction.user,
                paymentMethod: newTransaction.paymentMethod,
                description: newTransaction.description
            };
            
            const updatedTransactions = [newTrans, ...transactions];
            setTransactions(updatedTransactions);
            saveTransactionsToStorage(updatedTransactions); // লোকাল স্টোরেজে সেভ
            
            toast.success('Transaction created successfully!');
            setShowCreateModal(false);
            setNewTransaction({
                type: 'income',
                category: '',
                amount: '',
                user: { name: '', email: '', roll: '' },
                paymentMethod: 'cash',
                description: ''
            });
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error('Failed to create transaction');
        } finally {
            setCreating(false);
        }
    };

    const exportToCSV = () => {
        const filtered = getFilteredTransactions();
        const headers = ['Transaction ID', 'Date', 'Type', 'Category', 'Amount', 'Status', 'User', 'Email', 'Payment Method', 'Description'];
        const csvData = filtered.map(t => [
            t.transactionId,
            new Date(t.date).toLocaleDateString(),
            t.type,
            t.category,
            t.amount,
            t.status,
            t.user.name,
            t.user.email,
            t.paymentMethod,
            t.description
        ]);
        
        const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Exported successfully!');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeColor = (type) => {
        return type === 'income' ? 'text-green-600' : 'text-red-600';
    };

    const displayedTransactions = getPaginatedTransactions();
    const totalFiltered = getFilteredTransactions().length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">💰 Transactions</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage and track all financial transactions
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Transaction
                    </button>
                    <button
                        onClick={exportToCSV}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Total Income</p><p className="text-2xl font-bold text-green-600">৳{stats.totalIncome}</p></div>
                        <div className="p-3 bg-green-100 rounded-full"><TrendingUp className="w-6 h-6 text-green-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Total Expense</p><p className="text-2xl font-bold text-red-600">৳{stats.totalExpense}</p></div>
                        <div className="p-3 bg-red-100 rounded-full"><TrendingDown className="w-6 h-6 text-red-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Pending Amount</p><p className="text-2xl font-bold text-yellow-600">৳{stats.totalPending}</p></div>
                        <div className="p-3 bg-yellow-100 rounded-full"><DollarSign className="w-6 h-6 text-yellow-600" /></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div><p className="text-sm text-gray-500">Net Balance</p><p className={`text-2xl font-bold ${stats.totalIncome - stats.totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}>৳{stats.totalIncome - stats.totalExpense}</p></div>
                        <div className="p-3 bg-purple-100 rounded-full"><Banknote className="w-6 h-6 text-purple-600" /></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input type="text" placeholder="Search by transaction ID, name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </div>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                        <option value="all">All Types</option><option value="income">Income</option><option value="expense">Expense</option>
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
                        <option value="all">All Status</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="cancelled">Cancelled</option>
                    </select>
                    <button onClick={loadTransactionsFromStorage} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"><RefreshCw className="w-4 h-4" />Refresh</button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-4 border-b dark:border-gray-700"><h3 className="font-bold">All Transactions ({totalFiltered})</h3></div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-12"><div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-500">Loading transactions...</p></div>
                    ) : displayedTransactions.length === 0 ? (
                        <div className="text-center py-12"><p className="text-gray-500">No transactions found</p><button onClick={() => setShowCreateModal(true)} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">Create First Transaction</button></div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr><th className="p-3 text-left">Transaction ID</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">Category</th><th className="p-3 text-left">User</th><th className="p-3 text-left">Amount</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Actions</th></tr>
                            </thead>
                            <tbody>
                                {displayedTransactions.map((transaction) => (
                                    <tr key={transaction._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3 font-mono text-sm">{transaction.transactionId}</td>
                                        <td className="p-3 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td className="p-3"><span className={`font-semibold ${getTypeColor(transaction.type)}`}>{transaction.type === 'income' ? 'Income' : 'Expense'}</span></td>
                                        <td className="p-3 text-sm">{transaction.category}</td>
                                        <td className="p-3"><div><p className="font-medium">{transaction.user.name}</p><p className="text-xs text-gray-500">{transaction.user.roll}</p></div></td>
                                        <td className="p-3"><span className={`font-bold ${getTypeColor(transaction.type)}`}>৳{transaction.amount}</span></td>
                                        <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>{transaction.status}</span></td>
                                        <td className="p-3"><button onClick={() => { setSelectedTransaction(transaction); setShowModal(true); }} className="p-1 text-blue-500 hover:text-blue-700"><Eye className="w-4 h-4" /></button></td>
                                    </tr>
                                ))}
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

            {/* Transaction Details Modal */}
            {showModal && selectedTransaction && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Transaction Details</h3><button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">✕</button></div>
                        <div className="space-y-3">
                            <div className="flex justify-between"><span className="text-gray-500">Transaction ID:</span><span className="font-mono">{selectedTransaction.transactionId}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Date:</span><span>{new Date(selectedTransaction.date).toLocaleDateString()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Type:</span><span className={getTypeColor(selectedTransaction.type)}>{selectedTransaction.type === 'income' ? 'Income' : 'Expense'}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Category:</span><span>{selectedTransaction.category}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className={`font-bold ${getTypeColor(selectedTransaction.type)}`}>৳{selectedTransaction.amount}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedTransaction.status)}`}>{selectedTransaction.status}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Payment Method:</span><span>{selectedTransaction.paymentMethod}</span></div>
                            <div className="border-t pt-3"><p className="text-gray-500 text-sm">User Information:</p><p className="font-medium">{selectedTransaction.user.name}</p><p className="text-sm text-gray-500">{selectedTransaction.user.email}</p><p className="text-sm text-gray-500">Roll: {selectedTransaction.user.roll}</p></div>
                            <div className="border-t pt-3"><p className="text-gray-500 text-sm">Description:</p><p className="text-sm">{selectedTransaction.description}</p></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Transaction Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b"><h2 className="text-2xl font-bold">Create New Transaction</h2><button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button></div>
                        <form onSubmit={handleCreateTransaction} className="p-6 space-y-6">
                            <div><label className="block text-sm font-medium mb-2">Transaction Type *</label><div className="flex gap-4"><button type="button" onClick={() => setNewTransaction(prev => ({ ...prev, type: 'income', category: '' }))} className={`flex-1 py-2 rounded-lg font-semibold transition ${newTransaction.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>💰 Income</button><button type="button" onClick={() => setNewTransaction(prev => ({ ...prev, type: 'expense', category: '' }))} className={`flex-1 py-2 rounded-lg font-semibold transition ${newTransaction.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>💸 Expense</button></div></div>
                            <div><label className="block text-sm font-medium mb-2">Category *</label><select value={newTransaction.category} onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))} required className="w-full px-4 py-2 border rounded-lg"><option value="">Select Category</option>{categories[newTransaction.type].map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                            <div><label className="block text-sm font-medium mb-2">Amount (৳) *</label><input type="number" value={newTransaction.amount} onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))} placeholder="0.00" required className="w-full px-4 py-2 border rounded-lg" /></div>
                            <div className="space-y-4"><h3 className="font-semibold">User Information</h3><div><input type="text" placeholder="User Name *" value={newTransaction.user.name} onChange={(e) => setNewTransaction(prev => ({ ...prev, user: { ...prev.user, name: e.target.value } }))} required className="w-full px-4 py-2 border rounded-lg" /></div><div><input type="email" placeholder="User Email *" value={newTransaction.user.email} onChange={(e) => setNewTransaction(prev => ({ ...prev, user: { ...prev.user, email: e.target.value } }))} required className="w-full px-4 py-2 border rounded-lg" /></div><div><input type="text" placeholder="Roll Number (Optional)" value={newTransaction.user.roll} onChange={(e) => setNewTransaction(prev => ({ ...prev, user: { ...prev.user, roll: e.target.value } }))} className="w-full px-4 py-2 border rounded-lg" /></div></div>
                            <div><label className="block text-sm font-medium mb-2">Payment Method *</label><div className="grid grid-cols-3 gap-2">{paymentMethods.map(method => (<button key={method.value} type="button" onClick={() => setNewTransaction(prev => ({ ...prev, paymentMethod: method.value }))} className={`py-2 rounded-lg font-semibold transition ${newTransaction.paymentMethod === method.value ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}>{method.icon} {method.label}</button>))}</div></div>
                            <div><label className="block text-sm font-medium mb-2">Description (Optional)</label><textarea value={newTransaction.description} onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))} rows="3" placeholder="Enter transaction description..." className="w-full px-4 py-2 border rounded-lg" /></div>
                            <div className="flex gap-3 pt-4"><button type="submit" disabled={creating} className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50">{creating ? 'Creating...' : 'Create Transaction'}</button><button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;