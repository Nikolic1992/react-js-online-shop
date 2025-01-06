import { useEffect, useRef, useState } from "react";

// material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCartAction,
  setPriceHandlerAction,
} from "../store/cartSlice";

// icons
import { RxCross1 } from "react-icons/rx";

function CartPage() {
  const [cartData, setCartData] = useState([]);
  const [activeCoupon, setActiveCoupon] = useState("");
  const couponRef = useRef();
  const { cart, totalPrice } = useSelector((state) => state.cartStore);

  const dispatch = useDispatch();

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cart_item")));
  }, [cart]);

  function handleRemoveProduct(product) {
    dispatch(deleteFromCartAction(product));
  }

  function handleApplyCoupon() {
    setActiveCoupon(couponRef.current.value);

    couponRef.current.value = "";
  }

  return (
    <div className="mt-[50px]">
      <div className="container mx-auto flex flex-col lg:flex-row gap-[20px]">
        <TableContainer component={Paper} className="w-full lg:w-[70%]">
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead
              className="bg-mainBlue"
              sx={{ "& .MuiTableCell-root": { color: "white" } }}
            >
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartData.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-[100px] h-[100px] border border-mainBlue rounded-lg"
                    />
                  </TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-[2px]">
                      <button
                        className="px-[8px] py-[4px] bg-slate-300 text-[18px] "
                        onClick={() =>
                          dispatch(
                            setPriceHandlerAction({
                              index,
                              increment: -1,
                              product,
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <span className="px-[8px] py-[4px] bg-slate-300 text-[18px]">
                        {product.count}
                      </span>
                      <button
                        className="px-[8px] py-[4px] bg-slate-300 text-[18px]"
                        onClick={() => {
                          if (product.count < product.stock) {
                            dispatch(
                              setPriceHandlerAction({
                                index,
                                increment: 1,
                                product,
                              })
                            );
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    ${Math.floor(product.cartTotal)}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveProduct(product)}
                    >
                      <RxCross1 size={24} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full lg:w-[30%]">
          <h2 className="text-textWhite bg-mainBlue py-[17px] text-center rounded-md">
            CART TOTAL
          </h2>
          <span className="text-center text-[28px] font-extrabold">
            Total price: $
            {activeCoupon === "discount" ? totalPrice / 2 : totalPrice}
          </span>
          <div className="flex flex-col gap-[5px]">
            <input
              ref={couponRef}
              type="text"
              placeholder="Insert coupon"
              className="p-[10px] border border-grayColor rounded-lg placeholder:text-mainBlue outline-none mt-[25px] "
            />
            <span className="text-[13px] text-grayColor">
              Insert coupon for 50% discount
            </span>
            <button
              className={
                activeCoupon === "discount"
                  ? "bg-grayColor text-black hover:bg-gray-500 px-[16px] py-[8px] rounded-lg transition-all duration-300 cursor-pointer mt-[30px]"
                  : "bg-mainBlue hover:bg-mainOrange text-textWhite px-[16px] py-[8px] rounded-lg transition-all duration-300 cursor-pointer mt-[30px]"
              }
              onClick={handleApplyCoupon}
              disabled={activeCoupon === "discount"}
            >
              {activeCoupon === "discount" ? "Coupon applied" : "Apply Coupon"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
