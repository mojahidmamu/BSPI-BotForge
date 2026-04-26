import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Mail, Lock, Send, ArrowRight } from 'lucide-react';

const AdminSecurity = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: Code
    const [email, setEmail] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();

    const handleSendCode = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:5000/api/admin/send-login-code', { email });
            
            if (response.data.success) {
                toast.success('Security code sent to your email!');
                setStep(2);
                startCountdown();
            } else {
                setError(response.data.error || 'Failed to send code');
            }
        } catch (error) {
            console.error('Send code error:', error);
            setError(error.response?.data?.error || 'Failed to send code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        
        if (securityCode.length !== 6) {
            setError('Please enter a 6-digit security code');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:5000/api/admin/verify-code', { 
                email, 
                code: securityCode 
            });
            
            if (response.data.success) {
                localStorage.setItem('adminAuthenticated', 'true');
                localStorage.setItem('adminAuthTime', Date.now());
                localStorage.setItem('adminEmail', email);
                toast.success('Access granted! Redirecting...');
                navigate('/admin-dashboard');
            } else {
                setError(response.data.error || 'Invalid security code');
                setSecurityCode('');
            }
        } catch (error) {
            console.error('Verify code error:', error);
            setError(error.response?.data?.error || 'Invalid or expired code');
            setSecurityCode('');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (resendDisabled) return;
        
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:5000/api/admin/send-login-code', { email });
            
            if (response.data.success) {
                toast.success('New security code sent!');
                startCountdown();
            } else {
                toast.error(response.data.error || 'Failed to resend code');
            }
        } catch (error) {
            toast.error('Failed to resend code');
        } finally {
            setLoading(false);
        }
    };

    const startCountdown = () => {
        setResendDisabled(true);
        setCountdown(60);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
            <Helmet>
                <title>BSPI BotForge | Admin Security</title>
            </Helmet>
            
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-center">
                        <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                            <span className="text-4xl">👑</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Security Verification</h2>
                        <p className="text-purple-100 mt-2">
                            {step === 1 
                                ? 'Enter your email to receive security code' 
                                : 'Enter the 6-digit code sent to your email'}
                        </p>
                    </div>

                    {/* Step 1: Email Form */}
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Admin Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@bspi.edu.bd"
                                        className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                        autoFocus
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Only registered admin emails will receive the security code
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                    <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Security Code
                                    </>
                                )}
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
                    )}

                    {/* Step 2: Code Verification Form */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="p-6 space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We sent a 6-digit code to
                                </p>
                                <p className="font-semibold text-gray-800 dark:text-white">{email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Security Code
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={securityCode}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            if (value.length <= 6) {
                                                setSecurityCode(value);
                                                setError('');
                                            }
                                        }}
                                        maxLength="6"
                                        placeholder="••••••"
                                        className="w-full pl-10 pr-4 py-3 text-center text-2xl tracking-widest border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                    <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || securityCode.length !== 6}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <ArrowRight className="w-5 h-5" />
                                        Verify & Access
                                    </>
                                )}
                            </button>

                            <div className="text-center space-y-2">
                                <button
                                    type="button"
                                    onClick={handleResendCode}
                                    disabled={resendDisabled}
                                    className="text-sm text-purple-600 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {resendDisabled ? `Resend code in ${countdown}s` : 'Resend Code'}
                                </button>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep(1);
                                            setEmail('');
                                            setError('');
                                        }}
                                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600"
                                    >
                                        ← Use different email
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSecurity;