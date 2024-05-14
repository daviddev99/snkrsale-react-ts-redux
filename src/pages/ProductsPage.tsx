import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import React from "react";
import { data } from "../db/data";
import { sortOptions } from "../consts.ts";
import { Filters } from "../components/Filters.tsx";
import { Skeleton } from "../components/Skeleton.tsx";
import { useDebouncedCallback } from "use-debounce";

export default function ProductsPage() {
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
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    Product[]
  >([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openMobileFilters, setOpenMobileFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const selectedPage = Number(searchParams.get("page")) || 9;
  const selectedSort = searchParams.get("sort");
  const selectedGender = searchParams.get("gender");
  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");
  const query = searchParams.get("query") || "";

  const products = data.sneakers;

  useEffect(() => {
    let filteredProducts = [...products];

    if (selectedBrand || selectedCategory || selectedGender) {
      searchParams.delete("page");
    }

    if (selectedBrand) {
      searchParams.delete("page");
      filteredProducts = filteredProducts.filter((product) =>
        product.brand_name.toLowerCase().includes(selectedBrand.toLowerCase())
      );
    }
    if (selectedGender) {
      searchParams.delete("page");
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.gender[0].toLowerCase() === selectedGender.toLowerCase()
      );
    }
    if (selectedCategory) {
      searchParams.delete("page");
      filteredProducts = filteredProducts.filter((product) =>
        product.category[0]
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
      );
    }
    if (query?.length > 0) {
      searchParams.delete("page");
      searchParams.delete("gender");
      searchParams.delete("category");
      searchParams.delete("brand");
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.brand_name.toLowerCase().includes(query.toLowerCase()) ||
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.designer.toLowerCase().includes(query.toLowerCase())
      );
    }

    switch (selectedSort) {
      case "Price: Low to High":
        filteredProducts = filteredProducts.sort(
          (a, b) => a.retail_price_cents - b.retail_price_cents
        );
        break;
      case "Price: High to Low":
        filteredProducts = filteredProducts.sort(
          (a, b) => b.retail_price_cents - a.retail_price_cents
        );
        break;

      default:
        "Most popular";
        break;
    }

    setTimeout(() => {
      setIsLoading(false);
      setFilteredAndSortedProducts(filteredProducts);
    }, 500);
    setIsLoading(true);
  }, [
    products,
    selectedBrand,
    searchParams,
    selectedCategory,
    selectedGender,
    query,
    selectedSort,
  ]);

  const handleSearchChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length === 0) {
      searchParams.delete("query");
      setSearchParams(searchParams, {
        replace: true,
      });
    } else {
      searchParams.delete("sort");
      searchParams.delete("category");
      searchParams.delete("brand");
      searchParams.delete("gender");
      searchParams.set("query", text);
      setSearchParams(searchParams, {
        replace: true,
      });
    }
  }, 500);

  return (
    <section className="w-full bg-white">
      <div className="w-[75%] mx-auto items-center flex flex-col py-12 max-w-7xl h-full ">
        <h3 className=" border-t-2 border-black p-2 text-2xl mb-8 font-bold">
          PRODUCTS
        </h3>
        <div className=" w-full flex  pb-4">
          <h3 className="text-2xl font-bold hidden text-nowrap md:block">
            New Arrivals
          </h3>

          <div className="flex w-full gap-4 items-center flex-col md:flex-row md:justify-end">
            <div>
              <div className="flex items-center py-1 px-3 gap-2 border-[1px] rounded-2xl">
                <input
                  type="text"
                  className="outline-none"
                  onChange={handleSearchChange}
                />
                <FaSearch />
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <p>Sort:</p>
              <select
                name=""
                id=""
                value={selectedSort || "Most popular"}
                onChange={(e) => {
                  searchParams.set("sort", e.target.value);
                  setSearchParams(searchParams, {
                    replace: true,
                  });
                }}
              >
                {sortOptions.map((opt) => (
                  <option value={opt.name} key={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <FaFilter
                className="block md:hidden"
                onClick={() => setOpenMobileFilters(!openMobileFilters)}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <Filters />

          {isLoading ? (
            <Skeleton />
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="w-full sm:w-[50vw] flex items-center px-6 py-12 mx-auto">
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
                  Results not found
                </h1>
                <p className="mt-4 text-gray-500 ">
                  Here are some helpful links:
                </p>

                <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                  <Link
                    to="/products"
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100 "
                  >
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

                    <span>Go back</span>
                  </Link>

                  <Link
                    to="/"
                    className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 "
                  >
                    Take me home
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className=" grid grid-cols-2 md:grid-cols-3 w-[100vw] gap-2  bg-[#f2f2f2] p-2 md:w-full md:gap-3 md:p-3 ">
              {filteredAndSortedProducts
                .slice(0, selectedPage)
                .map((product) => {
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
                        <span className="font-semibold text-2xl text-gray-800">
                          ${price}
                        </span>
                      </div>

                      <div className="mt-4 p-4 border-t border-gray-200 ">
                        <Link
                          to={`/product/${product.id}`}
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
                })}
            </div>
          )}
        </div>
        {filteredAndSortedProducts.length > 9 || !isLoading ? (
          <button
            className="py-2 px-4 bg-black text-white mt-10"
            onClick={() => {
              searchParams.set("page", (selectedPage + 9).toString());
              setSearchParams(searchParams, {
                replace: true,
              });
            }}
          >
            Show more products
          </button>
        ) : (
          ""
        )}
        {/* <FiltersMobile openMobileFilters={openMobileFilters} setOpenMobileFilters={setOpenMobileFilters}/> */}
      </div>
    </section>
  );
}
