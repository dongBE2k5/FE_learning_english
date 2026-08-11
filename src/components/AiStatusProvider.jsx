import React, { createContext, useContext, useState, useEffect } from 'react';

const AiStatusContext = createContext();

export const useAiStatus = () => useContext(AiStatusContext);

export const AiStatusProvider = ({ children }) => {
    const [totalPromptTokens, setTotalPromptTokens] = useState(0);
    const [totalCompletionTokens, setTotalCompletionTokens] = useState(0);
    const [totalTokens, setTotalTokens] = useState(0);
    const [rateLimitErrors, setRateLimitErrors] = useState([]); // { id, model, message, time }
    const [lastModelUsed, setLastModelUsed] = useState(null);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [preferredModel, setPreferredModel] = useState(() => {
        return localStorage.getItem('ai_preferred_model') || 'google/gemma-4-e2b-it:free';
    });

    useEffect(() => {
        if (preferredModel) {
            localStorage.setItem('ai_preferred_model', preferredModel);
        }
    }, [preferredModel]);

    // Load initial from localStorage if we want persistence across reloads
    useEffect(() => {
        try {
            const saved = localStorage.getItem('ai_token_usage');
            if (saved) {
                const parsed = JSON.parse(saved);
                setTotalPromptTokens(parsed.prompt || 0);
                setTotalCompletionTokens(parsed.completion || 0);
                setTotalTokens(parsed.total || 0);
            }
        } catch (e) {
            console.error("Failed to load AI token usage", e);
        }
    }, []);

    // Save to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('ai_token_usage', JSON.stringify({
            prompt: totalPromptTokens,
            completion: totalCompletionTokens,
            total: totalTokens
        }));
    }, [totalPromptTokens, totalCompletionTokens, totalTokens]);

    const reportAiUsage = (metadata) => {
        if (!metadata) return;

        if (metadata.modelUsed) {
            setLastModelUsed(metadata.modelUsed);
        }

        if (metadata.usage) {
            setTotalPromptTokens(prev => prev + (metadata.usage.promptTokens || 0));
            setTotalCompletionTokens(prev => prev + (metadata.usage.completionTokens || 0));
            setTotalTokens(prev => prev + (metadata.usage.totalTokens || 0));
        }

        if (metadata.errors && metadata.errors.length > 0) {
            const newErrors = metadata.errors
                .filter(err => err.error && (err.error.includes('429') || err.error.toLowerCase().includes('too many requests') || err.error.includes('quota')))
                .map(err => ({
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                    model: err.model,
                    message: err.error,
                    time: new Date()
                }));

            if (newErrors.length > 0) {
                setRateLimitErrors(prev => [...prev, ...newErrors]);
                
                // Automatically clear errors after 10 seconds to hide the toast
                newErrors.forEach(err => {
                    setTimeout(() => {
                        setRateLimitErrors(prev => prev.filter(e => e.id !== err.id));
                    }, 10000);
                });
            }
        }
    };

    const clearStats = () => {
        setTotalPromptTokens(0);
        setTotalCompletionTokens(0);
        setTotalTokens(0);
        setLastModelUsed(null);
    };

    return (
        <AiStatusContext.Provider value={{
            totalPromptTokens,
            totalCompletionTokens,
            totalTokens,
            rateLimitErrors,
            lastModelUsed,
            isDashboardOpen,
            setIsDashboardOpen,
            preferredModel,
            setPreferredModel,
            reportAiUsage,
            clearStats
        }}>
            {children}
        </AiStatusContext.Provider>
    );
};
