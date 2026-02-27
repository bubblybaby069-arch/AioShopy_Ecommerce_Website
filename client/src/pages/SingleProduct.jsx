import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";


const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // ✅ FIXED RELATED PRODUCTS
  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (item) =>
          item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, product]);

  // ✅ IMPORTANT SAFETY CHECK
  if (!product) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  return (
    <div className="mt-16">
      {/* Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category?.toLowerCase()}`}>
          {" "}
          {product.category}
        </Link>{" "}
        / <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product?.image?.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt=""
                />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            {thumbnail && (
              <img
                src={`http://localhost:5000/images/${thumbnail}`}
                alt="Selected"
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: ₹{product.price}
            </p>
            <p className="text-2xl font-medium">
              ₹{product.offerPrice}
            </p>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>

          <ul className="list-disc ml-4 text-gray-500/70">
            {product?.description?.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>


          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 bg-gray-100 hover:bg-gray-200"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <p className="text-2xl font-medium">Related Products</p>

        <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts
            ?.filter((item) => item.inStock)
            ?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
