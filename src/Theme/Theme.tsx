import React, { createContext, useContext, ReactNode } from "react";

interface ThemeContextProps {
  themeColor: string;
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{
  themeColor: string;
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
}> = ({ themeColor, setThemeColor, children }) => {
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
