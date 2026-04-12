    import { Link } from "react-router-dom";
    import NavLogo from "../../assets/image/logo.png";
    import { useEffect, useState } from "react";
    import { Sun, Moon } from "lucide-react";

    const NavBar = () => {
    const [theme, setTheme] = useState("light");

    // Apply theme to <html> so Tailwind dark classes work
    useEffect(() => {
        if (theme === "dark") {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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

    return (
        <>
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
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-400">
                <img
                    src={NavLogo}
                    alt="BSPI BotForge"
                    className="w-full h-full object-cover"
                />
                </div>

                <span className="text-white uppercase font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight">
                BSPI BotForge
                </span>
            </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-bold">{NavOptions}</ul>
            </div>

            <div className="navbar-end flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="ml-3 relative p-2 rounded-full border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
                <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-400" />
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
        </>
    );
    };

    export default NavBar;
