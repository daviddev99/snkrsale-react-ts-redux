import { createSlice } from "@reduxjs/toolkit";


interface Product {
  brand_name: string;
  category: string[];
  designer: string;
  gender: string[];
  grid_picture_url: string;
  id: number;
  keywords: string[];
  main_picture_url: string;
  midsole: string;
  name: string;
  nickname: string;
  original_picture_url: string;
  retail_price_cents: number;
  size_range: number[];
  story_html?: string;
  quantity?: number;
  totalPrice?: number;
  selectedSize?: number;
}

interface cartState {
  cartProducts: Product[];
  totalAmount: number;
  totalItems: number;
}

const initialState: cartState = {
  cartProducts: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productInCart = state.cartProducts.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (productInCart) {
        const tempCart = state.cartProducts.map((product) => {
          if (
            product.id === action.payload.id &&
            product.selectedSize === action.payload.selectedSize
          ) {
            const tempQty = product.quantity + action.payload.quantity;
            const tempTotalPrice = (tempQty * product.retail_price_cents) / 100;

            return {
              ...product,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return product;
          }
        });
        state.cartProducts = tempCart;
      } else {
        state.cartProducts.push(action.payload);
      }
    },

    removeFromCart(state, action) {
      const { id, selectedSize } = action.payload;
      const tempCart = state.cartProducts
      const productToRemove = tempCart.find(
        (product) => product.id === id && product.selectedSize === selectedSize
      );
    
      if (productToRemove) {
        const productIndex = tempCart.indexOf(productToRemove);
        tempCart.splice(productIndex, 1);
      }
      state.cartProducts = tempCart;
    },
    clearCart(state) {
      state.cartProducts = [];
    },
    getTotal(state) {
      state.totalAmount = state.cartProducts?.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice!);
      }, 0);
      state.totalItems = state.cartProducts.length;
    },
    increaseQuantity(state, action) {
      const { id, selectedSize } = action.payload;
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.id === id && product.selectedSize === selectedSize) {
          return {
            ...product,
            quantity: product.quantity! + 1,
            totalPrice:
              (product.quantity! + 1) * (product.retail_price_cents / 100),
          };
        }
        return product;
      });
    },
    decreaseQuantity(state, action) {
      const { id, selectedSize } = action.payload;
      state.cartProducts = state.cartProducts.map((product) => {
        if (product.id === id && product.selectedSize === selectedSize) {
          return {
            ...product,
            quantity: product.quantity! - 1,
            totalPrice:
              (product.quantity! - 1) * (product.retail_price_cents / 100),
          };
        }
        return product;
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  getTotal,
  increaseQuantity,
} = cartSlice.actions;
export const cart = (state: {
  cart: {
    cartProducts: Product[],
  totalItems: 0,
  totalAmount: 0
  }
}) => state.cart;
export default cartSlice.reducer;
