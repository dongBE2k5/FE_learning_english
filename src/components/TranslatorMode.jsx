import { useState } from "react";
import { Languages, ArrowRightLeft, Copy, Volume2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { useAiStatus } from "./AiStatusProvider";

const TranslatorMode = ({ speak }) => {
    const { reportAiUsage } = useAiStatus();

    const [inputText, setInputText] = useState(() => {
        return localStorage.getItem("translator_inputText") || "";
    });
    const [translatedText, setTranslatedText] = useState(() => {
        return localStorage.getItem("translator_translatedText") || "";
    });
    const [isTranslating, setIsTranslating] = useState(false);
    const [direction, setDirection] = useState(() => {
        return localStorage.getItem("translator_direction") || "en-vi";
    });

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            setTranslatedText("");
            localStorage.removeItem("translator_translatedText");
            return;
        }

        setIsTranslating(true);
        localStorage.setItem("translator_inputText", inputText);
        try {
            const prompt = `Translate the following text from ${direction === "en-vi" ? "English to Vietnamese" : "Vietnamese to English"}. 
            Only provide the translated text without any explanations or extra characters.
            
            Text: ${inputText}`;

            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ai/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            const text = data.text.trim();
            if (data.metadata) reportAiUsage(data.metadata);
            
            setTranslatedText(text);
            localStorage.setItem("translator_translatedText", text);
        } catch (error) {
            console.error("Translation error:", error);
            toast.error("Lỗi khi dịch thuật. Vui lòng thử lại!");
        } finally {
            setIsTranslating(false);
        }
    };

    const toggleDirection = () => {
        const nextDirection = direction === "en-vi" ? "vi-en" : "en-vi";
        setDirection(nextDirection);
        localStorage.setItem("translator_direction", nextDirection);

        setInputText(translatedText);
        setTranslatedText(inputText);
        localStorage.setItem("translator_inputText", translatedText);
        localStorage.setItem("translator_translatedText", inputText);
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.info("Đã sao chép vào bộ nhớ tạm!");
    };

    const reset = () => {
        setInputText("");
        setTranslatedText("");
        localStorage.removeItem("translator_inputText");
        localStorage.removeItem("translator_translatedText");
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <Languages size={28} /> Dịch thuật AI
                </h2>

                <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                    <div className="flex-1 w-full text-center py-2 px-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                        {direction === "en-vi" ? "Tiếng Anh" : "Tiếng Việt"}
                    </div>
                    
                    <button 
                        onClick={toggleDirection}
                        className="p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition shadow-sm text-gray-600 dark:text-slate-300"
                        title="Đổi chiều dịch"
                    >
                        <ArrowRightLeft size={20} />
                    </button>

                    <div className="flex-1 w-full text-center py-2 px-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-xl border border-green-100 dark:border-green-900/50">
                        {direction === "en-vi" ? "Tiếng Việt" : "Tiếng Anh"}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Area */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase">Văn bản nguồn</span>
                            <button 
                                onClick={reset}
                                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                title="Xóa nội dung"
                            >
                                <RotateCcw size={16} />
                            </button>
                        </div>
                        <div className="relative">
                            <textarea
                                className="w-full h-48 md:h-64 p-5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-lg text-gray-800 dark:text-slate-200 transition-colors"
                                placeholder={direction === "en-vi" ? "Nhập văn bản tiếng Anh..." : "Nhập văn bản tiếng Việt..."}
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value);
                                    localStorage.setItem("translator_inputText", e.target.value);
                                }}
                            />
                            {inputText && (
                                <div className="absolute right-4 bottom-4 flex gap-2">
                                    <button 
                                        onClick={() => speak(inputText, null, direction === "en-vi" ? "en" : "vi")}
                                        className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                        title="Nghe"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase">Bản dịch</span>
                            {translatedText && (
                                <button 
                                    onClick={() => copyToClipboard(translatedText)}
                                    className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                                    title="Sao chép"
                                >
                                    <Copy size={16} />
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <div className={`w-full h-48 md:h-64 p-5 rounded-2xl border text-lg overflow-y-auto whitespace-pre-wrap transition-colors ${
                                isTranslating ? "bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-800 italic text-gray-400 dark:text-slate-500" : "bg-white dark:bg-slate-800 border-green-200 dark:border-green-900/50 text-gray-800 dark:text-slate-200"
                            }`}>
                                {isTranslating ? "Đang dịch..." : (translatedText || "Kết quả dịch sẽ xuất hiện ở đây...")}
                            </div>
                            {translatedText && !isTranslating && (
                                <div className="absolute right-4 bottom-4 flex gap-2">
                                    <button 
                                        onClick={() => speak(translatedText, null, direction === "en-vi" ? "vi" : "en")}
                                        className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition"
                                        title="Nghe"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button 
                        onClick={handleTranslate}
                        disabled={isTranslating || !inputText.trim()}
                        className="w-full md:w-auto px-12 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:bg-gray-300 disabled:shadow-none translate-y-0 active:translate-y-1"
                    >
                        {isTranslating ? "Đang xử lý..." : "Dịch ngay nội dung"}
                    </button>
                </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-900/30 transition-colors">
                <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" /> Công cụ dịch thuật AI
                </h3>
                <p className="text-sm text-indigo-900/70 dark:text-indigo-200/70 leading-relaxed">
                    Sử dụng sức mạnh của Gemini AI để dịch câu và đoạn văn một cách tự nhiên. Bạn có thể nghe phát âm của cả văn bản nguồn và bản dịch để nâng cao kỹ năng nghe.
                </p>
            </div>
        </div>
    );
};

export default TranslatorMode;
