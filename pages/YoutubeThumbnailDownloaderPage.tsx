
import React, { useState, useCallback } from 'react';
import type { Thumbnail } from '../types';
import { Spinner } from '../components/Spinner';
import { DownloadIcon } from '../components/icons/Icons';

const AdPlaceholder = ({ width, height, label }: { width: number, height: number, label: string }) => (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg" style={{ width: `100%`, maxWidth: `${width}px`, height: `${height}px` }}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
    </div>
);

const extractVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})(?:\S+)?/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const YoutubeThumbnailDownloaderPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchThumbnails = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setThumbnails([]);
        setIsLoading(true);

        const videoId = extractVideoId(url);

        if (!videoId) {
            setError('Invalid YouTube URL. Please check the link and try again.');
            setIsLoading(false);
            return;
        }

        const resolutions: Omit<Thumbnail, 'url'>[] = [
            { resolution: 'Max-Res', dimensions: '1920x1080' },
            { resolution: 'HD', dimensions: '1280x720' },
            { resolution: 'SD', dimensions: '640x480' },
            { resolution: 'High', dimensions: '480x360' },
            { resolution: 'Medium', dimensions: '320x180' },
            { resolution: 'Default', dimensions: '120x90' },
        ];

        const qualityMap: { [key: string]: string } = {
            'Max-Res': 'maxresdefault',
            'HD': 'sddefault',
            'SD': 'hqdefault',
            'High': 'mqdefault',
            'Medium': 'default',
            'Default': 'default', // Actually '1', '2', '3' are variants
        };
        
        const generatedThumbnails: Thumbnail[] = resolutions.map(res => ({
            ...res,
            url: `https://i.ytimg.com/vi/${videoId}/${qualityMap[res.resolution]}.jpg`
        }));
        
        // Simulate a network delay for better UX
        setTimeout(() => {
            setThumbnails(generatedThumbnails);
            setIsLoading(false);
        }, 500);

    }, [url]);

    const handleDownload = async (thumbnail: Thumbnail) => {
        try {
            const response = await fetch(thumbnail.url);
            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = `youtube_${extractVideoId(url)}_${thumbnail.resolution}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(objectUrl);
        } catch (err) {
            console.error("Download failed:", err);
            // Fallback to opening in new tab if programmatic download fails
            window.open(thumbnail.url, '_blank');
        }
    };

    return (
        <div className="py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">YouTube Thumbnail Downloader</h1>
                <p className="mt-3 max-w-xl mx-auto text-md text-gray-600 dark:text-gray-300">
                    Paste a YouTube video link below to download its thumbnail in every available size.
                </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <form onSubmit={handleFetchThumbnails} className="max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste YouTube video link here..."
                                className="flex-grow w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-300 whitespace-nowrap"
                            >
                                {isLoading ? <Spinner className="w-5 h-5" /> : 'Fetch Thumbnails'}
                            </button>
                        </div>
                    </form>
                    
                    {error && (
                        <div className="mt-4 max-w-2xl mx-auto text-center bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    {isLoading && (
                        <div className="flex justify-center items-center mt-12">
                            <Spinner className="w-10 h-10" />
                        </div>
                    )}

                    {thumbnails.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Available Thumbnails</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {thumbnails.map((thumb) => (
                                    <div key={thumb.resolution} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 group">
                                        <img src={thumb.url} alt={`${thumb.resolution} thumbnail`} className="w-full h-auto object-cover aspect-video bg-gray-200 dark:bg-gray-700"/>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{thumb.resolution}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{thumb.dimensions}</p>
                                            <button onClick={() => handleDownload(thumb)} className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                                                <DownloadIcon className="w-5 h-5" />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <aside className="lg:w-1/3 xl:w-1/4 flex-shrink-0 mt-8 lg:mt-0">
                    <div className="sticky top-24 space-y-6 flex flex-col items-center lg:items-start">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advertisement</h3>
                         <AdPlaceholder width={300} height={250} label="300x250 Ad" />
                         <AdPlaceholder width={300} height={250} label="300x250 Ad" />
                    </div>
                </aside>
            </div>
        </div>
    );
};
