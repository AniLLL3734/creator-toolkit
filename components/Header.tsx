
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SunIcon, MoonIcon, LogoIcon } from './icons/Icons';

interface HeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`;

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <LogoIcon className="h-8 w-8 text-blue-600" />
                        <span className="font-bold text-xl text-gray-900 dark:text-white">CreatorKit</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                         <NavLink to="/" className={navLinkClass}>Home</NavLink>
                         <NavLink to="/tools/youtube-thumbnail-downloader" className={navLinkClass}>YouTube Downloader</NavLink>
                         <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
                         <NavLink to="/about" className={navLinkClass}>About</NavLink>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
