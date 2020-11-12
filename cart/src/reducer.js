const reducer = (state, action) => {
  if(action.type === 'CLEAR_CART') {
    return {...state, cart: []}
  };

  if(action.type === 'REMOVE') {
    return {
      ...state, 
      cart: state.cart.filter (
        cartItem => cartItem.id !== action.productId 
      ),
    };
  };

  if(action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart.map(cartItem => {
      if(cartItem.id === action.product.id) {
        let total = cartItem.amount;
        action.product.type === 'INCREASE' && (total += 1); 
        action.product.type === 'DECREASE' && (total -= 1); 

        return {
          ...cartItem,
          amount: total
        };
      };

      return cartItem;
    }).filter(cartItem => cartItem.amount !== 0);

    return {...state, cart: tempCart}
  };

  if(action.type === 'GET_TOTAL') {
    let {total, amount} = state.cart.reduce (
      (cartTotal, cartItem) => {
        const {price, amount} = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      }, { total: 0, amount: 0 }
    );

    total = Number(total.toFixed(2));
    
    return {
      ...state, 
      total, 
      amount
    };
  };

  if(action.type === 'LOADING') {
    return { ...state, loading: true };
  };

  if(action.type === 'DISPLAY_ITEMS') {
    return { 
      ...state, 
      cart: action.cart, 
      loading: false,
    };
  };

  throw new Error('NO MATCHING ACTION TYPE');
};

export default reducer;