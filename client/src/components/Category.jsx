import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
const Category = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className=" my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center">
        {categories.map((category, index) => (
          <div
  key={index}
  className="group cursor-pointer 
             h-40 w-full
             flex flex-col items-center justify-center
             rounded-lg
             transition-all duration-300
             hover:shadow-lg"
  style={{ backgroundColor: category.bgColor }}
  onClick={() => {
    navigate(`/products/${category.path.toLowerCase()}`);
    scrollTo(0, 0);
  }}
>
  <img
    src={category.image}
    alt=""
    className="h-16 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
  />
  <p className="text-sm font-medium text-center">
    {category.text}
  </p>
</div>
        ))}
      </div>
    </div>
  );
};
export default Category;
