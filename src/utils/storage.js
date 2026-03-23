export function setStorage(key, value) {
  try {
    const finalValue =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, finalValue);
  } catch (error) {
    console.error(`Failed to set localStorage key: ${key}`, error);
  }
}

export function getStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) return defaultValue;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error(`Failed to get localStorage key: ${key}`, error);
    return defaultValue;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage key: ${key}`, error);
  }
}

export function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Failed to clear localStorage", error);
  }
}