import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type Product = {
//   box_condition: string;
//   brand_name: string;
//   category: string[];
//   collection_slugs: string[];
//   color: string;
//   designer: string;
//   details: string | null;
//   gender: string[];
//   grid_picture_url: string;
//   has_picture: boolean;
//   has_stock: boolean;
//   id: number;
//   keywords: string[];
//   main_picture_url: string;
//   midsole: string | null;
//   name: string;
//   nickname: string;
//   original_picture_url: string;
//   product_template_id: number;
//   release_date: string | null;
//   release_date_unix: number | null;
//   release_year: number | null;
//   retail_price_cents: number | 0;
//   shoe_condition: string;
//   silhouette: string;
//   size_range: number[];
//   sku: string;
//   slug: string;
//   status: string;
//   story_html: string | null;
//   upper_material: string | null;
//   quantity?: number;
//   totalPrice?: number;
// };

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
  quantity: number;
  totalPrice: number;
  selectedSize: number;
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
    addToCart(state, action: PayloadAction<Product>) {
      const productInCart = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      if (productInCart) {
        const tempCart = state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            const tempQty: number = !product.quantity
              ? 1
              : product.quantity + action.payload.quantity;
            const tempTotalPrice: number =
              product.quantity * (product.retail_price_cents / 100);
            if (product.selectedSize !== action.payload.selectedSize) {
              return {
                ...product,
                selectedSize: action.payload.selectedSize,
              };
            }

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
      }
      if (!action.payload.quantity) {
        action.payload.quantity = 1;
      }
      if (!action.payload.totalPrice) {
        action.payload.totalPrice = action.payload.retail_price_cents / 100;
      }

      state.cartProducts.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const tempCart = state.cartProducts.filter(
        (product) => product.id !== id
      );
      state.cartProducts = tempCart;
    },
    clearCart(state) {
      state.cartProducts = [];
    },
    getTotal(state) {
      state.totalAmount = state.cartProducts?.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItems = state.cartProducts.length;
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      state.cartProducts = state.cartProducts.map((product) => {
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
      state.cartProducts = state.cartProducts.map((product) => {
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
export const cart = (state) => state.cart;
export default cartSlice.reducer;
