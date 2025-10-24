'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface Route {
    label: string;
    href: string;
    icon: string;
}

interface SidebarProps {
    onExpandToggle?: (expanded: boolean) => void;
    theme: 'light' | 'dark';
    onThemeChange: (theme: 'light' | 'dark') => void;
}

const routes: Route[] = [
    {
        label: "Apps",
        href: "/dashboard/personal/peronal",
        icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    },
    {
        label: "Users",
        href: "/users",
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    {
        label: "Calendar",
        href: "/calendar",
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    }
]

function SidebarContent({ onExpandToggle, theme, onThemeChange }: SidebarProps) {
    const pathname = usePathname();
    const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const handleItemClick = (label: string) => {
        if (label === "Apps") {
            setIsAnimating(true);
            const newState = expandedPanel === "Apps" ? null : "Apps";
            setExpandedPanel(newState);
            if (onExpandToggle) {
                onExpandToggle(newState !== null);
            }
            
            // Reset animation state after transition
            setTimeout(() => setIsAnimating(false), 300);
        } else {
            setExpandedPanel(null);
            if (onExpandToggle) {
                onExpandToggle(false);
            }
        }
    };

    const handleThemeClick = (newTheme: 'light' | 'dark') => {
        console.log('Theme button clicked:', newTheme);
        onThemeChange(newTheme);
    };

    return (
        <div className={`transition-all duration-500 ease-in-out bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-r border-slate-800 flex shadow-2xl ${expandedPanel ? 'w-96' : 'w-20'}`}>
            {/* Sidebar */}
            <div className="w-20 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center py-6 gap-6 min-h-screen relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-purple-600/10 opacity-50"></div>
                
                {/* Logo section with positioned dots */}
                <div className="relative w-[34px] h-6 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute" style={{left: '0px'}}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute" style={{left: '14px'}}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute" style={{left: '28px'}}></div>
                </div>
                
                <nav className="flex flex-col gap-4 flex-1 relative z-10">
                    {routes.map((item, i) => (
                        <button
                            key={item.href}
                            onClick={() => handleItemClick(item.label)}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 relative overflow-hidden ${
                                expandedPanel === item.label || pathname === item.href
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50' 
                                    : 'text-gray-500 hover:text-white hover:bg-slate-800 hover:shadow-lg'
                            }`}
                            title={item.label}
                        >
                            {/* Active indicator */}
                            {(expandedPanel === item.label || pathname === item.href) && (
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl animate-pulse"></div>
                            )}
                            <svg className="w-6 h-6 relative z-10 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <button 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-all duration-300 border border-transparent hover:border-red-700/50 transform hover:scale-110 relative z-10"
                    title="Logout"
                    onClick={() => {/* Add logout logic here */}}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>

            {/* Expanded Panel */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedPanel === "Apps" ? 'w-76 opacity-100' : 'w-0 opacity-0'}`}>
                <div className="w-76 bg-white/95 backdrop-blur-lg border-r border-gray-200 flex flex-col min-h-screen relative">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20"></div>
                    </div>
                    
                    <div className={`p-6 relative z-10 transform transition-all duration-700 ${expandedPanel === "Apps" ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</h2>
                            <button 
                                onClick={() => handleItemClick("Apps")}
                                className="text-gray-500 hover:text-gray-900 transition-all duration-200 p-2 hover:bg-gray-100 rounded-lg transform hover:rotate-90"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className={`space-y-3 mb-8 transform transition-all duration-500 delay-100 ${expandedPanel === "Apps" ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <button className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 border border-transparent hover:border-gray-300 transform hover:translate-x-1">
                                Team
                            </button>
                            <div>
                                <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Projects
                                    <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className={`ml-4 mt-3 space-y-2 transform transition-all duration-300 delay-200 ${expandedPanel === "Apps" ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
                                    <div className="px-4 py-2 text-sm text-gray-500 font-medium">All projects (3)</div>
                                    <Link href="/dashboard/personal/peronal" className="block px-4 py-3 text-sm text-indigo-600 font-semibold bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-all duration-300 transform hover:translate-x-1 hover:shadow-lg">
                                        Design system
                                    </Link>
                                    <div className="px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-lg transform hover:translate-x-1">User flow</div>
                                    <div className="px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-lg transform hover:translate-x-1">Ux research</div>
                                </div>
                            </div>
                            <button className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 flex items-center justify-between border border-transparent hover:border-gray-300 transform hover:translate-x-1">
                                Tasks
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        <div className={`space-y-3 transform transition-all duration-500 delay-300 ${expandedPanel === "Apps" ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <button className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 border border-transparent hover:border-gray-300 transform hover:translate-x-1">
                                Reminders
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 border border-transparent hover:border-gray-300 transform hover:translate-x-1">
                                Messengers
                            </button>
                        </div>
                    </div>

                    {/* Theme Toggle at Bottom */}
                    <div className="mt-auto p-6 border-t border-gray-200 relative z-50">
                        <p className="text-xs font-medium mb-3 text-gray-600">Theme</p>
                        <div className={`inline-flex rounded-lg p-1 shadow-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'} border`}>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleThemeClick('light');
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                                    theme === 'light'
                                        ? 'bg-gray-50 text-gray-900 shadow-sm'
                                        : theme === 'dark' 
                                            ? 'text-gray-300 hover:bg-gray-600 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Light
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleThemeClick('dark');
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                                    theme === 'dark'
                                        ? 'bg-gray-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                                Dark
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarContent;