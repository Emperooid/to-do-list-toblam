'use client'
import React, { useState, useEffect } from 'react';

// Move ThemeToggle outside and make it accept theme state as props
function ThemeToggle({ theme, onThemeChange }: { theme: 'light' | 'dark', onThemeChange: (theme: 'light' | 'dark') => void }) {
    console.log('ThemeToggle rendered with theme:', theme); // Debug log
    
    return (
        <div className="inline-flex bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-1 shadow-sm">
            <button
                onClick={() => onThemeChange('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    theme === 'light'
                        ? 'bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light
            </button>
            <button
                onClick={() => onThemeChange('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    theme === 'dark'
                        ? 'bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark
            </button>
        </div>
    );
}

function Personal() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        console.log('Loading saved theme:', savedTheme); // Debug log
        setTheme(savedTheme);
        setIsDarkMode(savedTheme === 'dark');
        
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Handle theme changes
    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        console.log('Theme changing to:', newTheme); // Debug log
        setTheme(newTheme);
        setIsDarkMode(newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Panel */}
            <div className={`w-80 shrink-0 border-r flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'}`}>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Projects</h2>
                            <button className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'}`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-2">
                            <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? 'text-white hover:bg-slate-800' : 'text-black hover:bg-gray-200'}`}>
                                Teams {/* Fixed the typo */}
                            </button>
                            <div>
                                <button className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'}`}>
                                    Projects
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="ml-3 mt-1 space-y-1">
                                    <div className={`px-3 py-1.5 text-sm ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>All projects (3)</div>
                                    <div className={`px-3 py-1.5 text-sm font-medium rounded ${isDarkMode ? 'text-indigo-300 bg-indigo-900/50' : 'text-indigo-800 bg-indigo-100'}`}>Design system</div>
                                    <div className={`px-3 py-1.5 text-sm cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black hover:text-gray-700'}`}>User flow</div>
                                    <div className={`px-3 py-1.5 text-sm cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black hover:text-gray-700'}`}>Ux research</div>
                                </div>
                            </div>
                            <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${isDarkMode ? 'text-white hover:bg-slate-800' : 'text-black hover:bg-gray-200'}`}>
                                Tasks
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? 'text-white hover:bg-slate-800' : 'text-black hover:bg-gray-200'}`}>
                            Remindersbbbbb
                        </button>
                        <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? 'text-white hover:bg-slate-800' : 'text-black hover:bg-gray-200'}`}>
                            Messengers
                        </button>
                    </div>
                </div>

                {/* Fixed Theme Toggle at Bottom */}
                <div className={`p-6 border-t flex-shrink-0 ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-gray-300 bg-gray-50/50'}`}>
                    <p className={`text-xs font-medium mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Theme</p>
                    <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
                </div>
            </div>
            
            {/* Main Content Area */}
            <div className={`flex-1 overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
                <div className="h-full overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                            <div>
                                <h1 className={`text-xl sm:text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Welcome back, Vincent 👋</h1>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>19 May 2022</p>
                            </div>
                            <div className="flex gap-3">
                                <button className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <button className={`px-4 py-2 rounded-lg text-sm ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-black'}`}>Board view</button>
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white">New template</button>
                        </div>

                        <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <p>Main content area - add your dashboard content here</p>
                            <div className="mt-8 space-y-4">
                                {/* Sample content to show scrolling works */}
                                {Array.from({ length: 20 }, (_, i) => (
                                    <div key={i} className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
                                        <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sample Content {i + 1}</h3>
                                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This is sample content to demonstrate scrolling functionality.</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Theme Toggle at Bottom of Main Content */}
                        <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-300'}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Theme Settings</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose your preferred theme</p>
                                </div>
                                <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Personal;