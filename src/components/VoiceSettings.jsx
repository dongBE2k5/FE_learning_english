import { Settings2, Volume2, X } from "lucide-react";

const VoiceSettings = ({ isOpen, onClose, voices, selectedVoice, setSelectedVoice, speechRate, setSpeechRate, globalRandomizeVoice, setGlobalRandomizeVoice }) => {
    if (!isOpen) return null;

    const handleTestVoice = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance("Hello, how are you today?");
        utterance.lang = 'en-US';
        utterance.rate = speechRate;
        if (selectedVoice) {
            const voice = voices.find(v => v.voiceURI === selectedVoice);
            if (voice) utterance.voice = voice;
        }
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200 transition-colors">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Settings2 className="text-blue-500" /> Cài đặt giọng đọc
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Giọng đọc (Voice)</label>
                        <select
                            className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-colors"
                            value={selectedVoice || ''}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            disabled={globalRandomizeVoice}
                        >
                            <optgroup label="Giọng Mỹ (US)">
                                {voices.filter(v => v.lang.startsWith('en-US')).map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Giọng Anh (UK)">
                                {voices.filter(v => v.lang.startsWith('en-GB')).map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Giọng Úc (AU)">
                                {voices.filter(v => v.lang.startsWith('en-AU')).map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Giọng Canada (CA)">
                                {voices.filter(v => v.lang.startsWith('en-CA')).map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Khác">
                                {voices.filter(v => !['en-US', 'en-GB', 'en-AU', 'en-CA'].some(lang => v.lang.startsWith(lang))).map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>
                                ))}
                            </optgroup>
                            {voices.length === 0 && <option value="">Đang tải giọng đọc...</option>}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Tốc độ đọc: {speechRate}x</label>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speechRate}
                            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                            className="w-full accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 mt-1">
                            <span>Chậm</span>
                            <span>Bình thường</span>
                            <span>Nhanh</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl">
                        <input 
                            type="checkbox" 
                            id="global-random-voice-toggle"
                            checked={globalRandomizeVoice}
                            onChange={(e) => setGlobalRandomizeVoice(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <label htmlFor="global-random-voice-toggle" className="text-sm font-bold text-gray-700 dark:text-slate-300 cursor-pointer">
                                Phát ngẫu nhiên giọng chuẩn TOEIC
                            </label>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                (Tự động đổi giọng US, UK, AU, CA khi đọc)
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleTestVoice}
                        className="w-full py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition flex items-center justify-center gap-2"
                    >
                        <Volume2 size={20} /> Nghe thử
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceSettings;
