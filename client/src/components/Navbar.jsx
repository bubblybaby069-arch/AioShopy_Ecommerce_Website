import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">

      <Link to="/">
         {/* Logo */}
        <div className="h-14 flex items-center">
  <img
    src="/icon.png"
    alt="Logo"
    className="h-55 w-auto object-contain -my-5"
  />
</div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
        </div>

        {/* Cart Button (No SVG) */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer text-green-600 font-semibold"
        >
          Cart
          <button className="absolute -top-2 -right-4 text-xs text-white bg-green-600 w-[18px] h-[18px] rounded-full flex justify-center items-center">
            {cartCount()}
          </button>
        </div>

        {user ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="hidden group-hover:block absolute top-10 bg-white shadow border py-2 w-30 rounded-md text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 cursor-pointer"
              >
                My Orders
              </li>
              <li className="p-1.5 cursor-pointer" onClick={logout}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Right Side */}
      <div className="flex items-center gap-6 md:hidden">
        <div
          className="relative cursor-pointer text-green-600 font-semibold"
          onClick={() => navigate("/cart")}
        >
          Cart
          <button className="absolute -top-2 -right-4 text-xs text-white bg-green-600 w-[18px] h-[18px] rounded-full flex justify-center items-center">
            {cartCount()}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="sm:hidden text-green-700 font-bold">
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link onClick={() => setOpen(false)} to={"/"}>
          Home
        </Link>
        <Link onClick={() => setOpen(false)} to={"/products"}>
          Products
        </Link>

        {user ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="absolute top-10 bg-white shadow border py-2 w-30 rounded-md text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 cursor-pointer"
              >
                My Orders
              </li>
              <li
                className="p-1.5 cursor-pointer"
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
