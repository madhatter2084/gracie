/**
 * Local Storage Helper Functions
 * Safe localStorage operations with fallbacks
 */

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, 'test');
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Get item from localStorage with JSON parsing
 */
export function getStorageItem(key, defaultValue = null) {
    if (!isLocalStorageAvailable()) {
        return defaultValue;
    }

    try {
        const item = localStorage.getItem(key);
        if (item === null) {
            return defaultValue;
        }
        return JSON.parse(item);
    } catch (error) {
        console.warn(`Error reading from localStorage for key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Set item in localStorage with JSON serialization
 */
export function setStorageItem(key, value) {
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }

    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Error writing to localStorage for key "${key}":`, error);
        return false;
    }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key) {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn(`Error removing from localStorage for key "${key}":`, error);
        return false;
    }
}

/**
 * Clear all localStorage items
 */
export function clearStorage() {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.warn('Error clearing localStorage:', error);
        return false;
    }
}

/**
 * Get all localStorage keys
 */
export function getStorageKeys() {
    if (!isLocalStorageAvailable()) {
        return [];
    }

    try {
        return Object.keys(localStorage);
    } catch (error) {
        console.warn('Error getting localStorage keys:', error);
        return [];
    }
}

/**
 * Check if key exists in localStorage
 */
export function hasStorageItem(key) {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    try {
        return localStorage.getItem(key) !== null;
    } catch (error) {
        console.warn(`Error checking localStorage for key "${key}":`, error);
        return false;
    }
}

/**
 * Get storage usage information
 */
export function getStorageInfo() {
    if (!isLocalStorageAvailable()) {
        return { available: false };
    }

    try {
        let totalSize = 0;
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            totalSize += localStorage.getItem(key).length;
        });

        return {
            available: true,
            totalKeys: keys.length,
            totalSize: totalSize,
            totalSizeKB: Math.round(totalSize / 1024 * 100) / 100
        };
    } catch (error) {
        console.warn('Error getting storage info:', error);
        return { available: false };
    }
}

/**
 * Session Storage helpers (similar to localStorage but for session only)
 */

/**
 * Check if sessionStorage is available
 */
function isSessionStorageAvailable() {
    try {
        const test = '__sessionStorage_test__';
        sessionStorage.setItem(test, 'test');
        sessionStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Get item from sessionStorage with JSON parsing
 */
export function getSessionItem(key, defaultValue = null) {
    if (!isSessionStorageAvailable()) {
        return defaultValue;
    }

    try {
        const item = sessionStorage.getItem(key);
        if (item === null) {
            return defaultValue;
        }
        return JSON.parse(item);
    } catch (error) {
        console.warn(`Error reading from sessionStorage for key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Set item in sessionStorage with JSON serialization
 */
export function setSessionItem(key, value) {
    if (!isSessionStorageAvailable()) {
        console.warn('sessionStorage is not available');
        return false;
    }

    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Error writing to sessionStorage for key "${key}":`, error);
        return false;
    }
}

/**
 * Remove item from sessionStorage
 */
export function removeSessionItem(key) {
    if (!isSessionStorageAvailable()) {
        return false;
    }

    try {
        sessionStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn(`Error removing from sessionStorage for key "${key}":`, error);
        return false;
    }
}

/**
 * In-memory storage fallback for when neither localStorage nor sessionStorage is available
 */
class MemoryStorage {
    constructor() {
        this.storage = new Map();
    }

    getItem(key, defaultValue = null) {
        return this.storage.has(key) ? this.storage.get(key) : defaultValue;
    }

    setItem(key, value) {
        this.storage.set(key, value);
        return true;
    }

    removeItem(key) {
        this.storage.delete(key);
        return true;
    }

    clear() {
        this.storage.clear();
        return true;
    }

    keys() {
        return Array.from(this.storage.keys());
    }

    hasItem(key) {
        return this.storage.has(key);
    }
}

// Create fallback storage instance
const memoryStorage = new MemoryStorage();

/**
 * Universal storage functions that fall back to memory storage
 */
export function universalGet(key, defaultValue = null) {
    const result = getStorageItem(key, undefined);
    if (result !== undefined) return result;
    
    const sessionResult = getSessionItem(key, undefined);
    if (sessionResult !== undefined) return sessionResult;
    
    return memoryStorage.getItem(key, defaultValue);
}

export function universalSet(key, value, useSession = false) {
    if (useSession && setSessionItem(key, value)) {
        return true;
    }
    
    if (setStorageItem(key, value)) {
        return true;
    }
    
    return memoryStorage.setItem(key, value);
}

export function universalRemove(key) {
    removeStorageItem(key);
    removeSessionItem(key);
    memoryStorage.removeItem(key);
    return true;
}