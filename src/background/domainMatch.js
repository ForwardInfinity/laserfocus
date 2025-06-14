/**
 * Domain matching utility for determining if a test domain matches a blocked domain
 * Implements:
 * - FR-001: Intercept every navigation whose eTLD+1 or any sub-domain matches blockedDomains
 * - FR-002: Domain matching shall be case-insensitive and protocol-agnostic
 */

/**
 * Checks if a test domain matches a blocked domain.
 * The match is true if:
 * 1. The domains are exactly the same (case-insensitive)
 * 2. The test domain is a subdomain of the blocked domain
 * 
 * This implementation uses the URL API for robust domain parsing.
 * 
 * @param {string} testDomain - The domain to check (e.g., "www.facebook.com")
 * @param {string} blockedDomain - The blocked domain to match against (e.g., "facebook.com")
 * @returns {boolean} True if the test domain matches the blocked domain, false otherwise
 * 
 * @example
 * // These all return true
 * domainMatch('facebook.com', 'facebook.com');
 * domainMatch('www.facebook.com', 'facebook.com');
 * domainMatch('m.facebook.com', 'facebook.com');
 * domainMatch('FACEBOOK.com', 'facebook.com');
 * 
 * // These all return false
 * domainMatch('gmail.com', 'facebook.com');
 * domainMatch('myfacebook.com', 'facebook.com');
 */
function domainMatch(testDomain, blockedDomain) {
  // Handle edge cases - if any input is not a valid string, return false
  if (!testDomain || !blockedDomain || 
      typeof testDomain !== 'string' || 
      typeof blockedDomain !== 'string') {
    return false;
  }
  
  // Prepare domains for URL parsing by ensuring they have a protocol
  // URL API requires a protocol, so we add a dummy one if needed
  const testUrl = prepareUrlString(testDomain);
  const blockedUrl = prepareUrlString(blockedDomain);
  
  try {
    // Parse the domains using the URL API
    const testHostname = new URL(testUrl).hostname.toLowerCase();
    const blockedHostname = new URL(blockedUrl).hostname.toLowerCase();
    
    // If domains are exactly the same, it's a match
    if (testHostname === blockedHostname) {
      return true;
    }
    
    // Check if testDomain is a subdomain of blockedDomain
    // A subdomain will end with the blocked domain preceded by a dot
    return testHostname === blockedHostname || 
           testHostname.endsWith('.' + blockedHostname);
  } catch (error) {
    // If URL parsing fails, fall back to basic string comparison
    return testDomain.toLowerCase() === blockedDomain.toLowerCase();
  }
}

/**
 * Prepares a domain string for URL parsing by adding a protocol if needed
 * @param {string} domainString - The domain string to prepare
 * @returns {string} The prepared URL string
 */
function prepareUrlString(domainString) {
  // Remove any port numbers (e.g., :8080)
  domainString = domainString.split(':')[0];
  
  // If the string doesn't start with a protocol, add https://
  if (!domainString.includes('://')) {
    return `https://${domainString}`;
  }
  
  return domainString;
}

module.exports = {
  domainMatch
}; 