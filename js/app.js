/**
 * Children's Literacy Newspaper Generator
 * Application Entry Point
 *
 * Main application that initializes all modules
 */

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the UI manager
    UIManager.init();

    // Log initialization
    console.log('Children\'s Literacy Newspaper Generator initialized');
    console.log('API Key configured:', Config.hasApiKey() ? 'Yes' : 'No');
});

// Export for debugging
window.App = {
    Config,
    StorageService,
    VocabService,
    PromptService,
    ImageApi,
    UIManager,
    AsyncHelper
};
