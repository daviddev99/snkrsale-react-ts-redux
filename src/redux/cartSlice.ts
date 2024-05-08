import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  box_condition: string;
  brand_name: string;
  category: string[];
  collection_slugs: string[];
  color: string;
  designer: string;
  details: string | null;
  gender: string[];
  grid_picture_url: string;
  has_picture: boolean;
  has_stock: boolean;
  id: number;
  keywords: string[];
  main_picture_url: string;
  midsole: string | null;
  name: string;
  nickname: string;
  original_picture_url: string;
  product_template_id: number;
  release_date: string | null;
  release_date_unix: number | null;
  release_year: number | null;
  retail_price_cents: number | 0;
  shoe_condition: string;
  silhouette: string;
  size_range: number[];
  sku: string;
  slug: string;
  status: string;
  story_html: string | null;
  upper_material: string | null;
  quantity?: number;
  totalPrice?: number;
};

interface cartState {
  cart: Product[];
  totalAmount: number;
  totalItems: number;
}

const initialState: cartState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const productInCart = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (productInCart) {
        const tempCart = state.cart.map((product) => {
          if (product.id === action.payload.id) {
            const tempQty: number = product.quantity + action.payload.quantity;
            const tempTotalPrice: number =
              product.quantity * (product.retail_price_cents / 100);

            return {
              ...product,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          }
        });
        state.cart = tempCart;
      }

      state.cart.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const tempCart = state.cart.filter((product) => product.id !== id);
      state.cart = tempCart;
    },
    clearCart(state) {
      state.cart = [];
    },
    getTotal(state) {
      state.totalAmount = state.cart.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItems = state.cart.length;
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      state.cart = state.cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
            totalPrice:
              (product.quantity + 1) * (product.retail_price_cents / 100),
          };
        }
        return product;
      });
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      state.cart = state.cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
            totalPrice:
              (product.quantity - 1) * (product.retail_price_cents / 100),
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
export default cartSlice.reducer;
