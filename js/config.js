/**
 * Configuration Management Module
 * Handles API key storage, default parameters, and localStorage operations
 */

const Config = {
    // Default configuration values
    defaults: {
        apiKey: '',
        apiUrl: {
            createTask: 'https://api.kie.ai/api/v1/jobs/createTask',
            queryStatus: 'https://api.kie.ai/api/v1/jobs/recordInfo'
        },
        model: 'nano-banana-pro',
        resolution: '1K',
        aspectRatio: '2:3',
        outputFormat: 'png',
        pollingInterval: 2000, // 2 seconds
        pollingTimeout: 300000, // 5 minutes
        storageKeys: {
            apiKey: 'vocab_news_api_key',
            resolution: 'vocab_news_resolution',
            aspectRatio: 'vocab_news_aspect_ratio',
            history: 'vocab_news_history'
        }
    },

    /**
     * Get API key from localStorage
     * @returns {string} API key or empty string
     */
    getApiKey() {
        return localStorage.getItem(this.defaults.storageKeys.apiKey) || '';
    },

    /**
     * Set API key to localStorage
     * @param {string} apiKey - API key to store
     */
    setApiKey(apiKey) {
        if (apiKey) {
            localStorage.setItem(this.defaults.storageKeys.apiKey, apiKey.trim());
        } else {
            localStorage.removeItem(this.defaults.storageKeys.apiKey);
        }
    },

    /**
     * Get resolution setting from localStorage
     * @returns {string} Resolution value (1K, 2K, 4K)
     */
    getResolution() {
        return localStorage.getItem(this.defaults.storageKeys.resolution) || this.defaults.resolution;
    },

    /**
     * Set resolution setting to localStorage
     * @param {string} resolution - Resolution value
     */
    setResolution(resolution) {
        localStorage.setItem(this.defaults.storageKeys.resolution, resolution);
    },

    /**
     * Get aspect ratio setting from localStorage
     * @returns {string} Aspect ratio value
     */
    getAspectRatio() {
        return localStorage.getItem(this.defaults.storageKeys.aspectRatio) || this.defaults.aspectRatio;
    },

    /**
     * Set aspect ratio setting to localStorage
     * @param {string} aspectRatio - Aspect ratio value
     */
    setAspectRatio(aspectRatio) {
        localStorage.setItem(this.defaults.storageKeys.aspectRatio, aspectRatio);
    },

    /**
     * Get all configuration
     * @returns {Object} Configuration object
     */
    getAll() {
        return {
            apiKey: this.getApiKey(),
            resolution: this.getResolution(),
            aspectRatio: this.getAspectRatio(),
            model: this.defaults.model,
            apiUrl: this.defaults.apiUrl,
            outputFormat: this.defaults.outputFormat,
            pollingInterval: this.defaults.pollingInterval,
            pollingTimeout: this.defaults.pollingTimeout
        };
    },

    /**
     * Check if API key is configured
     * @returns {boolean} True if API key is set
     */
    hasApiKey() {
        return this.getApiKey().length > 0;
    }
};
