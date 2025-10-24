'use client'
import { useState } from 'react';
import SidebarContent from '@/component/dashboard/sidebar';
import MainContent from '@/component/dashboard/mainContent';
import ThreeBackground from '@/component/ThreeBackground';

export default function Dashboard() {
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

    return (
        <div className="flex h-screen overflow-hidden relative">
            <ThreeBackground isDarkMode={false} completedTasks={5} />
            <SidebarContent onExpandToggle={setSidebarExpanded} />

            <main className="flex-1 overflow-hidden relative z-10">
                <MainContent />
            </main>
        </div>
    );
}