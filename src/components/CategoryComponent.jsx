import { useEffect, useState } from "react";
import { saveAllCategoryAction } from "../store/categorySlice";

// services
import CategoryService from "../services/CategoryService";

// redux
import { useDispatch, useSelector } from "react-redux";
import { saveSelectCategoryAction } from "../store/productSlice";

function CategoryComponent() {
  const [toggleCategory, setToggleCategory] = useState(false);

  const { allCategory, isLoading } = useSelector(
    (state) => state.categoryStore
  );
  const dispatch = useDispatch();
  useEffect(() => {
    CategoryService.getAllCategory()
      .then((res) => {
        dispatch(saveAllCategoryAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleToggleCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  return (
    <div className="bg-lightGray h-[100%] py-[20px] flex items-center ">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-[20px] h-full">
        <button
          className="bg-mainBlue text-textWhite px-[20px] py-[10px] rounded-lg"
          onClick={handleToggleCategory}
        >
          Show Category
        </button>
        {isLoading ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  2xl:grid-cols-6 gap-[8px] lg:gap-[5px]">
            {toggleCategory && (
              <>
                <li
                  className="w-[200px] bg-mainBlue text-textWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainOrange transition-all duration-500 cursor-pointer"
                  onClick={() => dispatch(saveSelectCategoryAction(""))}
                >
                  All Categories
                </li>
                {allCategory.map((cat, index) => {
                  return (
                    <li
                      key={index}
                      className="w-[200px] bg-mainBlue text-textWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainOrange transition-all duration-500 cursor-pointer"
                      onClick={() => dispatch(saveSelectCategoryAction(cat))}
                    >
                      {cat}
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        ) : (
          <div>Loading Category</div>
        )}
      </div>
    </div>
  );
}

export default CategoryComponent;
