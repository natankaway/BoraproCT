import { useState, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      
      // 🔧 CORREÇÃO: Verificar se item existe e não é null/undefined
      if (item === null || item === undefined || item === 'undefined') {
        return initialValue;
      }
      
      // Tentar fazer parse apenas se item é uma string válida
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao carregar do localStorage:`, error);
      // 🔧 CORREÇÃO: Limpar item corrompido do localStorage
      try {
        window.localStorage.removeItem(key);
      } catch (removeError) {
        console.error(`Erro ao limpar localStorage:`, removeError);
      }
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      
      if (typeof window !== 'undefined') {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar no localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};