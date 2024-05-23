import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

import Menu from "./Menu";
import Cart from "./Cart";

const drinkMenu = [
  {
    id: 1,
    name: "珍珠奶茶",
    content: "香濃奶茶搭配QQ珍珠",
    price: 50,
    qty: 20,
  },
  {
    id: 2,
    name: "冬瓜檸檬",
    content: "清新冬瓜配上新鮮檸檬",
    price: 45,
    qty: 15,
  },
  {
    id: 3,
    name: "翡翠檸檬",
    content: "綠茶與檸檬的完美結合",
    price: 55,
    qty: 30,
  },
  {
    id: 4,
    name: "四季春茶",
    content: "香醇四季春茶，回甘無比",
    price: 45,
    qty: 10,
  },
  {
    id: 5,
    name: "阿薩姆奶茶",
    content: "阿薩姆紅茶搭配香醇鮮奶",
    price: 50,
    qty: 25,
  },
  {
    id: 6,
    name: "檸檬冰茶",
    content: "檸檬與冰茶的清新組合",
    price: 45,
    qty: 20,
  },
  {
    id: 7,
    name: "芒果綠茶",
    content: "芒果與綠茶的獨特風味",
    price: 55,
    qty: 18,
  },
  {
    id: 8,
    name: "抹茶拿鐵",
    content: "抹茶與鮮奶的絕配",
    price: 60,
    qty: 20,
  },
  {
    id: 9,
    name: "蘋果冰茶",
    content: "蘋果與冰茶的清新組合",
    price: 45,
    qty: 20,
  },
];

const OrderMenu = () => {
  const navigate = useNavigate();
  const [menu] = useState(drinkMenu); // 原始 menu
  const [cart, setCart] = useState([]); // 購物車

  const addCart = (item) => {
    console.log(item);

    // 判斷購物車是否已經有該商品
    const conformIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (conformIndex === -1) {
      // 購物車沒有該商品
      setCart([
        ...cart,
        {
          ...item,
          qty: 1,
        },
      ]);
    } else {
      // 購物車已經有該商品
      const tempCart = cart.map((cartItem) => {
        return item.id === cartItem.id
          ? {
              ...cartItem,
              qty: cartItem.qty < 10 ? cartItem.qty + 1 : cartItem.qty,
            }
          : { ...cartItem };
      });
      setCart(tempCart);
    }
  };

  const deleteCartItem = (id) => {
    const tempCart = cart.filter((item) => item.id !== id);
    setCart(tempCart);
  };

  const updateCart = (item, qty) => {
    const tempCart = cart.map((cartItem) => {
      return item.id === cartItem.id
        ? { ...cartItem, qty: +qty }
        : { ...cartItem };
    });
    setCart(tempCart);
  };

  useEffect(() => {
    // 從 login 頁存到 cookie 的 token
    // 抵達 todo 頁時，取得 Cookie 的 token
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // 後續發出請求不用再帶 headers Auth~~~ ，預設 axios 的表頭，帶上 token，就不需要每次發出請求再帶上 headers
    axios.defaults.headers.common["Authorization"] = cookieValue;

    // 驗證登入
    axios
      .get(`${VITE_APP_HOST}/users/checkout`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("登入失敗啦", err);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1000);
      });

    // getTodos();
  }, []);

  return (
    <>
      <div className="bg-[#F8F6F2] min-h-screen">
        <div className="container py-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <Menu menu={menu} addCart={addCart} />
            <Cart
              cart={cart}
              setCart={setCart}
              deleteCartItem={deleteCartItem}
              updateCart={updateCart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderMenu;
