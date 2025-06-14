/**
 * @jest-environment node
 */

// Set test environment flag
process.env.NODE_ENV = 'test';

// Mock Chrome API before importing the module
global.chrome = {
  runtime: {
    onInstalled: {
      addListener: jest.fn()
    }
  },
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn()
    }
  }
};

// Import storage module to spy on the seeding function
const storageModule = require('../../src/background/storage.js');
jest.spyOn(storageModule, 'seedDefaultDomainsIfNeeded');

// Import the module
const { handleInstalled, init } = require('../../src/background/install.js');

describe('Extension Installation', () => {
  beforeEach(() => {
    // Clear all mock calls between tests
    jest.clearAllMocks();
  });

  test('init registers onInstalled listener', () => {
    // Call init to register the listener
    init();
    
    // Verify the listener was added
    expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalledWith(handleInstalled);
  });

  test('handleInstalled calls seedDefaultDomainsIfNeeded', () => {
    // Simulate the onInstalled event
    handleInstalled();
    
    // Verify seedDefaultDomainsIfNeeded was called
    expect(storageModule.seedDefaultDomainsIfNeeded).toHaveBeenCalled();
  });
}); 