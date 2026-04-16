    import { Link } from "react-router-dom"; 
    import { useEffect, useState } from "react";
    import { Sun, Moon } from "lucide-react";
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import logo from "../../assets/image/Logo.jpg";
    import { logoutUser } from "../firebase/firebase.config";
    import { useAuth } from "../context/AuthContext";

    import { toast } from 'react-hot-toast';
    import { LogOut, User, Settings } from 'lucide-react';

    const NavBar = () => {
    // const [theme, setTheme] = useState("light");
    const navigate = useNavigate();

    // Apply theme to <html> so Tailwind dark classes work
    // useEffect(() => {
    //     if (theme === "dark") {
    //     document.documentElement.classList.add("dark");
    //     } else {
    //     document.documentElement.classList.remove("dark");
    //     }
    // }, [theme]);

    // const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const NavOptions = (
        <>
        <li>
            <Link
            to="/"
            className="hover:text-purple-400 transition-colors duration-200"
            >
            Home
            </Link>
        </li>
        <li>
            <Link
            to="/activities"
            className="hover:text-purple-400 transition-colors duration-200"
            >
            Activities
            </Link>
        </li>
        <li>
            <Link
            to="/executive"
            className="hover:text-purple-400 transition-colors duration-200"
            >
            Executive
            </Link>
        </li>
        <li>
            <Link
            to="/contact"
            className="hover:text-purple-400 transition-colors duration-200"
            >
            Contact
            </Link>
        </li>
        <li>
            <Link
            to="/members"
            className="hover:text-purple-400 transition-colors duration-200"
            >
            All Member
            </Link>
        </li>
        {/* <li>
            <Link
            to="/dashboard"
            className="hover:text-purple-400 transition-colors duration-200"
            >
            Dashboard
            </Link>
        </li> */}
        </>
    );

    const { user, isAuthenticated } = useAuth(); 

    const handleLogout = async () => {
        const { success, error } = await logoutUser();
        if (success) {
            toast.success('Logged out successfully!');
            navigate('/');
        } else {
            toast.error(error);
        }
    };

    return (
        <>
            <nav>
                <div className="navbar fixed z-10 bg-black bg-opacity-50 text-gray-100  w-full">
            <div className="navbar-start">
            <div className="dropdown">
                <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden text-gray-200"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
                </div>
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-900 text-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                {NavOptions}
                </ul>
            </div>

            {/* Left - Logo with Image */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
                {/* <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-400">
                <img
                    src={logo}
                    alt="BSPI BotForge"
                    className="w-full h-full object-cover"
                />
                </div> */}

                <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="flex items-center gap-3 group cursor-pointer relative"
    onClick={() => navigate('/')}
>
    {/* Animated border box */}
    <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
        className="relative"
    >
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            <span className="text-purple-500 font-black text-xl sm:text-2xl">
                <img src={logo} alt="Logo" />
            </span>
        </div>
    </motion.div>

    {/* Neon text with flicker effect */}
    <div className="relative">
        <span className="text-white font-black text-lg sm:text-xl lg:text-2xl tracking-wider relative">
            <span className="absolute inset-0 text-purple-500 blur-sm animate-pulse">BSPI BotForge</span>
            <span className="relative bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                BSPI BotForge
            </span>
        </span>
        {/* Underline animation */}
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-1"
        />
    </div>

    {/* Hover glow effect */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300 -z-10"></div>
                </motion.div>
                
            </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-bold">{NavOptions}</ul>
            </div>

            <div className="navbar-end flex items-center space-x-3">
            {/* Login Button */}
            <button>

            </button>

            <div className="relative group">
            <button className="btn btn-accent rounded-lg font-bold text-white hover:bg-purple-600 inline-flex items-center gap-2">
                Contribute
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
    
     
            <div className="absolute right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <Link 
                        to="/contribute/admin" 
                        className="flex items-center justify-between px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-150"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">👑</span>
                            <div>
                                <div className="font-semibold text-gray-700 dark:text-gray-200">As an Admin</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Full dashboard access</div>
                            </div>
                        </div>
                        <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/50 px-2 py-1 rounded">Admin</span>
                    </Link>
                    
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    
                    <Link 
                        to="/contribute/member" 
                        className="flex items-center justify-between px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-150"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">👤</span>
                            <div>
                                <div className="font-semibold text-gray-700 dark:text-gray-200">As a Member</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Submit your identity</div>
                            </div>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 px-2 py-1 rounded">Member</span>
                    </Link>
                </div>
            </div>
</div>
            </div>
                </div>
                {/*  */}
                    <div className="navbar-end flex items-center space-x-3">
                    {isAuthenticated ? (
                        <>
                            {/* User Photo */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img 
                                            src={user?.photoURL || 'https://via.placeholder.com/40'} 
                                            alt={user?.displayName || 'User'} 
                                        />
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li className="menu-title">
                                        <span>{user?.displayName || user?.email}</span>
                                    </li>
                                    <li><Link to="/profile"><User className="w-4 h-4" /> Profile</Link></li>
                                    <li><button onClick={handleLogout}><LogOut className="w-4 h-4" /> Logout</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
    };

    export default NavBar;
