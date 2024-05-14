import { data } from "../db/data";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductPage() {
  const { id } = useParams();
  const numberId = Number(id);
  const product = data.sneakers.find((product) => product.id === numberId);
  const dispatch = useDispatch();
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

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSize = Number(searchParams.get("size"));

  const addToCartHandler = (product: Product) => {
    if (!selectedSize) {
      console.error("You dont have selected any size!");
      return;
    } else {
      dispatch(
        addToCart({
          ...product,
          selectedSize: selectedSize,
        }),
        console.log(product)
      );
    }
  };

  console.log(product);
  return (
    <section className="w-full  my-6">
      <div className="w-[90%] container max-w-7xl mx-auto">
        <div className="md:flex md:items-center">
          <div className="w-full h-64 md:w-1/2 lg:h-96">
            <img
              className="h-full w-full rounded-md object-contain max-w-lg mx-auto"
              src={product?.grid_picture_url}
              alt="Nike Air"
            />
          </div>
          <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <h3 className="text-gray-700 uppercase font-bold text-lg">
              {product?.name}
            </h3>
            <span className="text-gray-500 font-light text-3xl mt-3">
              ${product?.retail_price_cents / 100}
            </span>
            <hr className={`${product?.story_html ? "my-3" : "hidden"}`} />
            <p className="text-gray-600">{product?.story_html}</p>
            <hr className="my-3" />
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 font-light text-2xl">SIZE</span>
              <ul className="flex gap-2 flex-wrap">
                {product?.size_range?.map((size) => {
                  return (
                    <li
                      key={size}
                      className={
                        selectedSize === size
                          ? "py-1 px-2 rounded-md text-white hover:scale-105 duration-150 cursor-pointer bg-gray-500 border-4 border-indigo-600"
                          : "py-1 px-2 rounded-md text-white hover:scale-105 duration-150 cursor-pointer bg-gray-500 border-2 border-transparent"
                      }
                      value={size}
                      onClick={() => {
                        searchParams.set("size", size.toString());
                        setSearchParams(searchParams, {
                          replace: true,
                        });
                      }}
                    >
                      {size}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center mt-6">
              <button
                onClick={() => {
                  addToCartHandler(product);
                }}
                className="px-6 py-4 flex gap-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              >
                Order Now
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* <Toaster position="top-center" /> */}
        </div>
      </div>
    </section>
  );
}
