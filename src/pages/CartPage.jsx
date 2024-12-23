// material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// redux
// import { useSelector } from "react-redux";

// icons
import { RxCross1 } from "react-icons/rx";

function CartPage() {
  let cart = JSON.parse(localStorage.getItem("cart_item"));
  // const { cart } = useSelector((state) => state.cartStore);

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
              {cart.map((product) => (
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
                      <button className="px-[8px] py-[4px] bg-slate-300 text-[18px] ">
                        -
                      </button>
                      <span className="px-[8px] py-[4px] bg-slate-300 text-[18px]">
                        {product.count}
                      </span>
                      <button className="px-[8px] py-[4px] bg-slate-300 text-[18px]">
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">${product.cartTotal}</TableCell>
                  <TableCell align="right">
                    <button className="text-red-500">
                      <RxCross1 size={24} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full lg:w-[30%]">
          <h2>Cart Total</h2>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
