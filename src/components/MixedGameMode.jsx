import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Volume2, ArrowRight, RotateCcw, Shuffle, Type, Settings, Play } from 'lucide-react';
import IpaGuide from './IpaGuide';
import { recordWordResult } from '../utils/progressTracker';

const MixedGameMode = ({ words, speak }) => {
    // Game State
    const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'result'
    
    // Setup State
    const [selectedScope, setSelectedScope] = useState('all');
    const [wordCount, setWordCount] = useState(10);
    const [selectedTypes, setSelectedTypes] = useState({
        quiz: true,
        dictation: true,
        typing: true
    });

    // Playing State
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [wrongWords, setWrongWords] = useState([]);
    const inputRef = useRef(null);
    const timerRef = useRef(null);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Derived unique scopes from words
    const scopeOptions = React.useMemo(() => {
        const units = new Set();
        const masters = new Set();
        words.forEach(w => {
            if (w.master_group) masters.add(w.master_group);
            if (typeof w.unit === 'number') units.add(w.unit);
        });
        return {
            units: Array.from(units).sort((a, b) => a - b),
            masters: Array.from(masters).sort()
        };
    }, [words]);

    const startGame = (e) => {
        if (e) e.preventDefault();
        
        // Filter words based on scope
        let pool = words;
        if (selectedScope !== 'all') {
            if (selectedScope.startsWith('unit_')) {
                const u = parseInt(selectedScope.split('_')[1], 10);
                pool = words.filter(w => w.unit === u && !w.master_group);
            } else if (selectedScope.startsWith('master_')) {
                const m = selectedScope.split('_')[1];
                pool = words.filter(w => w.master_group === m);
            }
        }

        if (pool.length < 4) {
            alert("Không đủ từ vựng trong nhóm này để tạo game (cần ít nhất 4 từ). Vui lòng chọn nhóm khác!");
            return;
        }

        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(wordCount, pool.length));
        
        // Available types
        const types = Object.keys(selectedTypes).filter(k => selectedTypes[k]);
        if (types.length === 0) types.push('quiz'); // Fallback

        const generatedQuestions = selected.map(target => {
            const type = types[Math.floor(Math.random() * types.length)];
            let options = [];
            
            if (type === 'quiz') {
                const distractors = pool
                    .filter(w => w.id !== target.id)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                // Ensure we have 4 options
                while(distractors.length < 3) distractors.push(target); 
                options = [target, ...distractors].sort(() => 0.5 - Math.random());
            }
            
            return { target, type, options };
        });

        setQuestions(generatedQuestions);
        setScore(0);
        setCurrentQ(0);
        setWrongWords([]);
        setGameState('playing');
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setSelectedOptionId(null);
        setUserInput("");
        setFeedback(null);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 100);
    };

    useEffect(() => {
        if (gameState === 'playing' && questions.length > 0) {
            const q = questions[currentQ];
            if (q.type === 'dictation' || q.type === 'quiz') {
                const timer = setTimeout(() => {
                    speak(q.target.en);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [currentQ, questions, gameState]);

    // Handle keydown for input modes
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && feedback !== null && gameState === 'playing') {
                handleNext();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [feedback, gameState]);

    const handleAnswerQuiz = (optId) => {
        if (selectedOptionId !== null) return;
        const q = questions[currentQ];
        const isCorrect = optId === q.target.id;
        setSelectedOptionId(optId);

        recordWordResult(q.target.id, isCorrect);
        if (isCorrect) setScore(score + 1);
        else {
            setWrongWords(prev => {
                if (!prev.find(w => w.id === q.target.id)) return [...prev, q.target];
                return prev;
            });
        }

        timerRef.current = setTimeout(() => {
            handleNext();
        }, isCorrect ? 2500 : 4500); // 2.5s for correct, 4.5s for incorrect (more time for review)
    };

    const handleSubmitInput = (e) => {
        e.preventDefault();
        if (feedback !== null || !userInput.trim()) return;
        
        const q = questions[currentQ];
        const isCorrect = userInput.trim().toLowerCase() === q.target.en.toLowerCase();
        
        setFeedback(isCorrect ? 'correct' : 'incorrect');
        recordWordResult(q.target.id, isCorrect);
        
        if (isCorrect) setScore(score + 1);
        else {
            setWrongWords(prev => {
                if (!prev.find(w => w.id === q.target.id)) return [...prev, q.target];
                return prev;
            });
        }
    };

    const handleNext = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            resetQuestionState();
        } else {
            setGameState('result');
        }
    };

    if (gameState === 'setup') {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 animate-fade-in">
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-500">
                        <Settings size={24} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-800 dark:text-white">Thiết lập Trò chơi</h1>
                </div>

                <form onSubmit={startGame} className="space-y-6">
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Phạm vi từ vựng</label>
                        <select 
                            value={selectedScope}
                            onChange={(e) => setSelectedScope(e.target.value)}
                            className="w-full p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white cursor-pointer"
                        >
                            <option value="all">Tất cả từ vựng</option>
                            <optgroup label="Nhóm Khóa Học (Units)">
                                {scopeOptions.units.filter(u => u <= 12).map(u => (
                                    <option key={`unit_${u}`} value={`unit_${u}`}>Unit {u}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Nhóm Chủ Đề Hàng Ngày">
                                {scopeOptions.units.filter(u => u >= 13).map(u => (
                                    <option key={`unit_${u}`} value={`unit_${u}`}>Chủ đề {u - 12}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Nhóm Mở Rộng (Master Groups)">
                                {scopeOptions.masters.map(m => (
                                    <option key={`master_${m}`} value={`master_${m}`}>{m}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Số lượng câu hỏi</label>
                        <div className="flex gap-3">
                            {[10, 20, 50, 100].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setWordCount(num)}
                                    className={`flex-1 py-2 rounded-xl font-bold transition-all ${wordCount === num ? 'bg-blue-500 text-white shadow-md scale-105' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-100 dark:border-slate-700">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Loại bài tập</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={selectedTypes.quiz} onChange={(e) => setSelectedTypes({...selectedTypes, quiz: e.target.checked})} className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Trắc nghiệm</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={selectedTypes.dictation} onChange={(e) => setSelectedTypes({...selectedTypes, dictation: e.target.checked})} className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Nghe chép</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={selectedTypes.typing} onChange={(e) => setSelectedTypes({...selectedTypes, typing: e.target.checked})} className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Dịch & Gõ</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-lg hover:shadow-blue-300/50 text-lg">
                        <Play size={24} /> BẮT ĐẦU CHƠI
                    </button>
                </form>
            </div>
        );
    }

    if (gameState === 'result') {
        const accuracy = Math.round((score / questions.length) * 100);
        return (
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-10">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center border-2 border-blue-500 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-blue-50 dark:bg-blue-900/20 rounded-t-3xl border-b border-blue-100 dark:border-blue-900/50"></div>
                    <div className="relative z-10">
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                            <Shuffle size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Kết Quả Tổng Hợp</h2>
                        <p className="text-gray-500 dark:text-slate-400 mb-8 font-medium">Hoàn thành xuất sắc!</p>
                        
                        <div className="flex justify-center gap-8 mb-8">
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Điểm số</p>
                                <p className="text-4xl font-black text-blue-500">{score}/{questions.length}</p>
                            </div>
                            <div className="w-px bg-gray-200 dark:bg-slate-700"></div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Độ chính xác</p>
                                <p className="text-4xl font-black text-green-500">{accuracy}%</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setGameState('setup')}
                            className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto transition"
                        >
                            <RotateCcw size={20} /> Chơi lại
                        </button>
                    </div>
                </div>

                {wrongWords.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/30 shadow-sm">
                        <h3 className="text-xl font-bold text-rose-500 mb-4 flex items-center gap-2">
                            <XCircle size={24} /> Từ cần ôn lại ({wrongWords.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {wrongWords.map((word, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-900/20 group">
                                    <button 
                                        onClick={() => speak(word.en)}
                                        className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-rose-500 shadow-sm hover:scale-110 transition shrink-0"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                    <div>
                                        <div className="font-bold text-gray-800 dark:text-gray-100">{word.en}</div>
                                        <div className="text-sm text-gray-500 dark:text-slate-400">{word.vi}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (questions.length === 0) return null;

    const q = questions[currentQ];
    const progress = ((currentQ) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto animate-fade-in pb-10">
            {/* Header / Progress */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4">
                <button onClick={() => setGameState('setup')} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <ArrowRight size={20} className="rotate-180" />
                </button>
                <div className="flex-1">
                    <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-slate-400 mb-2">
                        <span>Câu {currentQ + 1} / {questions.length}</span>
                        <span className="text-blue-500">Điểm: {score}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Question Area */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-lg border-2 border-blue-100 dark:border-slate-800 min-h-[400px] flex flex-col items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    {q.type === 'quiz' && "Trắc nghiệm"}
                    {q.type === 'dictation' && "Nghe chép"}
                    {q.type === 'typing' && "Dịch & Gõ"}
                </div>

                {/* Content based on type */}
                {q.type === 'quiz' && (
                    <div className="w-full max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <button 
                                onClick={() => speak(q.target.en)}
                                className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform shadow-md border border-blue-100 dark:border-blue-800"
                            >
                                <Volume2 size={40} />
                            </button>
                            <h2 className="text-4xl font-black text-gray-800 dark:text-white mb-2">{q.target.en}</h2>
                            <IpaGuide text={q.target.ipa || ''} />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt) => {
                                const isSelected = selectedOptionId === opt.id;
                                const isTarget = opt.id === q.target.id;
                                
                                let btnClass = "p-4 rounded-xl border-2 text-left font-medium transition-all text-sm md:text-base ";
                                
                                if (selectedOptionId !== null) {
                                    if (isTarget) {
                                        btnClass += "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 shadow-md scale-[1.02] z-10";
                                    } else if (isSelected) {
                                        btnClass += "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400 scale-[0.98]";
                                    } else {
                                        btnClass += "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-500 opacity-50";
                                    }
                                } else {
                                    btnClass += "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 shadow-sm";
                                }

                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleAnswerQuiz(opt.id)}
                                        disabled={selectedOptionId !== null}
                                        className={btnClass}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{opt.vi}</span>
                                            {selectedOptionId !== null && isTarget && <CheckCircle2 size={20} className="text-green-500" />}
                                            {selectedOptionId !== null && isSelected && !isTarget && <XCircle size={20} className="text-rose-500" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Manual Skip/Transition Button */}
                        {selectedOptionId !== null && (
                            <div className="flex justify-end mt-6 animate-fade-in">
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md transition cursor-pointer"
                                >
                                    {currentQ < questions.length - 1 ? "Tiếp theo ➔" : "Xem kết quả ➔"}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {q.type === 'dictation' && (
                    <div className="w-full max-w-lg mx-auto text-center">
                        <button 
                            onClick={() => speak(q.target.en)}
                            className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30 hover:scale-110 transition-transform animate-pulse-slow"
                        >
                            <Volume2 size={48} />
                        </button>
                        
                        <p className="text-gray-500 dark:text-slate-400 mb-6 font-medium">Nghe và gõ lại từ vựng bằng tiếng Anh</p>

                        <form onSubmit={handleSubmitInput} className="relative mb-4">
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                disabled={feedback !== null}
                                placeholder="Gõ từ tiếng Anh vào đây..."
                                className={`w-full text-center text-2xl font-bold p-4 border-b-4 bg-transparent outline-none transition-colors ${
                                    feedback === 'correct' ? 'border-green-500 text-green-600 dark:text-green-400' :
                                    feedback === 'incorrect' ? 'border-rose-500 text-rose-600 dark:text-rose-400' :
                                    'border-gray-300 dark:border-slate-600 focus:border-blue-500 text-gray-800 dark:text-white'
                                }`}
                                autoComplete="off"
                            />
                        </form>
                    </div>
                )}

                {q.type === 'typing' && (
                    <div className="w-full max-w-lg mx-auto text-center">
                        <div className="mb-8">
                            <div className="inline-block p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-inner mb-4">
                                <h2 className="text-3xl font-black text-gray-800 dark:text-white">{q.target.vi}</h2>
                            </div>
                            <p className="text-gray-500 dark:text-slate-400 font-medium">Dịch nghĩa tiếng Việt trên sang tiếng Anh</p>
                        </div>

                        <form onSubmit={handleSubmitInput} className="relative mb-4">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                <Type size={20} />
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                disabled={feedback !== null}
                                placeholder="Gõ tiếng Anh..."
                                className={`w-full text-xl font-bold p-4 pl-12 rounded-xl border-2 outline-none transition-colors ${
                                    feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-700' :
                                    feedback === 'incorrect' ? 'border-rose-500 bg-rose-50 text-rose-700' :
                                    'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:border-blue-500 text-gray-800 dark:text-white'
                                }`}
                                autoComplete="off"
                            />
                        </form>
                    </div>
                )}

                {/* Feedback for Dictation & Typing */}
                {feedback !== null && (q.type === 'dictation' || q.type === 'typing') && (
                    <div className={`w-full max-w-lg mt-6 p-4 rounded-xl flex items-center justify-between animate-fade-in ${feedback === 'correct' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'}`}>
                        <div className="flex items-center gap-3">
                            {feedback === 'correct' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                            <div>
                                <p className="font-bold">{feedback === 'correct' ? 'Chính xác!' : 'Chưa chính xác!'}</p>
                                {feedback === 'incorrect' && (
                                    <p className="text-sm">Đáp án đúng: <span className="font-black">{q.target.en}</span></p>
                                )}
                            </div>
                        </div>
                        <button onClick={handleNext} className="px-4 py-2 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 rounded-lg font-bold flex items-center gap-2 transition">
                            Tiếp tục <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MixedGameMode;
