/**
 * Storage Service Module
 * Handles localStorage operations for history records
 */

const StorageService = {
    STORAGE_KEY: 'vocab_news_history',
    MAX_HISTORY: 50,

    /**
     * Get all history records
     * @returns {Array} Array of history records
     */
    getHistory() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to parse history:', error);
            return [];
        }
    },

    /**
     * Save a new history record
     * @param {Object} record - History record to save
     * @returns {boolean} Success status
     */
    saveRecord(record) {
        try {
            const history = this.getHistory();
            const newRecord = {
                id: Date.now(),
                timestamp: Date.now(),
                ...record
            };

            // Add to beginning of array
            history.unshift(newRecord);

            // Limit history size
            if (history.length > this.MAX_HISTORY) {
                history.splice(this.MAX_HISTORY);
            }

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('Failed to save record:', error);
            return false;
        }
    },

    /**
     * Delete a history record by ID
     * @param {string} id - Record ID to delete
     * @returns {boolean} Success status
     */
    deleteRecord(id) {
        try {
            const history = this.getHistory();
            const filtered = history.filter(record => record.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Failed to delete record:', error);
            return false;
        }
    },

    /**
     * Get a single history record by ID
     * @param {string} id - Record ID
     * @returns {Object|null} Record or null if not found
     */
    getRecord(id) {
        const history = this.getHistory();
        return history.find(record => record.id === id) || null;
    },

    /**
     * Clear all history
     * @returns {boolean} Success status
     */
    clearHistory() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to clear history:', error);
            return false;
        }
    }
};
