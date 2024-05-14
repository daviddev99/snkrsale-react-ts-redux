import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  cart,
  getTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { IoTrashOutline } from "react-icons/io5";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useEffect } from "react";

export default function CartPage() {
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
  const dispatch = useDispatch();
  const { cartProducts, totalAmount, totalItems } = useSelector(cart);
  useEffect(()=>{
    dispatch(getTotal())
  },[dispatch,cartProducts])
  return (
    <section className=" w-screen ">
      <div className="w-[75%] max-w-7xl mx-auto flex flex-col md:flex-row justify-center">
        {cartProducts.length === 0 ? (
          <div className="container flex items-center px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
              <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                No products here...
              </h1>
              <p className="mt-4 text-gray-500 ">You can</p>

              <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <Link to={"/products"}>See our products</Link>
                </button>

                <Link
                  to={"/"}
                  className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 "
                >
                  Take me home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col h-fit gap-4 pt-4">
              <p className="text-blue-900 text-xl font-extrabold">My cart</p>

              {cartProducts?.map((product: Product) => {
                return (
                  <div
                    className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm"
                    key={product?.id}
                  >
                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-28 h-28">
                          <img
                            className="w-50 object-contain aspect-square"
                            src={product?.grid_picture_url}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-lg text-gray-800 text-balance font-semibold">
                            {product?.name} - SIZE {product.selectedSize}
                          </p>
                        </div>
                      </div>
                      <div className="self-center text-center">
                        <p className="text-gray-800 flex gap-2 flex-nowrap font-normal text-xl">
                          <span>$</span> {product.totalPrice}
                        </p>
                      </div>
                      <div className="self-center">
                        <button
                          className=""
                          onClick={() =>
                            dispatch(removeFromCart({ id: product.id }))
                          }
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-1">
                      <FaPlusCircle
                        onClick={() =>
                          dispatch(increaseQuantity({ id: product.id }))
                        }
                        className="w-5 h-5 text-white bg-gray-600 text-center rounded-full border border-gray-300"
                      >
                        +
                      </FaPlusCircle>
                      <p>{product?.quantity}</p>
                      <FaMinusCircle
                        onClick={() => {
                          if (product.quantity === 1) {
                            dispatch(removeFromCart({ id: product.id }));
                            return;
                          }
                          dispatch(decreaseQuantity({ id: product.id }));
                        }}
                        className="w-5 h-5 text-white bg-gray-600 text-center rounded-full border border-gray-300"
                      >
                        -
                      </FaMinusCircle>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
              <p className="text-blue-900 text-xl font-extrabold">
                Purchase Resume
              </p>
              <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                <div className="flex flex-row justify-between">
                  <p className="text-gray-600">Subtotal ({totalItems} Items)</p>
                  <p className="text-end font-bold">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
                <hr className="bg-gray-200 h-0.5" />
                <div className="flex flex-row justify-between">
                  <p className="text-gray-600">Freight</p>
                  <div>
                    <p className="text-end font-bold">$3.90</p>
                    <p className="text-gray-600 text-sm font-normal">
                      Arrives on Jul 16
                    </p>
                  </div>
                </div>
                <hr className="bg-gray-200 h-0.5" />
                <div className="flex flex-row justify-between">
                  <p className="text-gray-600">Discount Coupon</p>
                  <a className="text-gray-500 text-base underline" href="#">
                    Add
                  </a>
                </div>
                <hr className="bg-gray-200 h-0.5" />
                <div className="flex flex-row justify-between">
                  <p className="text-gray-600">Total</p>
                  <div>
                    <p className="text-end font-bold">
                      ${(totalAmount + 3.9).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                    FINISH
                  </button>
                  <Link
                    to={"/products"}
                    className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-center text-hover shadow-md"
                  >
                    ADD MORE PRODUCTS
                  </Link>
                </div>
                <button
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                  className="bg-red-600 flex gap-2 justify-center items-center font-normal text-white p-2"
                >
                  CLEAR CART <IoTrashOutline className="text-2xl font-bold" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
