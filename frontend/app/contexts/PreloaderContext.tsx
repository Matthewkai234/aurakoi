"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface PreloaderContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const stopLoading = () => {
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <PreloaderContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
}