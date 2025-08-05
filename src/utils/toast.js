// Mock toast implementation (can be replaced with react-hot-toast later)

export const toast = {
  success: (message) => console.log('✅ SUCCESS:', message),
  error: (message) => console.log('❌ ERROR:', message),
  warn: (message) => console.log('⚠️ WARNING:', message),
  promise: (promise, options) => promise
};

export const Toaster = () => null; // Placeholder component