import { useState, useEffect } from 'react';

/**
 * Custom hook that delays the update of a value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay time in milliseconds
 * @returns {any} - The debounced value
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear the timeout if the value or delay changes
    // or if the component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;