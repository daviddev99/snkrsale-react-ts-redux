import React from "react";
import { Link } from "react-router-dom";
type ProductItemProps = {
  product: Product;
};

interface Product {
  brand_name: string;
  category: string[];
  designer: string;
  gender: string[];
  grid_picture_url: string;
  id: number;
  main_picture_url: string;
  name: string;
  original_picture_url: string;
  retail_price_cents: number;
  size_range: number[];
  story_html: string;
  selectedSize?: number;
  totalPrice?: number;
  quantity?: number;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const price = product.retail_price_cents / 100;

  return (
    <article
      key={product.id}
      className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 duration-150"
    >
      <Link to={`/products/${product.id}`}>
        <img
          className=" w-64 mx-auto hover:-rotate-12 duration-150"
          src={product?.grid_picture_url}
          alt="Converse sneakers"
        />
      </Link>

      <div className="flex flex-col gap-1 mt-4 px-4">
        <h2 className=" font-semibold text-ellipsis text-nowrap overflow-hidden text-gray-800 ">
          {product.name}
        </h2>
        <span className="font-semibold text-2xl text-gray-800">${price}</span>
      </div>

      <div className="mt-4 p-4 border-t border-gray-200 ">
        <Link
          to={`/products/${product.id}`}
          className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 "
        >
          <span className="text-base">Show product</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};
