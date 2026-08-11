import React, { useState, useEffect } from 'react';
import { getDueSrsWords, updateSrsWord } from '../utils/progressTracker';
import { Volume2, CheckCircle2, RotateCcw, Brain, ArrowRight } from 'lucide-react';
import IpaGuide from './IpaGuide';

const SRSMode = ({ words, speak }) => {
    const [dueWords, setDueWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (words.length > 0) {
            const list = getDueSrsWords(words);
            setDueWords(list);
        }
    }, [words]);

    const currentWord = dueWords[currentIndex];

    const handleShowAnswer = () => {
        setShowAnswer(true);
        speak(currentWord.en);
    };

    const handleRate = (quality) => {
        updateSrsWord(currentWord.id, quality);
        
        if (currentIndex + 1 < dueWords.length) {
            setCurrentIndex(prev => prev + 1);
            setShowAnswer(false);
        } else {
            setIsFinished(true);
        }
    };

    const handleRestart = () => {
        const list = getDueSrsWords(words);
        setDueWords(list);
        setCurrentIndex(0);
        setShowAnswer(false);
        setIsFinished(false);
    };

    if (words.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 h-64 text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (dueWords.length === 0 || isFinished) {
        return (
            <div className="text-center bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-lg border-2 border-emerald-100 dark:border-emerald-900/50 max-w-lg mx-auto animate-fade-in mt-10 transition-colors">
                <CheckCircle2 size={80} className="mx-auto text-emerald-500 mb-6" />
                <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-3">Tuyệt vời!</h2>
                <p className="text-gray-500 dark:text-slate-400 mb-8 text-lg">Bạn đã ôn tập xong tất cả các từ cần thiết cho hôm nay. Việc học ngắt quãng giúp bạn nhớ lâu hơn mà tốn ít thời gian hơn!</p>
                <button 
                    onClick={handleRestart}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2 mx-auto"
                >
                    <RotateCcw size={20} /> Kiểm tra lại
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <div className="mb-6 flex justify-between items-end">
                <span className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Từ thứ {currentIndex + 1} / {dueWords.length}</span>
                <div className="flex gap-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1"><Brain size={16}/> Ôn tập ngắt quãng (SRS)</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-lg border-b-4 border-gray-200 dark:border-slate-800 flex flex-col items-center min-h-[400px] justify-center relative transition-colors">
                
                <div className="absolute right-6 top-6">
                    <button 
                        onClick={() => speak(currentWord.en)}
                        className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition animate-pulse"
                        title="Nghe phát âm"
                    >
                        <Volume2 size={24} />
                    </button>
                </div>

                <div className="text-center w-full">
                    <p className="text-gray-400 dark:text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">Từ vựng</p>
                    <h2 className="text-5xl md:text-6xl font-black text-indigo-700 dark:text-indigo-400 mb-4">{currentWord.en}</h2>
                    
                    {showAnswer ? (
                        <div className="animate-fade-in mt-8 space-y-6">
                            <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700">
                                <p className="text-gray-400 dark:text-slate-500 font-mono text-xl mb-2">{currentWord.ipa}</p>
                                <IpaGuide ipa={currentWord.ipa} />
                                <div className="mt-6">
                                    <span className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase">Nghĩa tiếng Việt</span>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{currentWord.vi}</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <p className="text-gray-500 dark:text-slate-400 font-medium mb-4">Bạn nhớ từ này ở mức độ nào?</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <button onClick={() => handleRate(1)} className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-bold border-2 border-red-100 dark:border-red-900/50 hover:border-red-400 dark:hover:border-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition flex flex-col items-center gap-1">
                                        <span className="text-lg">Quên</span>
                                        <span className="text-xs font-normal opacity-70">&lt; 1 ngày</span>
                                    </button>
                                    <button onClick={() => handleRate(3)} className="p-4 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-xl font-bold border-2 border-orange-100 dark:border-orange-900/50 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition flex flex-col items-center gap-1">
                                        <span className="text-lg">Khó</span>
                                        <span className="text-xs font-normal opacity-70">~1 ngày</span>
                                    </button>
                                    <button onClick={() => handleRate(4)} className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl font-bold border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition flex flex-col items-center gap-1">
                                        <span className="text-lg">Vừa</span>
                                        <span className="text-xs font-normal opacity-70">~3 ngày</span>
                                    </button>
                                    <button onClick={() => handleRate(5)} className="p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl font-bold border-2 border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition flex flex-col items-center gap-1">
                                        <span className="text-lg">Dễ</span>
                                        <span className="text-xs font-normal opacity-70">~6+ ngày</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-12 w-full max-w-sm mx-auto">
                            <button 
                                onClick={handleShowAnswer}
                                className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
                            >
                                Xem đáp án <ArrowRight size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SRSMode;
