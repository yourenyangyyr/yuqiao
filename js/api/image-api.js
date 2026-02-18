/**
 * Image API Module
 * Handles Nano Banana Pro API calls for image generation
 */

const ImageApi = {
    /**
     * Create a new image generation task
     * @param {string} prompt - The prompt for image generation
     * @param {Object} options - Additional options
     * @param {string} options.aspectRatio - Aspect ratio (default: "2:3")
     * @param {string} options.resolution - Resolution (default: "1K")
     * @param {string} options.outputFormat - Output format (default: "png")
     * @returns {Promise<string>} Task ID
     */
    async createTask(prompt, options = {}) {
        const config = Config.getAll();

        const {
            aspectRatio = config.aspectRatio,
            resolution = config.resolution,
            outputFormat = config.outputFormat
        } = options;

        const url = config.apiUrl.createTask;
        const requestBody = {
            model: config.model,
            input: {
                prompt: prompt,
                aspect_ratio: aspectRatio,
                resolution: resolution,
                output_format: outputFormat,
                image_input: []
            }
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.code === 200 && data.data && data.data.taskId) {
                return data.data.taskId;
            }

            throw new Error(data.msg || 'Failed to create task');
        } catch (error) {
            console.error('Create task error:', error);
            throw new Error(`API request failed: ${error.message}`);
        }
    },

    /**
     * Query the status of a task
     * @param {string} taskId - The task ID to query
     * @returns {Promise<Object>} Task status object
     */
    async getTaskStatus(taskId) {
        const config = Config.getAll();
        const url = `${config.apiUrl.queryStatus}?taskId=${taskId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`
                }
            });

            const data = await response.json();

            if (data.code === 200 && data.data) {
                return data.data;
            }

            throw new Error(data.msg || 'Failed to query task status');
        } catch (error) {
            console.error('Query status error:', error);
            throw new Error(`API request failed: ${error.message}`);
        }
    },

    /**
     * Wait for a task to complete and return the result
     * @param {string} taskId - The task ID to wait for
     * @param {Object} options - Polling options
     * @param {number} options.interval - Polling interval in milliseconds (default: from config)
     * @param {number} options.timeout - Maximum polling time in milliseconds (default: from config)
     * @param {Function} options.onProgress - Callback for progress updates
     * @returns {Promise<string>} Image URL
     */
    async waitForTaskComplete(taskId, options = {}) {
        const config = Config.getAll();

        const {
            interval = config.pollingInterval,
            timeout = config.pollingTimeout,
            onProgress = null
        } = options;

        const statusMap = {
            'waiting': '任务处理中...',
            'success': '任务完成',
            'fail': '任务失败'
        };

        // Define the poll function
        const pollFn = async () => {
            const result = await this.getTaskStatus(taskId);

            // Report progress
            if (result.state && onProgress) {
                const statusText = statusMap[result.state] || result.state;
                onProgress(statusText);
            }

            if (result.state === 'success') {
                // Parse resultJson to get image URLs
                if (result.resultJson) {
                    try {
                        const resultData = JSON.parse(result.resultJson);
                        if (resultData.resultUrls && resultData.resultUrls.length > 0) {
                            return resultData.resultUrls[0];
                        }
                    } catch (parseError) {
                        console.error('Failed to parse resultJson:', parseError);
                    }
                }
                throw new Error('No image URL found in result');
            }

            if (result.state === 'fail') {
                throw new Error(result.failMsg || 'Task failed');
            }

            // Return null to continue polling
            return null;
        };

        // Use AsyncHelper.poll to wait for completion
        return await AsyncHelper.poll(pollFn, {
            interval,
            timeout,
            onProgress
        });
    },

    /**
     * Generate an image from prompt (create task + wait for completion)
     * @param {string} prompt - The prompt for image generation
     * @param {Object} options - Additional options
     * @param {Function} options.onProgress - Callback for progress updates
     * @returns {Promise<string>} Image URL
     */
    async generateImage(prompt, options = {}) {
        const taskId = await this.createTask(prompt, options);

        if (options.onProgress) {
            options.onProgress('任务创建成功，正在生成...');
        }

        const imageUrl = await this.waitForTaskComplete(taskId, options);

        return imageUrl;
    }
};
