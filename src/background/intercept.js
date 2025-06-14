/**
 * Utilities for determining whether navigation requests should be intercepted
 * Implements FR-014: If blockedDomains is empty, interception logic is skipped entirely
 */

const { getBlockedDomains } = require('./storage');

/**
 * Determines whether navigation interception should be performed based on the
 * presence of domains in the blockedDomains list.
 * 
 * This function checks if there are any domains in the user's blocklist. If the list
 * is empty (length === 0), we should skip interception entirely (return false).
 * This allows users to effectively disable the extension by clearing their blocklist.
 * 
 * @async
 * @returns {Promise<boolean>} False if the blockedDomains list is empty, true otherwise
 * 
 * @example
 * // Check if interception should occur before processing a navigation request
 * if (await shouldIntercept()) {
 *   // Proceed with interception logic
 * } else {
 *   // Skip interception entirely
 * }
 * 
 * @see FR-014 - If blockedDomains is empty, interception logic is skipped entirely
 * @see US-007 - No overlay when list empty
 */
async function shouldIntercept() {
  // Get the current list of blocked domains from storage
  const blockedDomains = await getBlockedDomains();
  
  // Edge case: If getBlockedDomains fails, it would return the default domains
  // (handled inside getBlockedDomains), so we don't need additional error handling here
  
  // Return false (skip interception) if the list is empty, true otherwise
  return blockedDomains.length > 0;
}

module.exports = {
  shouldIntercept
}; 