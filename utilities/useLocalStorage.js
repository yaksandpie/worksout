import { useState } from 'react';


export default function useLocalStorage(key, initial) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }

      window.localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    } catch (err) {
      console.log(err);
      return initial;
    }
  });

  const setLocalStorage = (value) => {
    try {
      const item = value instanceof Function ? value(stored) : value;
      setStored(item);
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.log(err);
    }
  };

  return [stored, setLocalStorage];
}