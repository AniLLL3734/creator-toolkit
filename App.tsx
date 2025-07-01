
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { YoutubeThumbnailDownloaderPage } from './pages/YoutubeThumbnailDownloaderPage';

const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">This page is under construction. Check back soon!</p>
        <Link to="/" className="mt-8 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Go to Homepage
        </Link>
    </div>
);

const AdPlaceholder = ({ width, height, label }: { width: number, height: number, label: string }) => (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 mx-auto" style={{ width: `${width}px`, height: `${height}px` }}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
    </div>
);


function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <div className="w-full py-4 border-b border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <AdPlaceholder width={728} height={90} label="728x90 Ad Placeholder" />
        </div>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloaderPage />} />
            <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
            <Route path="/about" element={<PlaceholderPage title="About Us" />} />
            <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
            <Route path="/terms-of-service" element={<PlaceholderPage title="Terms of Service" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
