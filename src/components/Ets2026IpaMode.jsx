import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Volume2, Mic, CheckCircle2, XCircle, ArrowRight, ArrowLeft,
    RefreshCw, Sparkles, Award, Layers, HelpCircle, BookOpen,
    Play, Flame, ShieldAlert, Check, GitCompare, ExternalLink,
    Info, Search, Filter, Headphones, VolumeX, Shuffle, ListFilter,
    BookmarkCheck
} from 'lucide-react';
import IpaGuide from './IpaGuide';

const IPA_CATEGORIES = {
    monophthongs: [
        { symbol: 'iː', name: 'i dài', example: 'see, meet' },
        { symbol: 'ɪ', name: 'i ngắn', example: 'sit, hit' },
        { symbol: 'ʊ', name: 'u ngắn', example: 'put, book' },
        { symbol: 'uː', name: 'u dài', example: 'too, blue' },
        { symbol: 'e', name: 'e ngắn', example: 'bed, head' },
        { symbol: 'ə', name: 'ơ ngắn', example: 'about, teacher' },
        { symbol: 'ɜː', name: 'ơ dài', example: 'bird, work' },
        { symbol: 'ɔː', name: 'o dài', example: 'door, call' },
        { symbol: 'æ', name: 'a bẹt', example: 'cat, apple' },
        { symbol: 'ʌ', name: 'á ngắn', example: 'cup, money' },
        { symbol: 'ɑː', name: 'a dài', example: 'father, car' },
        { symbol: 'ɒ', name: 'o ngắn', example: 'not, rock' },
    ],
    diphthongs: [
        { symbol: 'ɪə', name: 'iơ', example: 'near, here' },
        { symbol: 'eɪ', name: 'êi', example: 'say, make' },
        { symbol: 'ʊə', name: 'uơ', example: 'tour, pure' },
        { symbol: 'ɔɪ', name: 'oi', example: 'boy, voice' },
        { symbol: 'əʊ', name: 'âu', example: 'go, home' },
        { symbol: 'eə', name: 'eơ', example: 'hair, care' },
        { symbol: 'aɪ', name: 'ai', example: 'my, time' },
        { symbol: 'aʊ', name: 'au', example: 'now, out' },
    ],
    consonants: [
        { symbol: 'p', name: 'p', example: 'pen, stop' },
        { symbol: 'b', name: 'b', example: 'bad, job' },
        { symbol: 't', name: 't', example: 'tea, get' },
        { symbol: 'd', name: 'd', example: 'did, head' },
        { symbol: 'tʃ', name: 'ch', example: 'chain, match' },
        { symbol: 'dʒ', name: 'tr (hữu thanh)', example: 'jam, bridge' },
        { symbol: 'k', name: 'k', example: 'key, back' },
        { symbol: 'g', name: 'g', example: 'get, bag' },
        { symbol: 'f', name: 'f', example: 'fall, off' },
        { symbol: 'v', name: 'v', example: 'van, save' },
        { symbol: 'θ', name: 'th (vô thanh)', example: 'thin, both' },
        { symbol: 'ð', name: 'đ (hữu thanh)', example: 'this, mother' },
        { symbol: 's', name: 's', example: 'see, pass' },
        { symbol: 'z', name: 'z', example: 'zoo, easy' },
        { symbol: 'ʃ', name: 's nặng', example: 'shoe, wash' },
        { symbol: 'ʒ', name: 'gi (hữu thanh)', example: 'vision, measure' },
        { symbol: 'm', name: 'm', example: 'man, room' },
        { symbol: 'n', name: 'n', example: 'now, turn' },
        { symbol: 'ŋ', name: 'ng', example: 'sing, finger' },
        { symbol: 'h', name: 'h', example: 'hat, home' },
        { symbol: 'l', name: 'l', example: 'leg, feel' },
        { symbol: 'r', name: 'r', example: 'red, try' },
        { symbol: 'w', name: 'w', example: 'wet, window' },
        { symbol: 'j', name: 'y', example: 'yes, yellow' },
    ]
};

const MINIMAL_PAIRS_DATA = [
    {
        id: 'i_pair',
        title: 'i vs i: (ngắn vs dài)',
        soundA: { symbol: 'ɪ', label: '/ɪ/ (ngắn)', desc: 'Âm i ngắn, dứt khoát, miệng mở nhẹ tự nhiên.' },
        soundB: { symbol: 'iː', label: '/iː/ (dài)', desc: 'Âm i dài, kéo hơi dài hơn, môi kéo căng sang hai bên như đang cười.' },
        words: [
            { en: 'ship', ipa: '/ʃɪp/', vi: 'con tàu', correct: 'A' },
            { en: 'sheep', ipa: '/ʃiːp/', vi: 'con cừu', correct: 'B' },
            { en: 'sit', ipa: '/sɪt/', vi: 'ngồi', correct: 'A' },
            { en: 'seat', ipa: '/siːt/', vi: 'chỗ ngồi', correct: 'B' },
            { en: 'live', ipa: '/lɪv/', vi: 'sống', correct: 'A' },
            { en: 'leave', ipa: '/liːv/', vi: 'rời đi', correct: 'B' },
            { en: 'hit', ipa: '/hɪt/', vi: 'đánh, va chạm', correct: 'A' },
            { en: 'heat', ipa: '/hiːt/', vi: 'sức nóng', correct: 'B' },
            { en: 'fill', ipa: '/fɪl/', vi: 'làm đầy', correct: 'A' },
            { en: 'feel', ipa: '/fiːl/', vi: 'cảm thấy', correct: 'B' },
            { en: 'bit', ipa: '/bɪt/', vi: 'mảnh nhỏ', correct: 'A' },
            { en: 'beat', ipa: '/biːt/', vi: 'đánh bại, nhịp điệu', correct: 'B' }
        ]
    },
    {
        id: 'e_ae_pair',
        title: 'e vs æ (e vs a bẹt)',
        soundA: { symbol: 'e', label: '/e/ (ngắn)', desc: 'Âm e ngắn gọn, môi hơi mở tự nhiên.' },
        soundB: { symbol: 'æ', label: '/æ/ (a bẹt)', desc: 'Âm a bẹt, mở rộng khẩu hình miệng theo chiều dọc và ngang.' },
        words: [
            { en: 'bed', ipa: '/bed/', vi: 'cái giường', correct: 'A' },
            { en: 'bad', ipa: '/bæd/', vi: 'tồi tệ', correct: 'B' },
            { en: 'men', ipa: '/men/', vi: 'những đàn ông', correct: 'A' },
            { en: 'man', ipa: '/mæn/', vi: 'người đàn ông', correct: 'B' },
            { en: 'send', ipa: '/send/', vi: 'gửi đi', correct: 'A' },
            { en: 'sand', ipa: '/sænd/', vi: 'bãi cát', correct: 'B' },
            { en: 'head', ipa: '/hed/', vi: 'cái đầu', correct: 'A' },
            { en: 'had', ipa: '/hæd/', vi: 'đã có', correct: 'B' },
            { en: 'pen', ipa: '/pen/', vi: 'cái bút', correct: 'A' },
            { en: 'pan', ipa: '/pæn/', vi: 'cái chảo', correct: 'B' }
        ]
    },
    {
        id: 'u_pair',
        title: 'ʊ vs u: (u ngắn vs u dài)',
        soundA: { symbol: 'ʊ', label: '/ʊ/ (ngắn)', desc: 'Âm u ngắn, môi hơi tròn thả lỏng.' },
        soundB: { symbol: 'uː', label: '/uː/ (dài)', desc: 'Âm u dài, môi tròn hướng ra trước, hơi kéo dài.' },
        words: [
            { en: 'full', ipa: '/fʊl/', vi: 'đầy đủ', correct: 'A' },
            { en: 'fool', ipa: '/fuːl/', vi: 'ngốc nghếch', correct: 'B' },
            { en: 'pull', ipa: '/pʊl/', vi: 'kéo về', correct: 'A' },
            { en: 'pool', ipa: '/puːl/', vi: 'hồ bơi', correct: 'B' },
            { en: 'look', ipa: '/lʊk/', vi: 'nhìn ngắm', correct: 'A' },
            { en: 'Luke', ipa: '/luːk/', vi: 'tên riêng Luke', correct: 'B' },
            { en: 'good', ipa: '/ɡʊd/', vi: 'tốt đẹp', correct: 'A' },
            { en: 'food', ipa: '/fuːd/', vi: 'thức ăn', correct: 'B' }
        ]
    },
    {
        id: 's_sh_pair',
        title: 's vs ʃ (s nhẹ vs s nặng)',
        soundA: { symbol: 's', label: '/s/ (nhẹ)', desc: 'Âm s nhẹ, hai răng gần chạm nhau, thổi luồng hơi qua kẽ răng.' },
        soundB: { symbol: 'ʃ', label: '/ʃ/ (nặng)', desc: 'Âm s nặng, tròn môi chu ra trước, đẩy hơi khè mạnh.' },
        words: [
            { en: 'see', ipa: '/siː/', vi: 'nhìn thấy', correct: 'A' },
            { en: 'she', ipa: '/ʃiː/', vi: 'cô ấy', correct: 'B' },
            { en: 'seat', ipa: '/siːt/', vi: 'chỗ ngồi', correct: 'A' },
            { en: 'sheet', ipa: '/ʃiːt/', vi: 'tờ giấy, ga trải giường', correct: 'B' },
            { en: 'save', ipa: '/seɪv/', vi: 'lưu trữ, cứu trợ', correct: 'A' },
            { en: 'shave', ipa: '/ʃeɪv/', vi: 'cạo râu', correct: 'B' },
            { en: 'sign', ipa: '/saɪn/', vi: 'ký tên, biển báo', correct: 'A' },
            { en: 'shine', ipa: '/ʃaɪn/', vi: 'tỏa sáng', correct: 'B' }
        ]
    },
    {
        id: 'th_pair',
        title: 'θ vs ð (th vô thanh vs hữu thanh)',
        soundA: { symbol: 'θ', label: '/θ/ (vô thanh)', desc: 'Đặt đầu lưỡi giữa hai hàm răng, thổi hơi nhẹ ra không rung cổ họng.' },
        soundB: { symbol: 'ð', label: '/ð/ (hữu thanh)', desc: 'Đặt đầu lưỡi giữa hai hàm răng, phát âm rung dây thanh quản.' },
        words: [
            { en: 'think', ipa: '/θɪŋk/', vi: 'suy nghĩ', correct: 'A' },
            { en: 'this', ipa: '/ðɪs/', vi: 'cái này', correct: 'B' },
            { en: 'thank', ipa: '/θæŋk/', vi: 'cảm ơn', correct: 'A' },
            { en: 'that', ipa: '/ðæt/', vi: 'cái kia', correct: 'B' },
            { en: 'both', ipa: '/bəʊθ/', vi: 'cả hai', correct: 'A' },
            { en: 'bother', ipa: '/ˈbɑː.ðɚ/', vi: 'làm phiền', correct: 'B' },
            { en: 'breath', ipa: '/breθ/', vi: 'hơi thở (danh từ)', correct: 'A' },
            { en: 'breathe', ipa: '/briːð/', vi: 'hít thở (động từ)', correct: 'B' }
        ]
    },
    {
        id: 'l_r_pair',
        title: 'l vs r (l vs r)',
        soundA: { symbol: 'l', label: '/l/', desc: 'Đầu lưỡi chạm nướu răng trên, âm thoát qua hai bên sườn lưỡi.' },
        soundB: { symbol: 'r', label: '/r/', desc: 'Đầu lưỡi cuộn về phía sau cong lên nhưng không chạm nướu, môi hơi tròn.' },
        words: [
            { en: 'light', ipa: '/laɪt/', vi: 'ánh sáng', correct: 'A' },
            { en: 'right', ipa: '/raɪt/', vi: 'bên phải, đúng', correct: 'B' },
            { en: 'long', ipa: '/lɒŋ/', vi: 'dài', correct: 'A' },
            { en: 'wrong', ipa: '/rɒŋ/', vi: 'sai', correct: 'B' },
            { en: 'lock', ipa: '/lɒk/', vi: 'khóa', correct: 'A' },
            { en: 'rock', ipa: '/rɒk/', vi: 'tảng đá', correct: 'B' },
            { en: 'lead', ipa: '/liːd/', vi: 'dẫn dắt', correct: 'A' },
            { en: 'read', ipa: '/riːd/', vi: 'đọc', correct: 'B' }
        ]
    }
];

const Ets2026IpaMode = ({ words = [], allWords = [], speak, onExit }) => {
    // 1. TỔNG HỢP & LỌC KHO TỪ VỰNG ETS 2026
    const sourceWords = useMemo(() => {
        if (allWords && allWords.length > 0) return allWords;
        return words || [];
    }, [words, allWords]);

    const etsWordsPool = useMemo(() => {
        const filtered = sourceWords.filter(w =>
            w.master_group === 'Từ Vựng ETS 2026' ||
            (w.sub_group && w.sub_group.includes('ETS 2026')) ||
            w.unit === 2026
        );
        // Nếu không có tag cụ thể, sử dụng danh sách words hiện tại làm kho mặc định
        return filtered.length > 0 ? filtered : (words.length > 0 ? words : sourceWords);
    }, [sourceWords, words]);

    // Các bộ lọc con cho ETS 2026
    const [skillGroup, setSkillGroup] = useState('all'); // 'all' | 'lc' | 'rc'
    const [subGroup, setSubGroup] = useState('all'); // 'all' | 'Test 01 LC' | 'Part 1' ...
    const [searchQuery, setSearchQuery] = useState('');

    const lcWords = useMemo(() => {
        return etsWordsPool.filter(w => w.sub_group && (w.sub_group.toLowerCase().includes('lc') || w.sub_group.toLowerCase().includes('listening')));
    }, [etsWordsPool]);

    const rcWords = useMemo(() => {
        return etsWordsPool.filter(w => w.sub_group && (w.sub_group.toLowerCase().includes('rc') || w.sub_group.toLowerCase().includes('reading')));
    }, [etsWordsPool]);

    const lcSubGroups = useMemo(() => {
        const set = new Set();
        lcWords.forEach(w => w.sub_group && set.add(w.sub_group));
        return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }, [lcWords]);

    const rcSubGroups = useMemo(() => {
        const set = new Set();
        rcWords.forEach(w => w.sub_group && set.add(w.sub_group));
        return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }, [rcWords]);

    const allSubGroups = useMemo(() => {
        const set = new Set();
        etsWordsPool.forEach(w => w.sub_group && set.add(w.sub_group));
        return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }, [etsWordsPool]);

    // Khi thay đổi nhóm Kỹ năng thì reset subGroup về 'all'
    const handleSkillGroupChange = (group) => {
        setSkillGroup(group);
        setSubGroup('all');
    };

    const filteredWords = useMemo(() => {
        let list = etsWordsPool;
        if (skillGroup === 'lc') {
            list = subGroup === 'all' ? lcWords : lcWords.filter(w => w.sub_group === subGroup);
        } else if (skillGroup === 'rc') {
            list = subGroup === 'all' ? rcWords : rcWords.filter(w => w.sub_group === subGroup);
        } else {
            if (subGroup !== 'all') {
                list = list.filter(w => w.sub_group === subGroup);
            }
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(w =>
                (w.en && w.en.toLowerCase().includes(q)) ||
                (w.vi && w.vi.toLowerCase().includes(q)) ||
                (w.ipa && w.ipa.toLowerCase().includes(q))
            );
        }
        return list;
    }, [etsWordsPool, skillGroup, subGroup, lcWords, rcWords, searchQuery]);

    // Danh sách từ có phiên âm IPA hợp lệ để phục vụ Quiz & Speech & Chart
    const ipaWords = useMemo(() => {
        return filteredWords.filter(w => w.ipa && w.ipa.trim().length > 0 && w.en);
    }, [filteredWords]);

    const [activeTab, setActiveTab] = useState('pairs'); // 'pairs' | 'quiz' | 'speech' | 'chart'

    // MINIMAL PAIRS QUIZ STATE
    const [selectedPairIndex, setSelectedPairIndex] = useState(0);
    const [pairWordIndex, setPairWordIndex] = useState(0);
    const [pairAnswered, setPairAnswered] = useState(false);
    const [selectedPairChoice, setSelectedPairChoice] = useState(null); // 'A' | 'B'
    const [showPairInfoModal, setShowPairInfoModal] = useState(false);

    // QUIZ STATE
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizMode, setQuizMode] = useState('ipa2word'); // 'ipa2word' | 'word2ipa' | 'audio2ipa'
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [streak, setStreak] = useState(0);
    const [score, setScore] = useState({ correct: 0, total: 0 });

    // SPEECH PRACTICE STATE
    const [speechIndex, setSpeechIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [speechResult, setSpeechResult] = useState(null); // null | 'correct' | 'wrong'
    const [spokenCorrectSet, setSpokenCorrectSet] = useState(new Set());
    const recognitionRef = useRef(null);

    // CHART FILTER STATE
    const [selectedIpaSymbol, setSelectedIpaSymbol] = useState('æ');

    // Web Audio subtle sound
    const playSound = (isSuccess) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = isSuccess ? 'sine' : 'sawtooth';
            const freq = isSuccess ? 660 : 220;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            if (isSuccess) {
                osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
            }
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch (e) {}
    };

    // GENERATE QUIZ OPTIONS
    const generateQuizOptions = (currentIndex) => {
        if (ipaWords.length === 0) return;
        const current = ipaWords[currentIndex % ipaWords.length];
        const otherWords = ipaWords.filter((_, idx) => idx !== (currentIndex % ipaWords.length));

        const shuffled = [...otherWords].sort(() => Math.random() - 0.5);
        const distractors = shuffled.slice(0, 3);
        const fullOptions = [...distractors, current].sort(() => Math.random() - 0.5);

        setOptions(fullOptions);
        setSelectedOption(null);
        setIsAnswered(false);

        // Nếu chế độ là Audio to IPA, tự động phát âm khi chuyển câu
        if (quizMode === 'audio2ipa' && speak && current.en) {
            setTimeout(() => {
                speak(current.en);
            }, 250);
        }
    };

    useEffect(() => {
        if (ipaWords.length > 0) {
            generateQuizOptions(quizIndex);
        }
    }, [quizIndex, quizMode, ipaWords]);

    // Reset chỉ số khi bộ lọc thay đổi
    useEffect(() => {
        setQuizIndex(0);
        setSpeechIndex(0);
        setPairWordIndex(0);
        setPairAnswered(false);
        setSelectedPairChoice(null);
    }, [skillGroup, subGroup]);

    const currentPairObj = MINIMAL_PAIRS_DATA[selectedPairIndex] || MINIMAL_PAIRS_DATA[0];
    const currentPairWords = currentPairObj.words || [];
    const currentPairWord = currentPairWords[pairWordIndex % currentPairWords.length] || {};

    // Tìm các từ vựng ETS 2026 thực tế trong ipaWords chứa âm A và âm B của cặp âm hiện tại
    const etsPairsMatched = useMemo(() => {
        if (!currentPairObj) return { listA: [], listB: [] };
        const symA = currentPairObj.soundA.symbol;
        const symB = currentPairObj.soundB.symbol;

        const listA = ipaWords.filter(w => w.ipa && w.ipa.includes(symA)).slice(0, 8);
        const listB = ipaWords.filter(w => w.ipa && w.ipa.includes(symB)).slice(0, 8);
        return { listA, listB };
    }, [currentPairObj, ipaWords]);

    const handleSelectPairChoice = (choice) => {
        if (pairAnswered) return;
        setSelectedPairChoice(choice);
        setPairAnswered(true);

        const isCorrect = choice === currentPairWord.correct;
        if (isCorrect) {
            playSound(true);
            setStreak(prev => prev + 1);
        } else {
            playSound(false);
            setStreak(0);
        }
        if (speak && currentPairWord.en) {
            speak(currentPairWord.en);
        }
    };

    const handleNextPairWord = () => {
        setPairAnswered(false);
        setSelectedPairChoice(null);
        setPairWordIndex(prev => (prev + 1) % currentPairWords.length);
    };

    const currentQuizWord = ipaWords[quizIndex % ipaWords.length] || {};
    const currentSpeechWord = ipaWords[speechIndex % ipaWords.length] || {};

    // HANDLE QUIZ OPTION SELECT
    const handleSelectOption = (opt) => {
        if (isAnswered) return;
        setSelectedOption(opt);
        setIsAnswered(true);

        const correct = opt.id === currentQuizWord.id || opt.en === currentQuizWord.en;
        if (correct) {
            playSound(true);
            setStreak(prev => prev + 1);
            setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
            if (speak) speak(currentQuizWord.en);
        } else {
            playSound(false);
            setStreak(0);
            setScore(prev => ({ ...prev, total: prev.total + 1 }));
        }
    };

    const handleNextQuiz = () => {
        setQuizIndex(prev => (prev + 1) % ipaWords.length);
    };

    // START SPEECH RECOGNITION
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Trình duyệt của bạn không hỗ trợ tính năng nhận diện giọng nói. Vui lòng dùng trình duyệt Chrome hoặc Edge!');
            return;
        }

        const recog = new SpeechRecognition();
        recog.lang = 'en-US';
        recog.interimResults = false;
        recog.maxAlternatives = 1;

        recog.onstart = () => {
            setIsListening(true);
            setSpokenText('');
            setSpeechResult(null);
        };

        recog.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            setSpokenText(transcript);
            const targetWord = (currentSpeechWord.en || '').trim().toLowerCase();

            if (transcript === targetWord || targetWord.includes(transcript) || transcript.includes(targetWord)) {
                setSpeechResult('correct');
                playSound(true);
                setSpokenCorrectSet(prev => new Set(prev).add(currentSpeechWord.en || currentSpeechWord.id));
            } else {
                setSpeechResult('wrong');
                playSound(false);
            }
            setIsListening(false);
        };

        recog.onerror = () => {
            setIsListening(false);
        };

        recog.onend = () => {
            setIsListening(false);
        };

        recog.start();
        recognitionRef.current = recog;
    };

    const handleNextSpeechWord = () => {
        setSpeechIndex(prev => (prev + 1) % ipaWords.length);
        setSpokenText('');
        setSpeechResult(null);
    };

    // FILTER WORDS BY SELECTED IPA SYMBOL
    const wordsMatchingSymbol = useMemo(() => {
        return ipaWords.filter(w => w.ipa && w.ipa.includes(selectedIpaSymbol));
    }, [ipaWords, selectedIpaSymbol]);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header / Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 rounded-3xl shadow-lg">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            <Headphones size={13} /> ETS 2026 Pronunciation & IPA Mastery
                        </span>
                        {streak > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black flex items-center gap-1">
                                <Flame size={14} className="fill-amber-400" /> Streak: {streak}
                            </span>
                        )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                        Chuyên Đề Luyện Phát Âm & IPA Chuẩn ETS 2026
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-200 mt-1">
                        Hệ thống phát âm chuẩn bản xứ, phân biệt cặp âm dễ nhầm lẫn và nhận diện AI cho đề thi TOEIC Listening
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {onExit && (
                        <button
                            onClick={onExit}
                            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                        >
                            <ArrowLeft size={16} /> Thoát chuyên đề
                        </button>
                    )}
                </div>
            </div>

            {/* ========================================================= */}
            {/* THANH BỘ LỌC KHO TỪ VỰNG ETS 2026 (LC / RC / PART) */}
            {/* ========================================================= */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5 mr-1">
                            <Filter size={15} className="text-indigo-600" /> Chọn Nhóm Từ ETS 2026:
                        </span>

                        <button
                            onClick={() => handleSkillGroupChange('all')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                skillGroup === 'all'
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200'
                            }`}
                        >
                            <Layers size={14} /> Tất Cả ({etsWordsPool.length})
                        </button>

                        <button
                            onClick={() => handleSkillGroupChange('lc')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                skillGroup === 'lc'
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200'
                            }`}
                        >
                            <Headphones size={14} /> Listening LC ({lcWords.length})
                        </button>

                        <button
                            onClick={() => handleSkillGroupChange('rc')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                skillGroup === 'rc'
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200'
                            }`}
                        >
                            <BookOpen size={14} /> Reading RC ({rcWords.length})
                        </button>
                    </div>

                    <div className="relative flex-1 min-w-[220px] max-w-sm">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm từ vựng / phiên âm IPA trong nhóm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 text-xs font-bold text-gray-800 dark:text-slate-200 focus:outline-none transition"
                        />
                    </div>
                </div>

                {/* SubGroup selector pills (e.g. Test 01 LC, Part 1...) */}
                {(skillGroup === 'lc' ? lcSubGroups : skillGroup === 'rc' ? rcSubGroups : allSubGroups).length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-slate-800/60">
                        <span className="text-[11px] font-bold text-gray-400 mr-1.5">Phần/Test:</span>
                        <button
                            onClick={() => setSubGroup('all')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                                subGroup === 'all'
                                    ? 'bg-gray-800 dark:bg-slate-200 text-white dark:text-slate-900 font-black'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'
                            }`}
                        >
                            Tất Cả
                        </button>
                        {(skillGroup === 'lc' ? lcSubGroups : skillGroup === 'rc' ? rcSubGroups : allSubGroups).map((part, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSubGroup(part)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                                    subGroup === part
                                        ? 'bg-indigo-600 text-white font-black shadow-xs'
                                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'
                                }`}
                            >
                                {part}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 pt-1">
                    <span>
                        Đang luyện tập trên <strong className="text-indigo-600 dark:text-indigo-400">{filteredWords.length}</strong> từ vựng ETS 2026 ({ipaWords.length} từ có phiên âm IPA).
                    </span>
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-rose-500 font-bold hover:underline">
                            Xóa tìm kiếm
                        </button>
                    )}
                </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-100 dark:bg-slate-800/80 p-2 rounded-2xl">
                <button
                    onClick={() => setActiveTab('pairs')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                        activeTab === 'pairs'
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    <GitCompare size={18} />
                    <span>Phân Biệt Cặp Âm</span>
                </button>

                <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                        activeTab === 'quiz'
                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    <Award size={18} />
                    <span>Trắc Nghiệm IPA</span>
                </button>

                <button
                    onClick={() => setActiveTab('speech')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                        activeTab === 'speech'
                            ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                            : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    <Mic size={18} />
                    <span>Luyện Nói & AI Chấm</span>
                </button>

                <button
                    onClick={() => setActiveTab('chart')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                        activeTab === 'chart'
                            ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                            : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    <BookOpen size={18} />
                    <span>Bảng 44 Âm & Lọc Từ</span>
                </button>
            </div>

            {/* ========================================================= */}
            {/* TAB 1: PHÂN BIỆT CẶP ÂM (MINIMAL PAIRS QUIZ & ETS MATCH) */}
            {/* ========================================================= */}
            {activeTab === 'pairs' && (
                <div className="space-y-6">
                    {/* Pair selector pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {MINIMAL_PAIRS_DATA.map((pair, idx) => (
                            <button
                                key={pair.id}
                                onClick={() => {
                                    setSelectedPairIndex(idx);
                                    setPairWordIndex(0);
                                    setPairAnswered(false);
                                    setSelectedPairChoice(null);
                                    setShowPairInfoModal(false);
                                }}
                                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition cursor-pointer border ${
                                    selectedPairIndex === idx
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                                        : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-800 hover:border-indigo-400'
                                }`}
                            >
                                {pair.title}
                            </button>
                        ))}
                    </div>

                    {/* Dark Minimal Pair Interactive Card */}
                    <div className="bg-[#18181b] dark:bg-[#121215] text-white border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 max-w-3xl mx-auto">
                        <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                            <span>Câu {pairWordIndex + 1} / {currentPairWords.length}</span>
                            <button
                                onClick={() => speak && currentPairWord.en && speak(currentPairWord.en)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                            >
                                <Volume2 size={16} /> Nghe phát âm
                            </button>
                        </div>

                        {/* Big word heading */}
                        <div className="space-y-1">
                            <h3 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                                {currentPairWord.en}
                            </h3>
                            <p className="text-lg sm:text-xl font-mono text-gray-400">
                                {currentPairWord.ipa}
                            </p>
                        </div>

                        <p className="text-sm font-semibold text-gray-300">
                            Từ <span className="font-bold text-indigo-400">'{currentPairWord.en}'</span> ({currentPairWord.vi}) dùng âm nào?
                        </p>

                        {/* Two choices side by side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {/* Choice A */}
                            <button
                                onClick={() => handleSelectPairChoice('A')}
                                disabled={pairAnswered}
                                className={`p-5 rounded-2xl border font-bold text-lg text-left transition cursor-pointer flex items-center justify-between ${
                                    !pairAnswered
                                        ? 'bg-[#27272a] hover:bg-[#3f3f46] border-gray-700 text-white'
                                        : currentPairWord.correct === 'A'
                                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg'
                                            : selectedPairChoice === 'A'
                                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                                : 'bg-[#27272a] border-gray-700 text-gray-500'
                                }`}
                            >
                                <span>{currentPairObj.soundA.label}</span>
                                {pairAnswered && currentPairWord.correct === 'A' && <CheckCircle2 className="text-emerald-400" size={22} />}
                                {pairAnswered && selectedPairChoice === 'A' && currentPairWord.correct !== 'A' && <XCircle className="text-rose-400" size={22} />}
                            </button>

                            {/* Choice B */}
                            <button
                                onClick={() => handleSelectPairChoice('B')}
                                disabled={pairAnswered}
                                className={`p-5 rounded-2xl border font-bold text-lg text-left transition cursor-pointer flex items-center justify-between ${
                                    !pairAnswered
                                        ? 'bg-[#27272a] hover:bg-[#3f3f46] border-gray-700 text-white'
                                        : currentPairWord.correct === 'B'
                                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg'
                                            : selectedPairChoice === 'B'
                                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                                : 'bg-[#27272a] border-gray-700 text-gray-500'
                                }`}
                            >
                                <span>{currentPairObj.soundB.label}</span>
                                {pairAnswered && currentPairWord.correct === 'B' && <CheckCircle2 className="text-emerald-400" size={22} />}
                                {pairAnswered && selectedPairChoice === 'B' && currentPairWord.correct !== 'B' && <XCircle className="text-rose-400" size={22} />}
                            </button>
                        </div>

                        {/* After answered: Next button */}
                        {pairAnswered && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800 animate-fade-in">
                                <div className="text-xs sm:text-sm font-semibold">
                                    {selectedPairChoice === currentPairWord.correct ? (
                                        <span className="text-emerald-400 font-black flex items-center gap-1.5">
                                            <Check size={18} /> Chính xác! "{currentPairWord.en}" thuộc âm {currentPairWord.correct === 'A' ? currentPairObj.soundA.label : currentPairObj.soundB.label}.
                                        </span>
                                    ) : (
                                        <span className="text-rose-400 font-bold">
                                            Chưa đúng, "{currentPairWord.en}" phát âm theo {currentPairWord.correct === 'A' ? currentPairObj.soundA.label : currentPairObj.soundB.label}.
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={handleNextPairWord}
                                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
                                >
                                    <span>Câu Tiếp Theo</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom link: Hỏi thêm về cặp âm này ↗ */}
                    <div className="max-w-3xl mx-auto text-center">
                        <button
                            onClick={() => setShowPairInfoModal(!showPairInfoModal)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-200/80 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                        >
                            <span>Hỏi thêm về cách phân biệt cặp âm này</span>
                            <ExternalLink size={14} />
                        </button>

                        {showPairInfoModal && (
                            <div className="mt-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 shadow-md space-y-3 text-xs sm:text-sm text-left animate-fade-in">
                                <div className="font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-base">
                                    <Info size={18} /> Cách phân biệt {currentPairObj.title}:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        <div className="font-black text-blue-700 dark:text-blue-300 mb-1">{currentPairObj.soundA.label}</div>
                                        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{currentPairObj.soundA.desc}</p>
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                        <div className="font-black text-purple-700 dark:text-purple-300 mb-1">{currentPairObj.soundB.label}</div>
                                        <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{currentPairObj.soundB.desc}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ========================================================= */}
                    {/* TÍCH HỢP TỪ VỰNG ETS 2026 CHỨA CẶP ÂM ĐANG CHỌN */}
                    {/* ========================================================= */}
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-slate-800 pb-4">
                            <div>
                                <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="text-indigo-600" size={18} />
                                    <span>Từ vựng ETS 2026 trong bài thi thực tế có chứa cặp âm {currentPairObj.title}</span>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                                    Lắng nghe sự khác biệt phát âm của chính các từ vựng TOEIC bạn đang học
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Cột A */}
                            <div className="space-y-3">
                                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/60 font-black text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between">
                                    <span>Nhóm từ ETS chứa âm {currentPairObj.soundA.label}</span>
                                    <span className="px-2 py-0.5 rounded-md bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100">{etsPairsMatched.listA.length} từ</span>
                                </div>

                                {etsPairsMatched.listA.length === 0 ? (
                                    <div className="p-4 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 text-center text-xs text-gray-400">
                                        Chưa có từ nào trong phần/Test đang chọn chứa âm /{currentPairObj.soundA.symbol}/. Hãy chọn nhóm Tất Cả LC/RC ở trên để xem nhiều hơn!
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                        {etsPairsMatched.listA.map((w, idx) => (
                                            <div key={idx} className="p-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-2">
                                                <div className="min-w-0">
                                                    <div className="font-black text-sm text-gray-900 dark:text-white truncate">{w.en}</div>
                                                    <div className="font-mono text-xs text-blue-600 dark:text-blue-400">{w.ipa}</div>
                                                    <div className="text-xs text-gray-500 dark:text-slate-400 truncate">{w.vi}</div>
                                                </div>
                                                <button
                                                    onClick={() => speak && speak(w.en)}
                                                    className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-200 transition cursor-pointer"
                                                >
                                                    <Volume2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cột B */}
                            <div className="space-y-3">
                                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/60 font-black text-xs text-purple-700 dark:text-purple-300 flex items-center justify-between">
                                    <span>Nhóm từ ETS chứa âm {currentPairObj.soundB.label}</span>
                                    <span className="px-2 py-0.5 rounded-md bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100">{etsPairsMatched.listB.length} từ</span>
                                </div>

                                {etsPairsMatched.listB.length === 0 ? (
                                    <div className="p-4 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 text-center text-xs text-gray-400">
                                        Chưa có từ nào trong phần/Test đang chọn chứa âm /{currentPairObj.soundB.symbol}/. Hãy chọn nhóm Tất Cả LC/RC ở trên để xem nhiều hơn!
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                        {etsPairsMatched.listB.map((w, idx) => (
                                            <div key={idx} className="p-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-2">
                                                <div className="min-w-0">
                                                    <div className="font-black text-sm text-gray-900 dark:text-white truncate">{w.en}</div>
                                                    <div className="font-mono text-xs text-purple-600 dark:text-purple-400">{w.ipa}</div>
                                                    <div className="text-xs text-gray-500 dark:text-slate-400 truncate">{w.vi}</div>
                                                </div>
                                                <button
                                                    onClick={() => speak && speak(w.en)}
                                                    className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 hover:bg-purple-200 transition cursor-pointer"
                                                >
                                                    <Volume2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: TRẮC NGHIỆM PHIÊN ÂM IPA ETS 2026 */}
            {/* ========================================================= */}
            {activeTab === 'quiz' && (
                <div className="space-y-6">
                    {ipaWords.length < 2 ? (
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto">
                            <ShieldAlert size={48} className="text-amber-500 mx-auto" />
                            <h3 className="text-lg font-black text-gray-800 dark:text-white">Không đủ dữ liệu câu hỏi trong phần đang chọn</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                Nhóm từ hoặc Test bạn đang lọc chỉ có {ipaWords.length} từ có phiên âm IPA. Vui lòng chọn nhóm "Tất Cả ETS 2026" hoặc nhóm LC/RC có nhiều từ hơn trên thanh bộ lọc phía trên để luyện trắc nghiệm!
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Quiz Controls Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500 dark:text-slate-400 mr-1">
                                        Chế độ trắc nghiệm:
                                    </span>
                                    <button
                                        onClick={() => setQuizMode('ipa2word')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                                            quizMode === 'ipa2word'
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'
                                        }`}
                                    >
                                        Nhìn Phiên Âm ➔ Chọn Từ
                                    </button>
                                    <button
                                        onClick={() => setQuizMode('word2ipa')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                                            quizMode === 'word2ipa'
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'
                                        }`}
                                    >
                                        Nhìn Từ ➔ Chọn Phiên Âm
                                    </button>
                                    <button
                                        onClick={() => setQuizMode('audio2ipa')}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                                            quizMode === 'audio2ipa'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Headphones size={13} /> Nghe Audio ➔ Chọn IPA Chuẩn
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuizIndex(Math.floor(Math.random() * ipaWords.length))}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer"
                                        title="Đảo câu hỏi ngẫu nhiên"
                                    >
                                        <Shuffle size={14} /> Đảo câu
                                    </button>
                                    <div className="text-xs font-bold text-gray-600 dark:text-slate-300">
                                        Điểm: <span className="text-blue-600 dark:text-blue-400 font-black">{score.correct}</span> / {score.total}
                                    </div>
                                </div>
                            </div>

                            {/* Question Card */}
                            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6 max-w-4xl mx-auto">
                                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3.5 py-1.5 rounded-full inline-block">
                                    Câu hỏi #{quizIndex + 1} / {ipaWords.length}
                                </span>

                                {quizMode === 'ipa2word' && (
                                    <div className="space-y-3">
                                        <h3 className="text-4xl sm:text-5xl font-mono font-black text-blue-600 dark:text-blue-400">
                                            {currentQuizWord.ipa}
                                        </h3>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => speak && speak(currentQuizWord.en)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
                                            >
                                                <Volume2 size={16} /> Nghe phát âm mẫu
                                            </button>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
                                            Nghĩa tiếng Việt: <span className="font-bold text-gray-800 dark:text-slate-200">{currentQuizWord.vi}</span>
                                        </p>
                                    </div>
                                )}

                                {quizMode === 'word2ipa' && (
                                    <div className="space-y-3">
                                        <h3 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                                            {currentQuizWord.en}
                                        </h3>
                                        <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
                                            Nghĩa: <span className="font-bold text-purple-600 dark:text-purple-400">{currentQuizWord.vi}</span>
                                        </p>
                                    </div>
                                )}

                                {quizMode === 'audio2ipa' && (
                                    <div className="space-y-4 py-4">
                                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                                            <Headphones size={40} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white">
                                                Lắng Nghe Phát Âm Từ Vựng ETS 2026
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                                Chọn phiên âm IPA đúng với từ tiếng Anh bạn vừa nghe được
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => speak && speak(currentQuizWord.en)}
                                            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition cursor-pointer inline-flex items-center gap-2"
                                        >
                                            <Volume2 size={18} /> Nhấn Để Nghe Lại Phát Âm
                                        </button>
                                    </div>
                                )}

                                {/* Options Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4">
                                    {options.map((opt, idx) => {
                                        const isCorrectOpt = opt.id === currentQuizWord.id || opt.en === currentQuizWord.en;
                                        const isSelected = selectedOption && selectedOption.id === opt.id;

                                        let btnStyle = 'bg-gray-50 dark:bg-slate-800/80 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:border-blue-500';
                                        if (isAnswered) {
                                            if (isCorrectOpt) {
                                                btnStyle = 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-md';
                                            } else if (isSelected) {
                                                btnStyle = 'bg-rose-50 dark:bg-rose-900/30 border-rose-500 text-rose-700 dark:text-rose-300';
                                            }
                                        }

                                        let optionLabel = opt.ipa;
                                        if (quizMode === 'ipa2word') {
                                            optionLabel = opt.en;
                                        } else if (quizMode === 'audio2ipa') {
                                            optionLabel = `${opt.ipa} (${opt.en})`;
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelectOption(opt)}
                                                disabled={isAnswered}
                                                className={`p-5 rounded-2xl border-2 text-left font-bold transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                                            >
                                                <div>
                                                    <span className="text-xs text-gray-400 mr-2 font-mono">
                                                        {String.fromCharCode(65 + idx)}.
                                                    </span>
                                                    <span className={quizMode === 'ipa2word' ? 'text-lg font-black' : 'text-base font-mono'}>
                                                        {optionLabel}
                                                    </span>
                                                </div>
                                                {isAnswered && isCorrectOpt && <CheckCircle2 className="text-emerald-500" size={20} />}
                                                {isAnswered && isSelected && !isCorrectOpt && <XCircle className="text-rose-500" size={20} />}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Explanation & Next button */}
                                {isAnswered && (
                                    <div className="pt-4 max-w-xl mx-auto space-y-4 animate-fade-in">
                                        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 text-left space-y-3">
                                            <div className="text-xs font-black uppercase text-blue-600 dark:text-blue-300">
                                                Giải thích phát âm & từng âm IPA chuẩn:
                                            </div>
                                            <div className="font-bold text-base text-gray-900 dark:text-white flex items-center justify-between">
                                                <div>
                                                    <span className="text-blue-600 dark:text-blue-400 font-black">{currentQuizWord.en}</span>
                                                    <span className="font-mono text-gray-500 dark:text-slate-400 ml-2">({currentQuizWord.ipa})</span>
                                                </div>
                                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{currentQuizWord.vi}</span>
                                            </div>
                                            <div className="pt-1">
                                                <IpaGuide ipa={currentQuizWord.ipa} />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleNextQuiz}
                                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center justify-center gap-2 mx-auto"
                                        >
                                            <span>Câu Tiếp Theo</span>
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: SPEECH PRONUNCIATION PRACTICE */}
            {/* ========================================================= */}
            {activeTab === 'speech' && (
                <div className="space-y-6">
                    {ipaWords.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto">
                            <ShieldAlert size={48} className="text-amber-500 mx-auto" />
                            <h3 className="text-lg font-black text-gray-800 dark:text-white">Không có từ vựng nào trong bộ lọc này</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                Vui lòng chọn nhóm "Tất Cả ETS 2026" hoặc nhóm khác ở trên thanh điều hướng để luyện nói!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-8 max-w-4xl mx-auto">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3.5 py-1.5 rounded-full">
                                        Luyện Đọc & Chấm Điểm AI #{speechIndex + 1} / {ipaWords.length}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSpeechIndex(prev => (prev - 1 + ipaWords.length) % ipaWords.length);
                                                setSpokenText('');
                                                setSpeechResult(null);
                                            }}
                                            className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                                            title="Từ trước"
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                        <button
                                            onClick={handleNextSpeechWord}
                                            className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                                            title="Từ tiếp theo"
                                        >
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
                                        {currentSpeechWord.en}
                                    </h3>
                                    <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
                                        {currentSpeechWord.ipa}
                                    </div>
                                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                        {currentSpeechWord.vi}
                                    </p>

                                    <div className="flex justify-center pt-2">
                                        <button
                                            onClick={() => speak && speak(currentSpeechWord.en)}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm hover:bg-blue-100 transition cursor-pointer shadow-sm"
                                        >
                                            <Volume2 size={18} /> Nghe Giọng Chuẩn Bản Xứ
                                        </button>
                                    </div>

                                    <div className="max-w-md mx-auto pt-2">
                                        <IpaGuide ipa={currentSpeechWord.ipa} />
                                    </div>
                                </div>

                                {/* Recording Action Box */}
                                <div className="max-w-lg mx-auto p-6 rounded-3xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 space-y-4">
                                    <button
                                        onClick={startListening}
                                        disabled={isListening}
                                        className={`w-full py-4 rounded-2xl font-black text-base shadow-lg transition flex items-center justify-center gap-3 cursor-pointer ${
                                            isListening
                                                ? 'bg-rose-500 text-white animate-pulse'
                                                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:scale-[1.02]'
                                        }`}
                                    >
                                        <Mic size={24} />
                                        <span>{isListening ? 'Đang Lắng Nghe Bạn Đọc...' : 'Nhấn Để Nhận Diện Giọng Nói 🎙️'}</span>
                                    </button>

                                    {spokenText && (
                                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-semibold">
                                            <span className="text-gray-400 text-xs block mb-1">AI Nghe Được Bạn Đọc:</span>
                                            <span className="text-lg font-black text-gray-900 dark:text-white">"{spokenText}"</span>
                                        </div>
                                    )}

                                    {speechResult === 'correct' && (
                                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-500 text-emerald-700 dark:text-emerald-300 font-black text-sm flex items-center justify-center gap-2">
                                            <CheckCircle2 size={20} />
                                            <span>Tuyệt vời! Bạn phát âm cực chuẩn xác! 🎉</span>
                                        </div>
                                    )}

                                    {speechResult === 'wrong' && (
                                        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/30 border border-rose-500 text-rose-700 dark:text-rose-300 font-bold text-sm space-y-1">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <XCircle size={18} />
                                                <span>Chưa hoàn toàn khớp, bạn hãy nghe lại mẫu và thử phát âm lại nhé!</span>
                                            </div>
                                        </div>
                                    )}

                                    {speechResult && (
                                        <button
                                            onClick={handleNextSpeechWord}
                                            className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-slate-700 text-white font-bold text-xs hover:bg-gray-800 transition cursor-pointer"
                                        >
                                            Chuyển sang từ tiếp theo ➔
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* DANH SÁCH TỪ VỰNG CHỌN NHANH ĐỂ LUYỆN NÓI */}
                            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 max-w-4xl mx-auto">
                                <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
                                    <h4 className="text-sm font-black text-gray-800 dark:text-white flex items-center gap-2">
                                        <ListFilter size={16} className="text-emerald-600" />
                                        <span>Danh sách từ vựng ETS 2026 đang chọn ({ipaWords.length} từ)</span>
                                    </h4>
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                        Đã đọc đúng: {spokenCorrectSet.size} / {ipaWords.length}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto pr-1">
                                    {ipaWords.map((w, idx) => {
                                        const isCurrent = speechIndex % ipaWords.length === idx;
                                        const isCorrect = spokenCorrectSet.has(w.en || w.id);
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSpeechIndex(idx);
                                                    setSpokenText('');
                                                    setSpeechResult(null);
                                                }}
                                                className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                                                    isCurrent
                                                        ? 'bg-emerald-600 text-white border-emerald-600 font-black shadow-md scale-[1.02]'
                                                        : isCorrect
                                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold'
                                                            : 'bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:border-emerald-400 font-semibold'
                                                }`}
                                            >
                                                <div className="min-w-0">
                                                    <div className="text-xs truncate">{w.en}</div>
                                                    <div className={`text-[10px] font-mono truncate ${isCurrent ? 'text-emerald-100' : 'text-blue-600 dark:text-blue-400'}`}>{w.ipa}</div>
                                                </div>
                                                {isCorrect && <CheckCircle2 size={16} className={isCurrent ? 'text-white shrink-0' : 'text-emerald-500 shrink-0'} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: 44 IPA SYMBOLS CHART & ETS 2026 FILTER */}
            {/* ========================================================= */}
            {activeTab === 'chart' && (
                <div className="space-y-6">
                    {/* IPA Chart Interactive Selector */}
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                                1. Nguyên Âm Đơn (Monophthongs)
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                                {IPA_CATEGORIES.monophthongs.map((item, idx) => {
                                    const count = ipaWords.filter(w => w.ipa && w.ipa.includes(item.symbol)).length;
                                    const isSel = selectedIpaSymbol === item.symbol;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedIpaSymbol(item.symbol)}
                                            className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer ${
                                                isSel
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                                                    : 'bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 hover:border-blue-400'
                                            }`}
                                        >
                                            <div className="text-xl font-mono font-black">/{item.symbol}/</div>
                                            <div className="text-[11px] font-bold opacity-90 mt-0.5">{item.name}</div>
                                            <div className="text-[10px] opacity-75">{count} từ</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3">
                                2. Nguyên Âm Đôi (Diphthongs)
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
                                {IPA_CATEGORIES.diphthongs.map((item, idx) => {
                                    const count = ipaWords.filter(w => w.ipa && w.ipa.includes(item.symbol)).length;
                                    const isSel = selectedIpaSymbol === item.symbol;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedIpaSymbol(item.symbol)}
                                            className={`p-3 rounded-2xl border-2 text-center transition cursor-pointer ${
                                                isSel
                                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105'
                                                    : 'bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 hover:border-purple-400'
                                            }`}
                                        >
                                            <div className="text-xl font-mono font-black">/{item.symbol}/</div>
                                            <div className="text-[11px] font-bold opacity-90 mt-0.5">{item.name}</div>
                                            <div className="text-[10px] opacity-75">{count} từ</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                                3. Phụ Âm (Consonants)
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
                                {IPA_CATEGORIES.consonants.map((item, idx) => {
                                    const count = ipaWords.filter(w => w.ipa && w.ipa.includes(item.symbol)).length;
                                    const isSel = selectedIpaSymbol === item.symbol;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedIpaSymbol(item.symbol)}
                                            className={`p-2.5 rounded-2xl border-2 text-center transition cursor-pointer ${
                                                isSel
                                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
                                                    : 'bg-gray-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 hover:border-emerald-400'
                                            }`}
                                        >
                                            <div className="text-lg font-mono font-black">/{item.symbol}/</div>
                                            <div className="text-[10px] font-bold opacity-90 mt-0.5">{item.name}</div>
                                            <div className="text-[9px] opacity-75">{count} từ</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* HƯỚNG DẪN CHI TIẾT VỀ ÂM ĐANG CHỌN */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-3xl p-6 shadow-sm">
                        <h4 className="text-sm font-black uppercase text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                            <Info size={18} /> Hướng dẫn phát âm âm /{selectedIpaSymbol}/ trong TOEIC:
                        </h4>
                        <IpaGuide ipa={selectedIpaSymbol} />
                    </div>

                    {/* Filtered Words List */}
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-black text-gray-800 dark:text-white">
                                Các từ ETS 2026 có chứa âm <span className="font-mono text-blue-600 dark:text-blue-400">/{selectedIpaSymbol}/</span> ({wordsMatchingSymbol.length} từ)
                            </h3>
                        </div>

                        {wordsMatchingSymbol.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-8">
                                Không có từ vựng nào trong danh sách đang chọn chứa âm /{selectedIpaSymbol}/. Hãy đổi sang nhóm Tất Cả hoặc chọn âm khác!
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {wordsMatchingSymbol.map((w, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 hover:border-blue-400 transition flex items-center justify-between gap-3"
                                    >
                                        <div className="min-w-0">
                                            <div className="font-black text-base text-gray-900 dark:text-white truncate">
                                                {w.en}
                                            </div>
                                            <div className="font-mono text-xs text-blue-600 dark:text-blue-400">
                                                {w.ipa}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5">
                                                {w.vi}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => speak && speak(w.en)}
                                            className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-200 transition shrink-0 cursor-pointer"
                                            title="Phát âm"
                                        >
                                            <Volume2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ets2026IpaMode;
