import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

const MatchMode = ({ words, speak }) => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedIds, setMatchedIds] = useState([]);
    const [gameWon, setGameWon] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    useEffect(() => {
        startgame();
    }, [words, gameKey]);

    const startgame = () => {
        if (!words || words.length === 0) {
            setCards([]);
            return;
        }

        const pairs = [...words].sort(() => 0.5 - Math.random()).slice(0, 6);
        const deck = [];
        pairs.forEach(pair => {
            deck.push({ id: `${pair.id}-en`, pairId: pair.id, content: pair.en, type: 'en' });
            deck.push({ id: `${pair.id}-vn`, pairId: pair.id, content: pair.vi, type: 'vn' });
        })
        setCards(deck.sort(() => 0.5 - Math.random()));
        setSelectedCards([]);
        setMatchedIds([]);
        setGameWon(false);

    };
    const handleRestart = () => {
        setGameKey(prev => prev + 1);
    }
    const handleCardClick = (card) => {
        if (selectedCards.some(c => c.id === card.id) || matchedIds.includes(card.id)) return;
        if (selectedCards.length >= 2) return;

        if (card.type === 'en') {
            speak(card.content);
        }
        const newSelected = [...selectedCards, card];
        setSelectedCards(newSelected);

        if (newSelected.length === 2) {
            const [first, second] = newSelected;
            if (first.pairId === second.pairId) {
                setMatchedIds(prev => [...prev, first.id, second.id]);
                setSelectedCards([]);

                if (matchedIds.length + 2 === cards.length) {
                    setTimeout(() => setGameWon(true), 500);
                }
            }
            else {
                setTimeout(() => setSelectedCards([]), 1000);
            }
        }

    };
    if (words.length < 3) return (
        <div className="flex flex-col items-center justify-center p-10 h-64 text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
            <p>Cần ít nhất 3 từ vựng trong bài này để chơi nối từ.</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto relative">
            {gameWon && (
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 z-50 flex items-center justify-center backdrop-blur-sm rounded-3xl transition-colors">
                    <div className="text-center animate-bounce">
                        <h2 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">Tuyệt vời!</h2>
                        <button onClick={handleRestart} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-indigo-700">Chơi lại</button>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-700 dark:text-white">Nối từ</h2>
                <button onClick={handleRestart} className="text-sm bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors">Làm mới</button>
            </div>


            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {cards.map(card => {
                    const isSelected = selectedCards.some(c => c.id === card.id);
                    const isMatched = matchedIds.includes(card.id);

                    let cardStyle = "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700";
                    if (isSelected) cardStyle = "bg-blue-100 dark:bg-blue-900/50 border-blue-500 dark:border-blue-500 text-blue-800 dark:text-blue-300 ring-2 ring-blue-200 dark:ring-blue-900 transform scale-105";
                    if (isMatched) cardStyle = "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600 text-green-800 dark:text-green-400 opacity-50 cursor-default scale-95";


                    if (selectedCards.length === 2 && isSelected && !isMatched) {
                        const [c1, c2] = selectedCards;
                        if (c1.pairId !== c2.pairId) {
                            cardStyle = "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600 text-red-800 dark:text-red-400 animate-pulse";
                        }
                    }
                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            className={`h-20 md:h-32 rounded-xl border-b-4 font-bold text-sm md:text-lg flex items-center justify-center p-2 transition-all duration-200 shadow-sm ${cardStyle}`}
                        >
                            {
                                card.type === 'en' && !isMatched && (
                                    <span className="absolute top-1 right-1 opacity-20"><Volume2 size={12} /></span>
                                )
                            }
                            {card.content}
                        </button>
                    );
                })}
            </div>

        </div>
    )
}
export default MatchMode;
