/**
 * Module responsible for handling extension installation events
 * Implements FR-013: On first install, seed default domains if blockedDomains is undefined
 */

const { seedDefaultDomainsIfNeeded } = require('./storage.js');

/**
 * Handler for the runtime.onInstalled event
 * Seeds default domains if needed when extension is installed
 */
function handleInstalled() {
  // Call the seeding function which already checks if seeding is needed
  seedDefaultDomainsIfNeeded();
}

/**
 * Initialize the extension installation listener
 * Exported to allow for testing
 */
function init() {
  // Register the onInstalled event handler
  chrome.runtime.onInstalled.addListener(handleInstalled);
}

// Call init immediately in production
if (process.env.NODE_ENV !== 'test') {
  init();
}

// Export for testing
module.exports = {
  handleInstalled,
  init
}; 