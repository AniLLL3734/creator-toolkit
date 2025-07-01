// App.tsx
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { YoutubeThumbnailDownloaderPage } from './pages/YoutubeThumbnailDownloaderPage';

// --- ABOUT US PAGE COMPONENT ---
// Bu, eski Placeholder yerine, doğrudan buraya yazılmış gerçek Hakkımızda sayfası.
const AboutPage = () => (
    <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white">
                About CreatorKit
            </h1>
            <div className="mt-8 prose prose-lg dark:prose-invert mx-auto text-gray-600 dark:text-gray-300">
                <p>
                    Welcome to CreatorKit!
                </p>
                <p>
                    Our mission is simple: to provide social media creators, digital marketers, and anyone with a creative spark the best free, simple, and powerful online tools. We believe that creating great content shouldn't be complicated or expensive.
                </p>
                <p>
                    In today's fast-paced digital world, having quick access to reliable utilities can make all the difference. Whether you're a YouTuber looking for the perfect thumbnail for inspiration, a designer needing to grab a specific color from an image, or a content manager needing to create a quick GIF, we've got you covered.
                </p>
                <p>
                    CreatorKit was built by a passionate developer who understands the creative workflow and the common bottlenecks that can slow you down. That's why every tool on this site is designed to be intuitive, fast, and straight to the point—no unnecessary features, no confusing interfaces.
                </p>
                <p>
                    We are constantly working to add new tools to our collection to make your creative life even easier. Thank you for being a part of our community. Now, go create something amazing!
                </p>
            </div>
        </div>
    </div>
);

// --- BLOG PAGE COMPONENT ---
// Bu da Blog sayfası. Şimdilik tek bir yazı gösteriyor.
const BlogPage = () => (
    <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white mb-8">
                CreatorKit Blog
            </h1>
            
            {/* Tek Blog Yazısı Kartı */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    How to Design a YouTube Thumbnail That Gets Clicks in 2024
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Published on July 1, 2025</p>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Your YouTube thumbnail is the billboard for your video. It's the first thing viewers see, and it can be the single most important factor in whether they decide to click or scroll past... 
                </p>
                <p className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
                    (In a real site, this would be a link to the full article page)
                </p>
            </div>
            
             <div className="text-center mt-8 text-gray-500">
                More articles coming soon!
             </div>
        </div>
    </div>
);


// --- ZORUNLU YASAL SAYFALAR ---
// AdSense onayı için basit metinler ekledik.
const PrivacyPolicyPage = () => (
    <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 prose dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p>Our website uses third-party advertising companies like Google AdSense to serve ads when you visit. These companies may use information about your visits to this and other websites to provide advertisements about goods and services of interest to you. We do not collect or store any personal data from our visitors.</p>
        </div>
    </div>
);

const TermsOfServicePage = () => (
    <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 prose dark:prose-invert">
            <h1>Terms of Service</h1>
            <p>By using this website, you agree to not misuse the services provided. All tools are offered as-is, without any warranty. You are responsible for ensuring that your use of our tools complies with the terms of service of third-party platforms like YouTube.</p>
        </div>
    </div>
);


const AdPlaceholder = ({ width, height, label }: { width: number, height: number, label: string }) => (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 mx-auto" style={{ width: `100%`, maxWidth: `${width}px`, height: `${height}px` }}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
    </div>
);


// --- ANA UYGULAMA BİLEŞENİ ---
// Değişiklikler sadece <Routes> bölümünde yapıldı.
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
            {/* Mevcut Sayfalar */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloaderPage />} />
            
            {/* Doldurulan Sayfalar (Eskiden Placeholder idi) */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;