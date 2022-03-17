import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (itemInCart) => itemInCart.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((itemInCart) => 
            itemInCart.product === isItemExist.product ? item : 1
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state, 
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    default:
      return state;
  }
};
