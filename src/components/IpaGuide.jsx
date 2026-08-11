import React from 'react';

const ipaMapping = {
  "iː": "i dài",
  "ɪ": "i ngắn",
  "e": "e",
  "æ": "a bẹt (há miệng)",
  "ɑː": "a dài",
  "ɒ": "o ngắn",
  "ɔː": "o dài",
  "ʊ": "u ngắn",
  "uː": "u dài",
  "ʌ": "á",
  "ɜː": "ơ dài",
  "ə": "ơ ngắn",
  "eɪ": "êi",
  "aɪ": "ai",
  "ɔɪ": "oi",
  "aʊ": "au",
  "əʊ": "âu",
  "ɪə": "iơ",
  "eə": "eơ",
  "ʊə": "uơ",
  "θ": "th (thổi hơi)",
  "ð": "đ (rung)",
  "ʃ": "s (nặng)",
  "ʒ": "gi (rung)",
  "tʃ": "ch (nặng)",
  "dʒ": "tr (nặng, rung)",
  "ŋ": "ng (mũi)",
  "j": "d (nhẹ)"
};

const IpaGuide = ({ ipa, className = "justify-center" }) => {
    if (!ipa) return null;

    // Sort symbols by length descending to match longer symbols first (e.g., eɪ before e)
    const symbols = Object.keys(ipaMapping).sort((a, b) => b.length - a.length);
    let remainingIpa = ipa;
    const found = [];

    symbols.forEach(symbol => {
        if (remainingIpa.includes(symbol)) {
            found.push({ symbol, desc: ipaMapping[symbol] });
            remainingIpa = remainingIpa.split(symbol).join(''); 
        }
    });

    if (found.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-1.5 mt-2 max-w-full ${className}`}>
            {found.map((item, idx) => (
                <span key={idx} className="text-[10px] md:text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-900/50 shadow-sm whitespace-nowrap">
                    <strong className="font-mono text-blue-600 dark:text-blue-400">/{item.symbol}/</strong>: {item.desc}
                </span>
            ))}
        </div>
    );
};

export default IpaGuide;
