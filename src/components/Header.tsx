import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { cart, getTotal } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const { totalItems, cartProducts } = useSelector(cart);
  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch,cartProducts,totalItems]);
  return (
    <header className="w-full h-20 flex items-center bg-[#f2f2f2]">
      <div className="w-[75%] max-w-7xl m-auto flex justify-between ">
        <Link to={"/"} className="text-3xl font-bold ">
          SNKR.<span className="text-[.8em]">sale</span>
        </Link>

        <nav>
          <Link to={"/cart"} className="relative">
            {cartProducts.length === 0 ? (
              ""
            ) : (
              <div className="absolute bg-black p-2 rounded-full w-5 text-white flex items-center justify-center h-5 -top-3 -right-3">
                {" "}
                <p className="font-bold">{totalItems}</p>
              </div>
            )}
            <BiShoppingBag className="text-2xl" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
