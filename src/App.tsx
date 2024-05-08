import { Link, Routes, Route } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import { Home } from "./pages/Home.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";

function App() {
  return (
    <>
      <header className="w-full h-20 flex items-center bg-[#f2f2f2]">
        <div className="w-[75%] max-w-7xl m-auto flex justify-between ">
          <Link to={"/"} className="text-3xl font-bold ">
            SNKR.<span className="text-[.8em]">sale</span>
          </Link>

          <nav>
            <Link to={"/cart"} className="relative">
              <BiShoppingBag className="text-2xl" />
            </Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <footer className="w-full py-10">
        <div className="w-[75%] max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div>
              <h4 className="font-bold text-xl mb-4">SNKR.sale</h4>
              <ul className=" flex flex-col gap-2">
                <li>New Collection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Explore</h4>
              <ul className=" flex flex-col gap-2">
                <li>Home</li>
                <li>Featured</li>
                <li>Products</li>
                <li>New</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Support</h4>
              <ul className=" flex flex-col gap-2">
                <li>Product Help</li>
                <li>Customer Care</li>
                <li>Authorized service</li>
              </ul>
            </div>
            <div className="">
              <ul className=" grid grid-cols-2 gap-8 text-2xl">
                <li>
                  <FaFacebook />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaTwitter />
                </li>
                <li>
                  <FaGoogle />
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full text-center mt-8">
            <span className="text-gray-500 ">David Abed 2024 &copy;</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
