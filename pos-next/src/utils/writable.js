// Check if key exists in local storage
// return boolean
export const hasItem = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key) ? true : false;
  }
  return false;
}

// Get item from local storage
// return object {}
export const getItem = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const result = localStorage.getItem(key);
    return JSON.parse(result);
  }
  return null;
}

// Set item in local storage
// value must be an object {}
export const setItem = (key, value) => {
  // compress value
  const newValue = JSON.stringify(value);
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(key, newValue);
  }
}

// Remove item from local storage
export const removeItem = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(key);
  }
}

export default {
  hasItem,
  getItem,
  setItem,
  removeItem,
}