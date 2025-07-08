'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  modoEscuro: boolean;
  alternarTema: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  const alternarTema = () => {
    setModoEscuro(!modoEscuro);
  };

  return (
    <ThemeContext.Provider value={{ modoEscuro, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}