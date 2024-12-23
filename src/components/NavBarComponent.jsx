import logo from "../assets/logo.png";

// clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";

// icons
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

// redux
import { useSelector } from "react-redux";

// router
import { Link } from "react-router-dom";

function NavBarComponent() {
  const [totalProductsLS, setTotalProductsLS] = useState(0);
  // let totalProducts = JSON.parse(localStorage.getItem("cart_total"));
  const { totalProducts } = useSelector((state) => state.cartStore);

  useEffect(() => {
    let lsTotal = JSON.parse(localStorage.getItem("cart_total"));
    if (lsTotal) {
      setTotalProductsLS(lsTotal);
    }
  }, [totalProducts]);
  return (
    <div className="bg-mainBlue h-full lg:h-[100px] flex items-center py-[10px]">
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row gap-[10px]">
        <Link to={"/"}>
          <img src={logo} alt="logo-image" />
        </Link>

        {/* search bar */}
        <div className="bg-textWhite rounded-[20px]">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-[25px] py-[17.5px] rounded-[20px] placeholder:text-mainOrange text-mainBlue "
          />
          <button className="bg-mainOrange text-textWhite px-[40px] py-[17.5px] rounded-[20px]">
            Search
          </button>
        </div>

        {/* LoginSystem & Cart / Favourites */}
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <CiUser color="white" size={25} />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiHeart color="white" size={25} />
            <span className="bg-mainOrange text-textWhite w-[20px] h-[20px] flex items-center justify-center rounded-full ">
              0
            </span>
            <span className="text-textWhite text-[18px]">Favourite</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiShoppingCart color="white" size={25} />
            <span className="bg-mainOrange text-textWhite w-[20px] h-[20px] flex items-center justify-center rounded-full ">
              {totalProductsLS}
            </span>
            <Link to="/cart" className="text-textWhite text-[18px]">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarComponent;
