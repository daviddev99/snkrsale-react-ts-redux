import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export const Footer = () => {
  return (
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
        <div className="w-full text-center mt-8 flex gap-4 items-center justify-center">
          <span className="text-gray-500 ">
            Made by David Abed 2024 &copy;
          </span>
          <a href="https://github.com/daviddev99">
            <FaGithub size={30} />
          </a>{" "}
          <a href="https://www.linkedin.com/in/davidabeddev/">
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
