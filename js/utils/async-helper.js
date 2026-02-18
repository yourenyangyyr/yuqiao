/**
 * Async Helper Module
 * Utilities for polling and async operations
 */

const AsyncHelper = {
    /**
     * Poll a function until it returns a truthy value or timeout is reached
     * @param {Function} fn - Async function to poll
     * @param {Object} options - Polling options
     * @param {number} options.interval - Polling interval in milliseconds (default: 2000)
     * @param {number} options.timeout - Maximum polling time in milliseconds (default: 300000)
     * @param {Function} options.onProgress - Callback for progress updates (status)
     * @returns {Promise} Promise that resolves with the function result
     */
    async poll(fn, options = {}) {
        const {
            interval = 2000,
            timeout = 300000,
            onProgress = null
        } = options;

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            try {
                const result = await fn();

                if (result) {
                    return result;
                }

                // Check if result has a status we can report
                if (result && result.status && onProgress) {
                    onProgress(result.status);
                }
            } catch (error) {
                console.error('Polling error:', error);
                // Continue polling on error
            }

            // Wait before next poll
            await new Promise(resolve => setTimeout(resolve, interval));
        }

        throw new Error(`Polling timeout after ${timeout}ms`);
    },

    /**
     * Delay execution for a specified time
     * @param {number} ms - Delay in milliseconds
     * @returns {Promise} Promise that resolves after the delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Retry a function with exponential backoff
     * @param {Function} fn - Async function to retry
     * @param {Object} options - Retry options
     * @param {number} options.maxRetries - Maximum number of retries (default: 3)
     * @param {number} options.baseDelay - Base delay in milliseconds (default: 1000)
     * @param {number} options.maxDelay - Maximum delay in milliseconds (default: 10000)
     * @returns {Promise} Promise that resolves with the function result
     */
    async retry(fn, options = {}) {
        const {
            maxRetries = 3,
            baseDelay = 1000,
            maxDelay = 10000
        } = options;

        let lastError;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;

                if (attempt < maxRetries) {
                    const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
                    await this.delay(delay);
                }
            }
        }

        throw lastError;
    },

    /**
     * Convert a blob to a data URL
     * @param {Blob} blob - Blob to convert
     * @returns {Promise<string>} Data URL
     */
    async blobToDataUrl(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    },

    /**
     * Download a file from a URL
     * @param {string} url - URL to download from
     * @param {string} filename - Filename to save as
     * @returns {Promise<void>}
     */
    async downloadFile(url, filename) {
        try {
            // First try to fetch and download via blob (works for same-origin or CORS-enabled URLs)
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
            console.warn('Blob download failed, opening in new tab:', error);
            // Fallback: open the image in a new tab if fetch fails
            // This allows users to save the image manually
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            throw new Error(`直接下载失败，已在新标签页打开图片，请右键保存`);
        }
    }
};
