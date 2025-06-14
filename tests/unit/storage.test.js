/**
 * @jest-environment node
 */

// Import the module
const { 
  getBlockedDomains, 
  saveBlockedDomains, 
  seedDefaultDomainsIfNeeded,
  DEFAULT_BLOCKED_DOMAINS
} = require('../../src/background/storage.js');

// Mock Chrome API
global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn()
    }
  }
};

describe('Storage Module', () => {
  beforeEach(() => {
    // Clear all mock calls between tests
    jest.clearAllMocks();
  });

  describe('getBlockedDomains', () => {
    test('returns default domains on first run (empty storage)', async () => {
      // Mock chrome.storage.sync.get to simulate first run (undefined storage)
      chrome.storage.sync.get.mockImplementation((key, callback) => {
        callback({}); // Empty object = key not found in storage
      });
      
      const domains = await getBlockedDomains();
      
      // Verify chrome.storage.sync.get was called correctly
      expect(chrome.storage.sync.get).toHaveBeenCalledWith('blockedDomains', expect.any(Function));
      
      // Verify it returns the default domains
      expect(domains).toEqual(DEFAULT_BLOCKED_DOMAINS);
    });

    test('returns stored domains when available', async () => {
      const storedDomains = ['example.com', 'test.com'];
      
      // Mock chrome.storage.sync.get to return stored domains
      chrome.storage.sync.get.mockImplementation((key, callback) => {
        callback({ blockedDomains: storedDomains });
      });
      
      const domains = await getBlockedDomains();
      
      // Verify chrome.storage.sync.get was called correctly
      expect(chrome.storage.sync.get).toHaveBeenCalledWith('blockedDomains', expect.any(Function));
      
      // Verify it returns the stored domains
      expect(domains).toEqual(storedDomains);
    });
  });

  describe('saveBlockedDomains', () => {
    test('saves domains to chrome.storage.sync', async () => {
      const domainsToSave = ['example.com', 'test.com'];
      
      // Mock chrome.storage.sync.set to simulate successful save
      chrome.storage.sync.set.mockImplementation((data, callback) => {
        callback();
      });
      
      await saveBlockedDomains(domainsToSave);
      
      // Verify chrome.storage.sync.set was called with correct data
      expect(chrome.storage.sync.set).toHaveBeenCalledWith(
        { blockedDomains: domainsToSave },
        expect.any(Function)
      );
    });
  });

  describe('seedDefaultDomainsIfNeeded', () => {
    test('seeds default domains when storage is empty', async () => {
      // Mock getBlockedDomains to return defaults (indicating empty storage)
      chrome.storage.sync.get.mockImplementation((key, callback) => {
        callback({});
      });
      
      // Mock set to capture the save operation
      chrome.storage.sync.set.mockImplementation((data, callback) => {
        callback();
      });
      
      await seedDefaultDomainsIfNeeded();
      
      // Verify defaults were saved to storage
      expect(chrome.storage.sync.set).toHaveBeenCalledWith(
        { blockedDomains: DEFAULT_BLOCKED_DOMAINS },
        expect.any(Function)
      );
    });
    
    test('does not seed when domains already exist', async () => {
      const existingDomains = ['already.com', 'exists.com'];
      
      // Mock getBlockedDomains to return existing domains
      chrome.storage.sync.get.mockImplementation((key, callback) => {
        callback({ blockedDomains: existingDomains });
      });
      
      await seedDefaultDomainsIfNeeded();
      
      // Verify chrome.storage.sync.set was not called
      expect(chrome.storage.sync.set).not.toHaveBeenCalled();
    });
  });
}); 