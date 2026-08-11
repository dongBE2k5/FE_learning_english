import React from 'react';
import { BookOpen, Menu, Settings, Moon, Sun, Flame } from 'lucide-react';

export default function Header({ wordCount, onToggleSidebar, onOpenSettings, theme, toggleTheme, streak }) {
    return (
        <header className="bg-white dark:bg-slate-900 sticky top-0 z-50 shadow-sm dark:shadow-slate-800/50 border-b border-transparent dark:border-slate-800 transition-colors">
            <div className="px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg md:hidden text-gray-600 dark:text-slate-400"
                        aria-label="Toggle Menu"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-500">
                        <BookOpen size={28} className="fill-blue-500" />
                        <h1 className="text-xl md:text-2xl font-black tracking-tight dark:text-white">EngMaster</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full transition-colors border border-orange-200 dark:border-orange-500/20 shadow-sm" title="Chuỗi ngày học liên tiếp">
                        <Flame size={16} className="fill-orange-500 animate-pulse" />
                        <span>{streak} ngày</span>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full transition-colors hidden sm:block">
                        {wordCount} từ vựng
                    </div>
                    
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        title="Chuyển chế độ Sáng/Tối"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={onOpenSettings}
                        className="p-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        title="Cài đặt giọng đọc"
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
