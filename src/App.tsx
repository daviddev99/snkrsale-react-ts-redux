import {Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import { Toaster } from "sonner";
import { Header } from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <>
      <Header/>
      <Toaster position="bottom-right"/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
