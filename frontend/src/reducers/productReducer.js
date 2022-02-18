import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, actions) => {
  switch (actions.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: actions.payload.products,
        productCounts: actions.payload.productsCounts,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: actions.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
