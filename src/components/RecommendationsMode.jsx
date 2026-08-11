import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../utils/progressTracker';
import { Target, TrendingUp, AlertTriangle, BookOpen, Layers, Volume2 } from 'lucide-react';
import IpaGuide from './IpaGuide';

export default function RecommendationsMode({ words, speak, setActiveTab }) {
    const [recommendations, setRecommendations] = useState({ weakWords: [], weakUnits: [], weakGrammar: [] });

    useEffect(() => {
        if (words && words.length > 0) {
            setRecommendations(getRecommendations(words));
        }
    }, [words]);

    const { weakWords, weakUnits, weakGrammar } = recommendations;

    const hasRecommendations = weakWords.length > 0 || weakUnits.length > 0 || weakGrammar.length > 0;

    if (!words || words.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 h-64 text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <p>Chưa có dữ liệu từ vựng.</p>
            </div>
        );
    }

    if (!hasRecommendations) {
        return (
            <div className="max-w-4xl mx-auto text-center bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 animate-fade-in transition-colors">
                <TrendingUp size={64} className="mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Chưa có đủ dữ liệu hoặc bạn đang làm rất tốt!</h2>
                <p className="text-gray-600 dark:text-slate-400 mb-6">Hãy tiếp tục luyện tập các bài Trắc nghiệm, Nghe & Viết, hoặc Luyện Ngữ Pháp để hệ thống có thể phân tích và đưa ra đề xuất nhé.</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setActiveTab('quiz')} className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition">
                        Làm Trắc nghiệm
                    </button>
                    <button onClick={() => setActiveTab('dictation')} className="px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition">
                        Nghe & Viết
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Target size={32} /> Phân tích & Đề xuất Ôn tập
                </h2>
                <p className="text-indigo-100 text-lg">Hệ thống đã phân tích kết quả học tập của bạn và đưa ra các gợi ý sau để cải thiện.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weak Words Section */}
                {weakWords.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-orange-500" /> Từ vựng hay sai ({weakWords.length})
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Bạn thường trả lời sai các từ này trong bài kiểm tra. Hãy ôn lại nhé!</p>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {weakWords.map(word => (
                                <div key={word.id} className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg text-gray-800 dark:text-white">{word.en}</span>
                                            <span className="text-xs px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700">{word.category}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-slate-300">{word.vi}</p>
                                        <IpaGuide ipa={word.ipa} className="justify-start mt-1" />
                                    </div>
                                    <button 
                                        onClick={(e) => speak(word.en, e)}
                                        className="p-2 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 rounded-full hover:bg-orange-100 dark:hover:bg-slate-700 transition shadow-sm"
                                    >
                                        <Volume2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-8">
                    {/* Weak Units Section */}
                    {weakUnits.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Layers className="text-blue-500" /> Unit cần ôn tập
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Tỉ lệ trả lời đúng của các Unit này dưới 75%.</p>
                            <div className="space-y-3">
                                {weakUnits.map(unitStat => (
                                    <div key={unitStat.unit} className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                                        <span className="font-bold text-gray-800 dark:text-white">{unitStat.unit}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-2 bg-blue-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500" 
                                                    style={{ width: `${Math.round(unitStat.accuracy * 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{Math.round(unitStat.accuracy * 100)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Weak Grammar Section */}
                    {weakGrammar.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <BookOpen className="text-purple-500" /> Ngữ pháp cần cải thiện
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Điểm trung bình của các chủ đề này dưới 80%.</p>
                            <div className="space-y-3">
                                {weakGrammar.map(grammarStat => (
                                    <div key={grammarStat.topic} className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30 flex justify-between items-center">
                                        <span className="font-bold text-gray-800 dark:text-white">{grammarStat.topic}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-2 bg-purple-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-purple-500" 
                                                    style={{ width: `${Math.round(grammarStat.accuracy * 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-bold text-purple-700 dark:text-purple-400">{Math.round(grammarStat.accuracy * 100)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => setActiveTab('grammar')}
                                className="w-full mt-4 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-bold rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
                            >
                                Luyện Ngữ Pháp Ngay
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
