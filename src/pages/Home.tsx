
import { Link } from "react-router-dom";
import { data } from "../db/data.js";
import heroimg from "../assets/img/hero_img.webp";
import offert from "../assets/img/offert.png";
import Nike from "../assets/img/collection1.png";
import Adidas from "../assets/img/collection2.png";
import new1 from "../assets/img/new1.png";
import new2 from "../assets/img/new2.png";
import new3 from "../assets/img/new3.png";
import new4 from "../assets/img/new4.png";
import new5 from "../assets/img/new5.png";

export const Home = () => {
  const products = data.sneakers;

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

  const tempProducts: Product[] = [];

  if (products.length > 0) {
    for (const i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);
      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }
  return (
    <>
      <section className="w-full bg-[#f2f2f2]">
        <div className="w-[75%] max-w-7xl flex flex-col-reverse justify-end mx-auto  md:flex-row md:justify-between pb-16">
          <div className=" md:text-nowrap flex flex-col h-fit md:pt-10">
            <p>New in</p>
            <h3 className="xl:text-6xl md:text-4xl text-3xl font-bold mt-4 md:mt-8">
              AIR JORDAN 1
            </h3>
            <h3 className="xl:text-6xl md:text-4xl text-3xl font-bold mb-4 md:mb-8">
              RETRO HIGH OG
            </h3>
            <p>Explore the new collections of sneakers</p>
            <Link
              to={"/products"}
              className="p-3 bg-black text-white w-fit rounded-md mt-4 md:mt-10"
            >
              Explore now
            </Link>
          </div>
          <div className="xl:w-full">
            <img
              src={heroimg}
              className=" drop-shadow-2xl float-start"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="w-[75%] mx-auto items-center flex flex-col py-12 max-w-7xl h-full ">
          <h3 className=" border-t-2 border-black p-2 text-2xl mb-10 font-bold">
            FEATURED
          </h3>
          <div className=" featured-products md:w-fit lg:w-full ">
            {tempProducts.slice(0, 3).map((product) => {
              return (
                <div
                  className="flex max-w-md flex-col relative hover:scale-105 duration-150 justify-center py-8 bg-[#f2f2f2] text-center"
                  key={product.id}
                >
                  <Link to={`/products/${product.id}`} className="mx-auto">
                    <img
                      src={product.grid_picture_url}
                      alt=""
                      className="max-w-60"
                    />
                  </Link>
                  <div className="text-md bg-black w-fit text-white p-2 top-5 left-2 absolute -rotate-90">
                    Sale
                  </div>

                  <div className="flex flex-col gap-4">
                    <p className="font-bold pl-4 max-w-[23ch] whitespace-nowrap text-ellipsis overflow-hidden">
                      {product.name}
                    </p>
                    <p className="text-2xl font-bold">
                      ${product.retail_price_cents / 100}
                    </p>
                    <Link
                      to={`/products/${product.id}`}
                      className="hover:font-bold duration-150"
                    >
                      Show product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex gap-14 flex-col md:flex-row">
            <Link
              to={"products?brand=nike"}
              className="bg-[#f2f2f2] hover:scale-105 duration-150 flex flex-col relative w-full gap-4 pt-0 pr-0 md:flex-row"
            >
              <div
                className="p-4 flex flex-col bg-black/20 w-full gap-2 items-start absolute bottom-0
          bg-white bg-opacity-20 shadow-md backdrop-blur-md 
          "
              >
                <h3 className="text-2xl font-bold">Nike</h3>
                <p>New collection 2024</p>
                <button className="hover:font-bold duration-150">
                  Buy now
                </button>
              </div>
              <img src={Nike} className="w-full " alt="" />
            </Link>
            <Link
              to={"products?brand=adidas"}
              className="bg-[#f2f2f2] hover:scale-105 duration-150  flex flex-col relative w-full gap-4 pt-0 pr-0 md:flex-row"
            >
              <div
                className="p-4 flex flex-col bg-black/20 w-full gap-2 items-start absolute bottom-0
          bg-white bg-opacity-20 shadow-md backdrop-blur-md 
          "
              >
                <h3 className="text-2xl font-bold">Adidas</h3>
                <p>New collection 2024</p>
                <button className="hover:font-bold duration-150">
                  Buy now
                </button>
              </div>
              <img src={Adidas} className="w-full" alt="" />
            </Link>
          </div>
          <div className="mt-14 w-[100vw] sm:w-full flex justify-center bg-[#f2f2f2] h-72 px-8">
            <div className=" flex flex-col my-auto gap-2 py-8 ">
              <h3 className="font-bold text-2xl md:text-5xl text-nowrap">
                50% OFF!
              </h3>
              <p className="text-sm">in Adidas sneakers</p>
              <Link
                to={`/products?brand=adidas`}
                className="p-3 text-nowrap text-sm bg-black text-white w-fit rounded-md"
              >
                Explore products
              </Link>
            </div>
            <img src={offert} alt="" className="h-60" />
          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="w-[75%] mx-auto items-center flex flex-col py-12 max-w-7xl h-full  ">
          <h3 className=" border-t-2 border-black p-2 text-2xl mb-10 font-bold">
            NEW COLLECTION
          </h3>
          <div className="w-full flex flex-col gap-8 md:flex-row ">
            <div className="bg-[#f2f2f2] flex flex-col md:w-[500px] p-4 justify-center hover:scale-105 duration-150">
              <img src={new1} alt="" className="w-64 mx-auto" />
              <h3 className="text-2xl font-bold mt-8">Men&apos;s shoes</h3>
              <p>From $79.99</p>
              <Link
                to={`/products?gender=men&sort=Price%3A+High+to+Low`}
                className="mt-5 w-fit hover:font-bold duration-150"
              >
                View collection
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 w-full sm:grid-cols-2">
              <div className="sneaker-card bg-[#f2f2f2] px-4 flex items-center justify-center relative overflow-hidden h-full">
                <img className="mix-blend-multiply w-56  " src={new2} alt="" />
                <div className="sneaker-card-overlay">
                  <Link
                    to={`products?query=yeezy`}
                    className="bg-black text-white p-2"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
              <div className="sneaker-card bg-[#f2f2f2] px-4 flex items-center justify-center relative overflow-hidden ">
                <img className="mix-blend-multiply w-56  " src={new3} alt="" />
                <div className="sneaker-card-overlay">
                  <Link
                    to={`products?query=yeezy`}
                    className="bg-black text-white p-2"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
              <div className="sneaker-card bg-[#f2f2f2] px-4 flex items-center justify-center relative overflow-hidden ">
                <img className="mix-blend-multiply w-56  " src={new4} alt="" />
                <div className="sneaker-card-overlay">
                  <Link
                    to={`products?query=yeezy`}
                    className="bg-black text-white p-2"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
              <div className="sneaker-card bg-[#f2f2f2] px-4 flex items-center justify-center relative overflow-hidden ">
                <img className="mix-blend-multiply w-56  " src={new5} alt="" />
                <div className="sneaker-card-overlay">
                  <Link
                    to={`products?query=yeezy`}
                    className="bg-black text-white p-2"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
