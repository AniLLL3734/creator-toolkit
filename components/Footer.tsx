
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} CreatorKit. All Rights Reserved.</p>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link to="/privacy-policy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
