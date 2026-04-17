import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const AdminSecurity = () => {
    const [securityCode, setSecurityCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const ADMIN_SECURITY_CODE = '884913';  // আপনার সিকিউরিটি কোড

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (securityCode.length !== 6) {
            setError('Please enter a 6-digit security code');
            setLoading(false);
            return;
        }

        if (securityCode === ADMIN_SECURITY_CODE) {
            localStorage.setItem('adminAuthenticated', 'true');
            localStorage.setItem('adminAuthTime', Date.now());
            navigate('/admin-dashboard');  // ✅ ড্যাশবোর্ডে নিয়ে যাবে
        } else {
            setError('Invalid security code! Access denied.');
            setSecurityCode('');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
            <Helmet>
                <title>BSPI BotForge | Admin Password</title>
            </Helmet>
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-center">
                        <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                            <span className="text-4xl">👑</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Security Verification</h2>
                        <p className="text-purple-100 mt-2">Please enter the 6-digit security code</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
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
                                className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                placeholder="••••••"
                                autoFocus
                                required
                            />
                            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || securityCode.length !== 6}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify & Access Admin Panel'}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSecurity;