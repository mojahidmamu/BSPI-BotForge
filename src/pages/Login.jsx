import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { signInWithEmail, signInWithGoogle } from '../firebase/firebase.config';
import { useAuth } from '../Components/context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    // Redirect if already logged in
    if (user) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
        return null;
    }

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const { error } = await signInWithEmail(email, password);
        
        if (error) {
            toast.error(error, {
                duration: 3000,
                position: 'top-center',
            });
        } else {
            toast.success('সফলভাবে লগইন করেছেন!', {
                duration: 2000,
                position: 'top-center',
            });
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const { error } = await signInWithGoogle();
        
        if (error) {
            toast.error(error, {
                duration: 3000,
                position: 'top-center',
            });
        } else {
            toast.success('গুগল অ্যাকাউন্ট দিয়ে লগইন সফল!', {
                duration: 2000,
                position: 'top-center',
            });
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isSignUp ? 'Create Account' : 'Welcome Back!'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {isSignUp 
                                ? 'Sign up to access BSPI Robotics Club' 
                                : 'Login to access BSPI Robotics Club'}
                        </p>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Loading...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <img 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                            Continue with Google
                        </span>
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Don't have an account?{' '}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;