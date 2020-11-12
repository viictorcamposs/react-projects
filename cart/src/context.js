import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const remove = (id) => {
    dispatch({ type: 'REMOVE', productId: id });
  };

  const cartAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', product: {id, type} });
  };

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });

    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: 'DISPLAY_ITEMS', cart });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        cartAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
};

export { AppContext, AppProvider };
