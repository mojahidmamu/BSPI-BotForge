import React, { useState } from 'react';
import axios from 'axios';
import { X, DollarSign, User, Mail, Hash, CreditCard, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CreateTransactionModal = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.category || !formData.amount || !formData.user.name || !formData.user.email) {
            toast.error('Please fill all required fields');
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:5000/api/admin/transactions', formData);
            
            if (response.data.success) {
                toast.success('Transaction created successfully!');
                onSuccess();
                onClose();
                // Reset form
                setFormData({
                    type: 'income',
                    category: '',
                    amount: '',
                    user: { name: '', email: '', roll: '' },
                    paymentMethod: 'cash',
                    description: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.error || 'Failed to create transaction');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Create New Transaction
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Transaction Type */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Transaction Type *</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
                                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                                    formData.type === 'income'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                            >
                                💰 Income
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
                                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                                    formData.type === 'expense'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                            >
                                💸 Expense
                            </button>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Category</option>
                            {categories[formData.type].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Amount (৳) *</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">User Information</h3>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">User Name *</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    name="user.name"
                                    value={formData.user.name}
                                    onChange={handleChange}
                                    placeholder="Enter user name"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">User Email *</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="email"
                                    name="user.email"
                                    value={formData.user.email}
                                    onChange={handleChange}
                                    placeholder="user@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Roll Number (Optional)</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    name="user.roll"
                                    value={formData.user.roll}
                                    onChange={handleChange}
                                    placeholder="Enter roll number"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Payment Method *</label>
                        <div className="grid grid-cols-3 gap-2">
                            {paymentMethods.map(method => (
                                <button
                                    key={method.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                                    className={`py-2 rounded-lg font-semibold transition ${
                                        formData.paymentMethod === method.value
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">{method.icon}</span>
                                    {method.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter transaction description..."
                                rows="3"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Transaction'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTransactionModal;