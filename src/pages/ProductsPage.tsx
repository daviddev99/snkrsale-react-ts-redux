import { useSearchParams } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import React from "react";
import { data } from "../db/data";
import { sortOptions } from "../consts.ts";
import { Filters } from "../components/Filters.tsx";
import { Skeleton } from "../components/Skeleton.tsx";
import { useDebouncedCallback } from "use-debounce";
import FiltersMobile from "../components/FiltersMobile.tsx";
import { NoResults } from "../components/NoResults.tsx";
import { ProductItem } from "../components/ProductItem.tsx";

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
  const [openMobileFilters, setOpenMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const selectedPage = Number(searchParams.get("page")) || 1;
  const selectedSort = searchParams.get("sort");
  const selectedGender = searchParams.get("gender");
  const selectedCategory = searchParams.get("category");
  const selectedBrand = searchParams.get("brand");
  const query = searchParams.get("query") || "";

  const productsToShow = 9;

  const products = data.sneakers;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter((product) =>
        product.brand_name.toLowerCase().includes(selectedBrand.toLowerCase())
      );
    }
    if (selectedGender) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.gender[0].toLowerCase() === selectedGender.toLowerCase()
      );
    }
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category[0]
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
      );
    }
    if (query?.length > 0) {
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
      setFilteredAndSortedProducts(
        filteredProducts.slice(0, selectedPage * productsToShow)
      );
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
    selectedPage,
    setSearchParams,
  ]);

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    500
  );

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
        <div className="flex md:w-full">
          <Filters />

          {isLoading ? (
            <Skeleton />
          ) : filteredAndSortedProducts.length === 0 ? (
            <NoResults />
          ) : (
            <div className=" grid grid-cols-2 md:grid-cols-3 w-[100vw] gap-2 h-fit  bg-[#f2f2f2] p-2 md:w-full md:gap-3 md:p-3 ">
              {filteredAndSortedProducts.map((product) => {
                return <ProductItem product={product} key={product.id} />;
              })}
            </div>
          )}
        </div>
        <button
          className="py-2 px-4 bg-black text-white mt-10"
          onClick={() => {
            searchParams.set("page", (selectedPage + 1).toString());
            setSearchParams(searchParams, {
              replace: true,
            });
          }}
        >
          Show more products
        </button>
        <FiltersMobile
          openMobileFilters={openMobileFilters}
          setOpenMobileFilters={setOpenMobileFilters}
        />
      </div>
    </section>
  );
}
