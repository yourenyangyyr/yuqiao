/**
 * UI Manager Module
 * Handles UI state management and DOM operations
 */

const UIManager = {
    // DOM elements cache
    elements: {},

    // Current state
    state: {
        isGenerating: false,
        currentPrompt: '',
        currentTopic: '',
        currentTitle: '',
        currentImageUrl: '',
        currentVocab: []
    },

    /**
     * Initialize UI manager
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadSettings();
        this.loadHistory();
    },

    /**
     * Cache DOM elements for quick access
     */
    cacheElements() {
        this.elements = {
            // Input elements
            topicInput: document.getElementById('topicInput'),
            titleInput: document.getElementById('titleInput'),
            generateBtn: document.getElementById('generateBtn'),

            // Loading section
            loadingSection: document.getElementById('loadingSection'),
            loadingStatus: document.getElementById('loadingStatus'),

            // Result section
            resultSection: document.getElementById('resultSection'),
            resultTitle: document.getElementById('resultTitle'),
            generatedImage: document.getElementById('generatedImage'),
            vocabList: document.getElementById('vocabList'),
            saveBtn: document.getElementById('saveBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            editPromptBtn: document.getElementById('editPromptBtn'),

            // Prompt editor
            promptEditor: document.getElementById('promptEditor'),
            promptTextarea: document.getElementById('promptTextarea'),
            regenerateBtn: document.getElementById('regenerateBtn'),
            cancelEditBtn: document.getElementById('cancelEditBtn'),

            // History section
            historyList: document.getElementById('historyList'),

            // Settings modal
            settingsBtn: document.getElementById('settingsBtn'),
            settingsModal: document.getElementById('settingsModal'),
            closeSettingsBtn: document.getElementById('closeSettingsBtn'),
            apiKeyInput: document.getElementById('apiKeyInput'),
            resolutionSelect: document.getElementById('resolutionSelect'),
            aspectRatioSelect: document.getElementById('aspectRatioSelect'),
            saveSettingsBtn: document.getElementById('saveSettingsBtn'),
            cancelSettingsBtn: document.getElementById('cancelSettingsBtn'),

            // Error toast
            errorToast: document.getElementById('errorToast'),
            errorMessage: document.getElementById('errorMessage')
        };
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        const el = this.elements;

        // Generate button
        el.generateBtn.addEventListener('click', () => this.handleGenerate());

        // Save and download buttons
        el.saveBtn.addEventListener('click', () => this.handleSave());
        el.downloadBtn.addEventListener('click', () => this.handleDownload());
        el.editPromptBtn.addEventListener('click', () => this.showPromptEditor());

        // Prompt editor
        el.regenerateBtn.addEventListener('click', () => this.handleRegenerate());
        el.cancelEditBtn.addEventListener('click', () => this.hidePromptEditor());

        // Settings modal
        el.settingsBtn.addEventListener('click', () => this.showSettingsModal());
        el.closeSettingsBtn.addEventListener('click', () => this.hideSettingsModal());
        el.cancelSettingsBtn.addEventListener('click', () => this.hideSettingsModal());
        el.saveSettingsBtn.addEventListener('click', () => this.handleSaveSettings());

        // Close modal on backdrop click
        el.settingsModal.addEventListener('click', (e) => {
            if (e.target === el.settingsModal) {
                this.hideSettingsModal();
            }
        });
    },

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        const el = this.elements;
        el.apiKeyInput.value = Config.getApiKey();
        el.resolutionSelect.value = Config.getResolution();
        el.aspectRatioSelect.value = Config.getAspectRatio();
    },

    /**
     * Load history from localStorage
     */
    loadHistory() {
        const history = StorageService.getHistory();
        this.renderHistory(history);
    },

    /**
     * Render history list
     * @param {Array} history - Array of history records
     */
    renderHistory(history) {
        const el = this.elements;

        if (history.length === 0) {
            el.historyList.innerHTML = '<p class="empty-hint">暂无历史记录</p>';
            return;
        }

        el.historyList.innerHTML = history.map(record => `
            <div class="history-item" data-id="${record.id}">
                <img src="${record.imageUrl}" alt="${record.title}">
                <div class="history-item-overlay">
                    <div class="history-item-title">${record.title}</div>
                    <div class="history-item-date">${this.formatDate(record.timestamp)}</div>
                </div>
                <button class="history-item-delete" title="删除">&times;</button>
            </div>
        `).join('');

        // Add click handlers for history items
        el.historyList.querySelectorAll('.history-item').forEach(item => {
            // Click to load
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('history-item-delete')) {
                    const id = parseInt(item.dataset.id);
                    this.loadFromHistory(id);
                }
            });

            // Delete button
            const deleteBtn = item.querySelector('.history-item-delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(item.dataset.id);
                this.deleteFromHistory(id);
            });
        });
    },

    /**
     * Load a record from history
     * @param {number} id - Record ID
     */
    loadFromHistory(id) {
        const record = StorageService.getRecord(id);
        if (record) {
            this.showResult(record.imageUrl, record.title, record.prompt, record.vocab);
            this.elements.topicInput.value = record.topic;
            this.elements.titleInput.value = record.title;
        }
    },

    /**
     * Delete a record from history
     * @param {number} id - Record ID
     */
    deleteFromHistory(id) {
        StorageService.deleteRecord(id);
        this.loadHistory();
    },

    /**
     * Handle generate button click
     */
    async handleGenerate() {
        const el = this.elements;

        if (this.state.isGenerating) {
            return;
        }

        const topic = el.topicInput.value.trim();
        const title = el.titleInput.value.trim();

        if (!topic) {
            this.showError('请输入主题/场景');
            return;
        }

        if (!title) {
            this.showError('请输入小报标题');
            return;
        }

        if (!Config.hasApiKey()) {
            this.showSettingsModal();
            this.showError('请先配置 API Key');
            return;
        }

        this.state.isGenerating = true;
        this.state.currentTopic = topic;
        this.state.currentTitle = title;
        this.updateGenerateButton();

        try {
            // Generate prompt
            const prompt = PromptService.generatePrompt(topic, title);
            this.state.currentPrompt = prompt;
            this.state.currentVocab = VocabService.getDisplayVocab(topic);

            // Show loading state
            this.showLoading();

            // Generate image
            const imageUrl = await ImageApi.generateImage(prompt, {
                onProgress: (status) => this.updateLoadingStatus(status)
            });

            // Store the image URL
            this.state.currentImageUrl = imageUrl;

            // Show result
            this.showResult(imageUrl, title, prompt, this.state.currentVocab);
            this.hideLoading();

        } catch (error) {
            console.error('Generate error:', error);
            this.showError(`生成失败: ${error.message}`);
            this.hideLoading();
        } finally {
            this.state.isGenerating = false;
            this.updateGenerateButton();
        }
    },

    /**
     * Show loading state
     */
    showLoading() {
        const el = this.elements;
        el.loadingSection.classList.remove('hidden');
        el.resultSection.classList.add('hidden');
        this.updateLoadingStatus('创建任务中...');
    },

    /**
     * Hide loading state
     */
    hideLoading() {
        this.elements.loadingSection.classList.add('hidden');
    },

    /**
     * Update loading status text
     * @param {string} status - Status text
     */
    updateLoadingStatus(status) {
        this.elements.loadingStatus.textContent = status;
    },

    /**
     * Show result
     * @param {string} imageUrl - Image URL
     * @param {string} title - Title
     * @param {string} prompt - Prompt text
     * @param {Array} vocab - Vocabulary list
     */
    showResult(imageUrl, title, prompt, vocab) {
        const el = this.elements;

        el.resultTitle.textContent = title;
        el.generatedImage.src = imageUrl;
        el.promptTextarea.value = prompt;

        this.renderVocabList(vocab);

        el.resultSection.classList.remove('hidden');
        el.promptEditor.classList.add('hidden');
    },

    /**
     * Render vocabulary list
     * @param {Array} vocab - Vocabulary array with pinyin and hanzi
     */
    renderVocabList(vocab) {
        const el = this.elements;

        el.vocabList.innerHTML = vocab.map(item => `
            <div class="vocab-item">
                <div class="vocab-pinyin">${item.pinyin}</div>
                <div class="vocab-hanzi">${item.hanzi}</div>
            </div>
        `).join('');
    },

    /**
     * Show prompt editor
     */
    showPromptEditor() {
        this.elements.promptEditor.classList.remove('hidden');
    },

    /**
     * Hide prompt editor
     */
    hidePromptEditor() {
        this.elements.promptEditor.classList.add('hidden');
    },

    /**
     * Handle regenerate button click
     */
    async handleRegenerate() {
        const el = this.elements;
        const prompt = el.promptTextarea.value.trim();

        if (!prompt) {
            this.showError('请输入提示词');
            return;
        }

        if (!Config.hasApiKey()) {
            this.showSettingsModal();
            this.showError('请先配置 API Key');
            return;
        }

        this.state.isGenerating = true;
        this.state.currentPrompt = prompt;
        this.updateGenerateButton();

        try {
            this.showLoading();

            const imageUrl = await ImageApi.generateImage(prompt, {
                onProgress: (status) => this.updateLoadingStatus(status)
            });

            this.state.currentImageUrl = imageUrl;
            this.showResult(imageUrl, this.state.currentTitle, prompt, this.state.currentVocab);
            this.hideLoading();

        } catch (error) {
            console.error('Regenerate error:', error);
            this.showError(`重新生成失败: ${error.message}`);
            this.hideLoading();
        } finally {
            this.state.isGenerating = false;
            this.updateGenerateButton();
        }
    },

    /**
     * Handle save button click
     */
    handleSave() {
        if (!this.state.currentImageUrl) {
            this.showError('没有可保存的图片');
            return;
        }

        const record = {
            topic: this.state.currentTopic,
            title: this.state.currentTitle,
            imageUrl: this.state.currentImageUrl,
            prompt: this.state.currentPrompt,
            vocab: this.state.currentVocab
        };

        const success = StorageService.saveRecord(record);
        if (success) {
            this.loadHistory();
            this.showError('已保存到历史记录');
        } else {
            this.showError('保存失败');
        }
    },

    /**
     * Handle download button click
     */
    async handleDownload() {
        if (!this.state.currentImageUrl) {
            this.showError('没有可下载的图片');
            return;
        }

        const filename = `${this.state.currentTitle}_${Date.now()}.png`;

        try {
            await AsyncHelper.downloadFile(this.state.currentImageUrl, filename);
        } catch (error) {
            console.error('Download error:', error);
            this.showError(`下载失败: ${error.message}`);
        }
    },

    /**
     * Show settings modal
     */
    showSettingsModal() {
        this.elements.settingsModal.classList.remove('hidden');
    },

    /**
     * Hide settings modal
     */
    hideSettingsModal() {
        this.elements.settingsModal.classList.add('hidden');
    },

    /**
     * Handle save settings button click
     */
    handleSaveSettings() {
        const el = this.elements;

        const apiKey = el.apiKeyInput.value.trim();
        const resolution = el.resolutionSelect.value;
        const aspectRatio = el.aspectRatioSelect.value;

        Config.setApiKey(apiKey);
        Config.setResolution(resolution);
        Config.setAspectRatio(aspectRatio);

        this.hideSettingsModal();
    },

    /**
     * Update generate button state
     */
    updateGenerateButton() {
        const el = this.elements;
        if (this.state.isGenerating) {
            el.generateBtn.disabled = true;
            el.generateBtn.textContent = '生成中...';
        } else {
            el.generateBtn.disabled = false;
            el.generateBtn.textContent = '✨ 生成小报';
        }
    },

    /**
     * Show error toast
     * @param {string} message - Error message
     */
    showError(message) {
        const el = this.elements;
        el.errorMessage.textContent = message;
        el.errorToast.classList.remove('hidden');

        // Auto hide after 3 seconds
        setTimeout(() => {
            el.errorToast.classList.add('hidden');
        }, 3000);
    },

    /**
     * Format date to display string
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted date string
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${month}/${day} ${hours}:${minutes}`;
    }
};
