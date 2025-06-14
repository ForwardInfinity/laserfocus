/**
 * Unit tests for the domainMatch function
 * Tests FR-001: Intercept every navigation whose eTLD+1 or any sub-domain matches blockedDomains
 * Tests FR-002: Domain matching shall be case-insensitive and protocol-agnostic
 */

// Import the module to test (will fail until we create it)
const { domainMatch } = require('../../src/background/domainMatch');

describe('domainMatch', () => {
  test('matches exact domains', () => {
    expect(domainMatch('facebook.com', 'facebook.com')).toBe(true);
    expect(domainMatch('example.com', 'example.com')).toBe(true);
  });

  test('matches subdomains', () => {
    expect(domainMatch('m.facebook.com', 'facebook.com')).toBe(true);
    expect(domainMatch('www.facebook.com', 'facebook.com')).toBe(true);
    expect(domainMatch('sub.domain.example.com', 'example.com')).toBe(true);
  });

  test('handles case insensitivity', () => {
    expect(domainMatch('FACEBOOK.com', 'facebook.com')).toBe(true);
    expect(domainMatch('facebook.COM', 'FACEBOOK.com')).toBe(true);
    expect(domainMatch('WWW.FaCEbOOk.CoM', 'facebook.COM')).toBe(true);
  });

  test('does not match unrelated domains', () => {
    expect(domainMatch('gmail.com', 'facebook.com')).toBe(false);
    expect(domainMatch('facebookcom.example.net', 'facebook.com')).toBe(false);
    expect(domainMatch('example.org', 'example.com')).toBe(false);
    expect(domainMatch('myexample.com', 'example.com')).toBe(false);
  });

  test('handles edge cases', () => {
    // Empty or invalid inputs should not match
    expect(domainMatch('', 'example.com')).toBe(false);
    expect(domainMatch('example.com', '')).toBe(false);
    expect(domainMatch(null, 'example.com')).toBe(false);
    expect(domainMatch('example.com', null)).toBe(false);
    expect(domainMatch(undefined, 'example.com')).toBe(false);
    expect(domainMatch('example.com', undefined)).toBe(false);
    
    // IP addresses and special cases
    expect(domainMatch('192.168.1.1', '192.168.1.1')).toBe(true);
    expect(domainMatch('facebook.com:8080', 'facebook.com')).toBe(true);
  });
}); 