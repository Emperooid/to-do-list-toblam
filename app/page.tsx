'use client'
import { useState, useEffect } from 'react';
import SidebarContent from '@/component/dashboard/sidebar';
import MainContent from '@/component/dashboard/mainContent';
import ThreeBackground from '@/component/ThreeBackground';

export default function Dashboard() {
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        console.log('Loading saved theme:', savedTheme);
        setTheme(savedTheme);
        
        // Apply theme to document
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark-mode');
        }
    }, []);

    // Handle theme changes
    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        console.log('Theme changing to:', newTheme);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark-mode');
        }
    };

    return (
        <div className={`flex h-screen overflow-hidden relative ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
            <ThreeBackground isDarkMode={theme === 'dark'} completedTasks={5} />
            <SidebarContent 
                onExpandToggle={setSidebarExpanded} 
                theme={theme}
                onThemeChange={handleThemeChange}
            />

            <main className="flex-1 overflow-hidden relative z-10">
                <MainContent theme={theme} />
            </main>
        </div>
    );
}