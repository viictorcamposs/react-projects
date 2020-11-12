import React, { useState, useContext, useEffect, useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);

  let providerValues = {
    loading,
    cocktails,
    setSearchTerm,
    searchTerm,
  };
  
  const fetchDrinks = useCallback(async () => { 
    try {
      setLoading(true);

      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data; 
      
      if(drinks) {
        const cocktailsArr = drinks.map(drink => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
          return {
            id: idDrink,
            name: strDrink, 
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        setCocktails(cocktailsArr);
      } else {
        setCocktails([]);
      };

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks, searchTerm]);

  return (
    <AppContext.Provider value={{ ...providerValues }}>
      {children}  
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext)
};