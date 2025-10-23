'use client'
import { useState } from 'react';
import SidebarContent from '@/component/dashboard/sidebar';
import MainContent from '@/component/dashboard/mainContent';

export default function Dashboard() {
    const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <SidebarContent onExpandToggle={setSidebarExpanded} />
            <main className="flex-1 overflow-hidden">
                <MainContent />
            </main>
        </div>
    );
}