const API_BASE_URL = 'http://localhost:5000/api/words';

export const vocabularyApi = {
    getAllWords: async () => {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Failed to fetch words');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },
    addDataFile: async (newData) => {
        let count = 0;
        for (const word of newData) {
            try {
                await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(word),
                });
                count++;
            } catch (error) {
                console.error('Failed to add word:', error);
            }
        }
        return { success: true, count };
    },
    addWord: async (word) => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(word),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return { success: false };
        }
    },
    deleteWord: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return { success: false };
        }
    }
};
