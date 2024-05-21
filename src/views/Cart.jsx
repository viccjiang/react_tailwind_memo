import { FaTrashAlt } from "react-icons/fa";
const Cart = ({ cart, deleteCartItem, updateCart }) => {
  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold text-primary">購物車清單</h2>
        <hr className="mt-2 mb-4" />
        {cart.length === 0 ? (
          <div className="rounded-lg border-brown-light p-4 text-center text-brown font-bold">
            購物車是空的
          </div>
        ) : (
          <>
            <div className="">
              <ul className="flex flex-wrap -mx-3">
                {cart.map((item) => {
                  return (
                    <li key={item.id} className="w-full p-3 ">
                      <div className="p-4 rounded-lg border  border-2 flex justify-between hover:bg-brown-100">
                        <div>
                          <h3 className="text-lg font-bold text-primary">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {item.content}
                          </p>
                          <p className="text-lg text-primary mt-2">
                            NT$ {item.price}
                          </p>
                          {/* <p className="text-lg text-primary mt-2">
                            數量：{item.qty}
                          </p> */}
                          <select
                            name=""
                            id=""
                            className="w-1/2 border-0 rounded-md text-center bg-brown-100 focus:outline-none focus:border-brown-dark"
                            value={item.qty}
                            onChange={(e) => updateCart(item, e.target.value)}
                          >
                            {[...Array(10).keys()].map((item) => {
                              return (
                                <option value={item + 1} key={item}>
                                  {item + 1}
                                </option>
                              );
                            })}
                          </select>
                          <div className="flex">
                            <div>單價 {item.price}</div>
                            <div>
                              <div>小計 {item.price * item.qty}</div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <button
                            type="button"
                            className="text-red-400"
                            onClick={() => deleteCartItem(item.id)}
                          >
                            <FaTrashAlt className="inline-block" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
