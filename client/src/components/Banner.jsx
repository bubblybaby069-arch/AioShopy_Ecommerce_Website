import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const banners = [
    {
      image: assets.banner1,
      title: "Everything You Need, All in One Place.",
    },
    {
      image: assets.banner2,
      title: "Fresh Groceries Delivered Fast.",
    },
    {
      image: assets.banner3,
      title: "Latest Electronics at Best Prices.",
    },
    {
      image: assets.banner4,
      title: "Trendy Fashion for Every Style.",
    },
    {
      image: assets.banner5,
      title: "Shop Smart. Save More. Live Better.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
  <div className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] overflow-hidden">
    
    {/* Images */}
    {banners.map((item, index) => (
      <img
        key={index}
        src={item.image}
        alt="banner"
        className={`absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-700 ${
          index === current ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Content */}
    <div className="relative z-10 flex flex-col justify-center items-center md:items-start h-full px-6 md:px-16">
      
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center md:text-left max-w-xs sm:max-w-md leading-tight">
        {banners[current].title}
      </h1>

      <div className="flex items-center mt-6 gap-4">
        <Link
          to="/products"
          className="px-6 py-2 sm:px-7 sm:py-3 rounded bg-primary text-white hover:scale-105 transition"
        >
          Shop Now
        </Link>

        <Link
          to="/products"
          className="hidden sm:flex px-6 py-2 sm:px-7 sm:py-3 rounded bg-white text-black hover:scale-105 transition"
        >
          Explore Deals
        </Link>
      </div>

    </div>
  </div>
);
};

export default Banner;