/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

function CardComponent({ product }) {
  return (
    <div className="w-[300px] border border-grayColor rounded-[20px] flex flex-col items-center justify-center">
      <div>
        <img
          src={product.thumbnail}
          alt=""
          className="w-full h-[200px] object-cover"
        />
      </div>
      <h3>{product.title}</h3>
      <h4>${product.price}</h4>
      <Rating name="read-only" value={product.rating} readOnly />
      <Link
        to={`/singleProduct/${product.id}`}
        className="bg-mainBlue text-textWhite px-[16px] py-[8px] rounded-lg my-[20px] hover:bg-mainOrange transition-all duration-300"
      >
        View More
      </Link>
    </div>
  );
}

export default CardComponent;
