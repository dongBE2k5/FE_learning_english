import React, { useMemo } from 'react';
import { Network, Volume2, Link as LinkIcon, Sparkles } from 'lucide-react';
import IpaGuide from './IpaGuide';

const RelatedWordsMode = ({ words, speak }) => {
    // Group words into clusters based on morphological similarity and shared tokens (phrases/collocations)
    const clusters = useMemo(() => {
        if (!words || words.length === 0) return [];

        const stopWords = new Set(['something', 'somebody', 'someone', 'anyone', 'anything', 'the', 'and', 'for', 'with', 'from', 'into', 'onto', 'upon', 'without', 'within', 'out', 'off', 'too', 'very', 'not', 'you', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those']);

        const extractTokens = (text) => {
            const rawTokens = text.toLowerCase().match(/[a-z]+/g) || [];
            return rawTokens.filter(w => w.length >= 3 && !stopWords.has(w));
        };

        const getCommonPrefixLen = (s1, s2) => {
            let i = 0;
            while (i < s1.length && i < s2.length && s1[i] === s2[i]) i++;
            return i;
        };

        const areRelated = (w1, w2) => {
            const tokens1 = extractTokens(w1);
            const tokens2 = extractTokens(w2);

            for (const t1 of tokens1) {
                for (const t2 of tokens2) {
                    // Exact match (shared word in a phrase/collocation)
                    if (t1 === t2) return true;
                    
                    // Prefix match
                    const prefixLen = getCommonPrefixLen(t1, t2);
                    // If one fully contains the other as a prefix, e.g. "inform" and "information"
                    if ((prefixLen === t1.length || prefixLen === t2.length) && prefixLen >= 4) return true;
                    // Shared prefix of at least 5 chars (e.g. communicate vs communication -> communicat)
                    if (prefixLen >= 5) return true;
                    // 'e' drop rule: create / creator -> creat
                    if (t1.length >= 4 && t2.length >= 4) {
                        if (t1.endsWith('e') && t2.startsWith(t1.slice(0, -1))) return true;
                        if (t2.endsWith('e') && t1.startsWith(t2.slice(0, -1))) return true;
                    }
                }
            }
            return false;
        };

        // Build adjacency list
        const adj = new Map();
        words.forEach(w => adj.set(w.id, []));

        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (areRelated(words[i].en, words[j].en)) {
                    adj.get(words[i].id).push(words[j]);
                    adj.get(words[j].id).push(words[i]);
                }
            }
        }

        // Find connected components
        const visited = new Set();
        const components = [];

        for (const word of words) {
            if (!visited.has(word.id)) {
                const comp = [];
                const q = [word];
                visited.add(word.id);

                while (q.length > 0) {
                    const curr = q.shift();
                    comp.push(curr);
                    const neighbors = adj.get(curr.id) || [];
                    for (const neighbor of neighbors) {
                        if (!visited.has(neighbor.id)) {
                            visited.add(neighbor.id);
                            q.push(neighbor);
                        }
                    }
                }

                if (comp.length > 1) {
                    components.push(comp);
                }
            }
        }

        // Sort components by size descending
        components.sort((a, b) => b.length - a.length);

        return components;
    }, [words]);

    if (words.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-64 text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                <p>Không có từ vựng nào để phân tích.</p>
            </div>
        );
    }

    if (clusters.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 min-h-[300px] transition-colors">
                <Network size={48} className="text-gray-300 dark:text-slate-600 mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-white">Chưa tìm thấy liên kết nào!</p>
                <p className="text-sm mt-2 max-w-sm">Hãy thêm nhiều từ vựng và cụm từ hơn (ví dụ: "care", "careful" hoặc "take notes", "take off") để hệ thống tìm ra các kết nối chung.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                {/* Decorative background patterns */}
                <div className="absolute top-0 right-0 p-8 transform translate-x-1/3 -translate-y-1/3 opacity-10 pointer-events-none">
                    <Network size={200} />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3 relative z-10">
                    <Sparkles size={36} className="text-fuchsia-300" />
                    Từ & Cụm từ liên kết
                </h2>
                <p className="text-indigo-100 opacity-95 text-lg max-w-2xl leading-relaxed relative z-10">
                    Khám phá mạng lưới các từ vựng chung gốc từ hoặc chung các từ khóa trong cụm từ. Học theo liên kết giúp bạn ghi nhớ sâu và phản xạ nhanh hơn.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-6">
                {clusters.map((cluster, idx) => {
                    // Find common tokens to display as header tags
                    const tokenCounts = {};
                    cluster.forEach(w => {
                        const tokens = w.en.toLowerCase().match(/[a-z]+/g) || [];
                        tokens.forEach(t => {
                            if (t.length >= 3 && !['something', 'somebody', 'someone', 'the', 'and', 'for', 'with', 'from'].includes(t)) {
                                tokenCounts[t] = (tokenCounts[t] || 0) + 1;
                                // Also count prefixes for morphological roots
                                if (t.length >= 5) {
                                    const p = t.slice(0, 5);
                                    tokenCounts[p] = (tokenCounts[p] || 0) + 1;
                                }
                            }
                        });
                    });

                    // Get top 2 concepts that appear in multiple words
                    const topConcepts = Object.entries(tokenCounts)
                        .sort((a, b) => b[1] - a[1])
                        .filter(e => e[1] >= 2)
                        .map(e => e[0])
                        .slice(0, 2);

                    return (
                        <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 to-fuchsia-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                            
                            <div className="flex items-start justify-between border-b border-gray-100 dark:border-slate-800 pb-5 mb-5 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-2xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <LinkIcon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg flex flex-wrap gap-2 items-center">
                                            {topConcepts.length > 0 ? (
                                                topConcepts.map((c, i) => (
                                                    <span key={i} className="bg-gray-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 font-mono px-2.5 py-1 rounded-lg text-sm border border-gray-200 dark:border-slate-700 shadow-sm">
                                                        "{c}"
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-600 dark:text-slate-400">Nhóm hỗn hợp</span>
                                            )}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                            {cluster.length} từ / cụm từ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                                {cluster.map(w => (
                                    <button 
                                        key={w.id}
                                        onClick={(e) => speak(w.en, e)} 
                                        className="group/word text-left bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                                    >
                                        <div className="flex items-start justify-between w-full mb-1">
                                            <span className="font-bold tracking-tight text-gray-800 dark:text-white text-[1.1rem] group-hover/word:text-indigo-700 dark:group-hover/word:text-indigo-400 leading-tight pr-4">
                                                {w.en}
                                            </span>
                                            <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full text-gray-400 dark:text-slate-500 group-hover/word:text-indigo-600 dark:group-hover/word:text-indigo-400 group-hover/word:bg-indigo-100 dark:group-hover/word:bg-indigo-900/50 shadow-sm transition-colors shrink-0">
                                                <Volume2 size={16} />
                                            </div>
                                        </div>
                                        
                                        {w.ipa && <div className="text-xs text-gray-500 dark:text-slate-400 font-mono flex-shrink-0 mb-2">{w.ipa}</div>}
                                        <div className="text-sm text-gray-600 dark:text-slate-300 leading-snug flex-grow">{w.vi}</div>
                                        
                                        <div className="mt-3 flex justify-start">
                                            <span className="inline-block px-2.5 py-1 bg-white dark:bg-slate-800 text-[10px] uppercase tracking-wider text-gray-500 dark:text-slate-400 font-bold rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                                                {w.category || 'Khác'}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedWordsMode;
