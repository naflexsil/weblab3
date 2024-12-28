import { useState, useEffect } from "react";

function useLocalStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(
    (() => {
      const savedItem = localStorage.getItem(key);
      return savedItem ? JSON.parse(savedItem) : initialValue;
    })()
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
