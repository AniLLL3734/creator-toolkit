
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../components/icons/Icons';

const ToolCard = ({ title, description, icon, link }: { title: string; description: string; icon: React.ReactNode; link: string }) => (
    <Link to={link} className="block group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
        </div>
    </Link>
);


export const HomePage: React.FC = () => {
    return (
        <div className="py-12 sm:py-16">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    The Ultimate Free Toolkit for
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500 mt-2">
                    Social Media Creators
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    Fast, free, and easy-to-use tools to help you create amazing content and grow your audience. No strings attached.
                </p>
            </div>

            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                <ToolCard
                    title="YouTube Thumbnail Downloader"
                    description="Download any YouTube video thumbnail in all available resolutions."
                    icon={<LogoIcon className="w-6 h-6" />}
                    link="/tools/youtube-thumbnail-downloader"
                />
                 <div className="flex items-center justify-center text-center p-6 bg-gray-100 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">More Tools Coming Soon!</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We're working hard to bring you more free utilities.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
