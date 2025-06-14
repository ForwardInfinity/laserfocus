/**
 * Default domains to block if none exist in storage
 * @type {string[]}
 */
const DEFAULT_BLOCKED_DOMAINS = [
  'facebook.com',
  'instagram.com',
  'tiktok.com',
  'youtube.com',
  'twitter.com'
];

/**
 * Storage key for blocked domains
 * @type {string}
 */
const STORAGE_KEY = 'blockedDomains';

/**
 * Retrieves the list of blocked domains from storage
 * If no domains exist in storage, returns the default list
 * @returns {Promise<string[]>} Array of blocked domains
 */
function getBlockedDomains() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(STORAGE_KEY, (result) => {
      // If blockedDomains doesn't exist in storage or is empty, return defaults
      if (!result[STORAGE_KEY]) {
        resolve(DEFAULT_BLOCKED_DOMAINS);
      } else {
        resolve(result[STORAGE_KEY]);
      }
    });
  });
}

/**
 * Saves the list of blocked domains to storage
 * @param {string[]} domains Array of domains to block
 * @returns {Promise<void>}
 */
function saveBlockedDomains(domains) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [STORAGE_KEY]: domains }, () => {
      resolve();
    });
  });
}

/**
 * Seeds the default domains if they don't already exist in storage
 * This will be called during extension installation
 * @returns {Promise<void>}
 */
async function seedDefaultDomainsIfNeeded() {
  const existingDomains = await getBlockedDomains();
  // If getBlockedDomains returns the default list, it means storage was empty
  // In that case, save the default list to storage
  if (JSON.stringify(existingDomains) === JSON.stringify(DEFAULT_BLOCKED_DOMAINS)) {
    await saveBlockedDomains(DEFAULT_BLOCKED_DOMAINS);
  }
}

// Export functions for use in other modules and tests
module.exports = {
  getBlockedDomains,
  saveBlockedDomains,
  seedDefaultDomainsIfNeeded,
  DEFAULT_BLOCKED_DOMAINS // Export for testing purposes
}; 