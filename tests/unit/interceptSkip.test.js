/**
 * Unit tests for the shouldIntercept function
 * Tests FR-014: If blockedDomains is empty, interception logic is skipped entirely
 */

// Mock the storage module
jest.mock('../../src/background/storage', () => ({
  getBlockedDomains: jest.fn()
}));

// Import the mocked dependencies
const { getBlockedDomains } = require('../../src/background/storage');

// Import the module to test (this will fail until we create it)
const { shouldIntercept } = require('../../src/background/intercept');

describe('shouldIntercept', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('returns false when blockedDomains is empty', async () => {
    // Mock getBlockedDomains to return an empty array
    getBlockedDomains.mockResolvedValue([]);
    
    // Call the function under test
    const result = await shouldIntercept();
    
    // Assert the function returns false when list is empty
    expect(result).toBe(false);
    
    // Verify that getBlockedDomains was called
    expect(getBlockedDomains).toHaveBeenCalledTimes(1);
  });
  
  test('returns true when blockedDomains has items', async () => {
    // Mock getBlockedDomains to return a non-empty array
    getBlockedDomains.mockResolvedValue(['example.com']);
    
    // Call the function under test
    const result = await shouldIntercept();
    
    // Assert the function returns true when list has items
    expect(result).toBe(true);
    
    // Verify that getBlockedDomains was called
    expect(getBlockedDomains).toHaveBeenCalledTimes(1);
  });
}); 