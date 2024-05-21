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
import { toast } from "sonner";
import { NoProducts } from "../components/NoProducts";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartProducts, totalAmount, totalItems } = useSelector(cart);
  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, cartProducts]);
  return (
    <section className=" w-screen">
      <div className="w-[75%] max-w-7xl mx-auto flex flex-col md:flex-row justify-center">
        {cartProducts.length === 0 ? (
          <NoProducts />
        ) : (
          <>
            <div className="w-full flex flex-col h-fit gap-4 pt-4">
              <p className="text-blue-900 text-xl font-extrabold">My cart</p>

              {cartProducts?.map((product) => {
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
                          onClick={() => {
                            dispatch(
                              removeFromCart({
                                id: product.id,
                                selectedSize: product.selectedSize,
                              })
                            );
                            toast.info("Product deleted from cart");
                          }}
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-1">
                      <FaPlusCircle
                        onClick={() =>
                          dispatch(
                            increaseQuantity({
                              id: product.id,
                              selectedSize: product.selectedSize,
                            })
                          )
                        }
                        className="w-5 h-5 text-white bg-gray-600 text-center rounded-full border border-gray-300"
                      >
                        +
                      </FaPlusCircle>
                      <p>{product?.quantity}</p>
                      <FaMinusCircle
                        onClick={() => {
                          if (product.quantity === 1) {
                            dispatch(
                              removeFromCart({
                                id: product.id,
                                selectedSize: product.selectedSize,
                              })
                            );
                            toast.info("Product deleted from cart");
                            return;
                          }
                          dispatch(
                            decreaseQuantity({
                              id: product.id,
                              selectedSize: product.selectedSize,
                            })
                          );
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
