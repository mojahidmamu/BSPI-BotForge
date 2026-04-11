import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSecurity = () => {
    const [securityCode, setSecurityCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // সিকিউরিটি কোড (ম্যানুয়ালি সেট করা)
    const ADMIN_SECURITY_CODE = '884913'; // 6-digit code

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // চেক করুন কোড 6 ডিজিটের কিনা
        if (securityCode.length !== 6) {
            setError('Please enter a 6-digit security code');
            setLoading(false);
            return;
        }

        // কোড ম্যাচ চেক
        if (securityCode === ADMIN_SECURITY_CODE) {
            // সঠিক কোড - অ্যাডমিন প্যানেলে যান
            localStorage.setItem('adminAuthenticated', 'true');
            localStorage.setItem('adminAuthTime', Date.now());
            navigate('/admin-dashboard');
        } else {
            // ভুল কোড
            setError('Invalid security code! Access denied.');
            setSecurityCode('');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Security Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-center">
                        <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                            <span className="text-4xl">👑</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Security Verification</h2>
                        <p className="text-purple-100 mt-2">Please enter the 6-digit security code</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Security Code Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Security Code
                            </label>
                            <input
                                type="password"
                                value={securityCode}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    if (value.length <= 6) {
                                        setSecurityCode(value);
                                        setError('');
                                    }
                                }}
                                maxLength="6"
                                pattern="[0-9]{6}"
                                className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                placeholder="••••••"
                                autoFocus
                                required
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                Enter 6-digit security code
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <p className="text-red-600 dark:text-red-400 text-sm text-center">
                                    ❌ {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || securityCode.length !== 6}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify & Access Admin Panel'
                            )}
                        </button>

                        {/* Back Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            🔒 This area is restricted to authorized personnel only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSecurity;