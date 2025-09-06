import React, { createContext, useContext, useState } from 'react';

type SearchType = 'amistad' | 'relacion' | 'citas';

interface CustomThemeContextProps {
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (state: boolean) => void;
  gradientColors: readonly [string, string]; 
}

const CustomThemeContext = createContext<CustomThemeContextProps | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchType, setSearchType] = useState<SearchType>('citas');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gradients = {
    amistad: ['#8c80e6', '#7589e2'] as const,    
    citas: ['#feb245', '#fe7981'] as const ,
    relacion: ['#ff718b', '#ff718b'] as const,
    menu: ['#ffb1c7', '#ffb1c7'] as const,       
  };

  const gradientColors = isMenuOpen ? gradients.menu : gradients[searchType];

  return (
    <CustomThemeContext.Provider
      value={{
        searchType,
        setSearchType,
        isMenuOpen,
        setIsMenuOpen,
        gradientColors,
      }}
    >
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme debe usarse dentro de CustomThemeProvider');
  }
  return context;
};
