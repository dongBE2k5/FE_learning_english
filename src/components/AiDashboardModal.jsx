import React, { useState } from 'react';
import { useAiStatus } from './AiStatusProvider';
import { 
    X, 
    Bot, 
    Zap, 
    Cpu, 
    MessageSquare, 
    AlertTriangle, 
    RefreshCw, 
    DollarSign,
    CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function AiDashboardModal() {
    const { 
        totalTokens, 
        totalPromptTokens, 
        totalCompletionTokens, 
        rateLimitErrors, 
        lastModelUsed,
        preferredModel,
        setPreferredModel,
        isDashboardOpen,
        setIsDashboardOpen,
        clearStats
    } = useAiStatus();

    const [showConfirmReset, setShowConfirmReset] = useState(false);

    if (!isDashboardOpen) return null;

    // Estimate cost based on Gemini 1.5 Flash pricing
    // $0.075 per 1M prompt tokens
    // $0.30 per 1M completion tokens
    const promptCost = (totalPromptTokens / 1000000) * 0.075;
    const completionCost = (totalCompletionTokens / 1000000) * 0.30;
    const totalCost = promptCost + completionCost;

    const formatTokens = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const handleReset = () => {
        clearStats();
        setShowConfirmReset(false);
        toast.success("Đã xóa toàn bộ dữ liệu thống kê AI!");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsDashboardOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                
                {/* Header with Gradient */}
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shrink-0">
                    <button 
                        onClick={() => setIsDashboardOpen(false)}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                            <Bot className="w-8 h-8 text-blue-100" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                AI Control Center
                                <SparklesIcon className="w-5 h-5 text-yellow-300 animate-pulse" />
                            </h2>
                            <p className="text-blue-100 opacity-90 text-sm mt-1">
                                Quản lý lưu lượng và theo dõi giới hạn tài nguyên AI
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8 bg-gray-50 dark:bg-gray-900">
                    
                    {/* Metrics Grid */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            Usage Overview
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            {/* Total Tokens */}
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-start justify-between relative">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Tokens</p>
                                        <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                                            {formatTokens(totalTokens)}
                                        </p>
                                    </div>
                                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                                        <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Prompt Tokens */}
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-start justify-between relative">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Input (Prompt)</p>
                                        <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                                            {formatTokens(totalPromptTokens)}
                                        </p>
                                    </div>
                                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                        <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Completion Tokens */}
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-start justify-between relative">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Output (Comp.)</p>
                                        <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                                            {formatTokens(totalCompletionTokens)}
                                        </p>
                                    </div>
                                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                                        <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Cost */}
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-start justify-between relative">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Est. Cost (USD)</p>
                                        <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                                            ${totalCost.toFixed(5)}
                                        </p>
                                    </div>
                                    <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl">
                                        <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    Based on Gemini 1.5 Flash
                                </p>
                            </div>

                        </div>

                        {lastModelUsed && (
                            <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Model Status</span>
                                </div>
                                <code className="bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded-lg text-sm text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700 shadow-inner">
                                    {lastModelUsed}
                                </code>
                            </div>
                        )}

                        {/* AI Engine Selection */}
                        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-indigo-500" />
                                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Chọn Mô hình AI ưu tiên (AI Engine)</h4>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black">
                                    Gemma 4 E2B Integrated
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <button
                                    onClick={() => {
                                        setPreferredModel('google/gemma-4-e2b-it:free');
                                        toast.info('Đã chọn ưu tiên mô hình Gemma 4 E2B!');
                                    }}
                                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                                        preferredModel === 'google/gemma-4-e2b-it:free' || preferredModel === 'gemma-4-e2b-it'
                                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-900 dark:text-indigo-100 shadow-sm'
                                            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-black text-xs">Gemma 4 E2B</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 font-bold">Mới & Miễn phí</span>
                                    </div>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Siêu nhanh, gọn nhẹ, tối ưu tiếng Anh</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setPreferredModel('gemini-2.5-flash');
                                        toast.info('Đã chọn ưu tiên mô hình Gemini 2.5 Flash!');
                                    }}
                                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                                        preferredModel === 'gemini-2.5-flash'
                                            ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm'
                                            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-black text-xs">Gemini 2.5 Flash</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold">Google</span>
                                    </div>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Đa năng, tốc độ cao</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setPreferredModel('meta-llama/llama-3.3-70b-instruct:free');
                                        toast.info('Đã chọn ưu tiên mô hình Llama 3.3 70B!');
                                    }}
                                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                                        preferredModel === 'meta-llama/llama-3.3-70b-instruct:free'
                                            ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 text-purple-900 dark:text-purple-100 shadow-sm'
                                            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-purple-400'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-black text-xs">Llama 3.3 70B</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 font-bold">Meta</span>
                                    </div>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Độ chính xác cao, miễn phí</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setPreferredModel('auto');
                                        toast.info('Đã chuyển sang chế độ Tự động luân chuyển mô hình AI!');
                                    }}
                                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                                        preferredModel === 'auto'
                                            ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-500 text-amber-900 dark:text-amber-100 shadow-sm'
                                            : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-amber-400'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-black text-xs">Auto Fallback</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 font-bold">Smart</span>
                                    </div>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Tự động chọn model khả dụng</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Rate Limit History */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                Rate Limit Events (429)
                            </h3>
                            <span className="text-xs font-bold px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                                {rateLimitErrors.length} Logs
                            </span>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {rateLimitErrors.length === 0 ? (
                                <div className="p-10 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">All systems operational</p>
                                    <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">Chưa ghi nhận lỗi quá tải API nào trong phiên làm việc này. Các models đang hoạt động tốt.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-64 overflow-y-auto custom-scrollbar">
                                    {rateLimitErrors.map((err, index) => (
                                        <div key={err.id || index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex gap-4">
                                            <div className="mt-1">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {err.model}
                                                    </p>
                                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                        {new Date(err.time).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {err.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end shrink-0">
                    {showConfirmReset ? (
                        <div className="flex items-center gap-4 animate-in slide-in-from-right-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Are you sure you want to reset all tracking?</span>
                            <button 
                                onClick={() => setShowConfirmReset(false)}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleReset}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-sm transition-colors flex items-center gap-2"
                            >
                                <AlertTriangle className="w-4 h-4" />
                                Yes, Reset
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => setShowConfirmReset(true)}
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors flex items-center gap-2 border border-gray-200 dark:border-gray-700 shadow-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reset Statistics
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

// Simple Sparkles SVG Icon for decoration
function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
