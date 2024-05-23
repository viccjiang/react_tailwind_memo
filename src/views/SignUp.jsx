import { useState } from "react";
import { useNavigate } from "react-router-dom"; // hook
import { NavLink } from "react-router-dom";
import axios from "axios";

const { VITE_APP_HOST } = import.meta.env;

// 註冊頁面
const SignUp = () => {
  const navigate = useNavigate(); // 把 hook 取出來做使用

  // 定義狀態
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  function HandleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData, // 先把原本的資料展開
      [name]: value,
    });
  }

  async function signup() {
    // post 路徑, 資料, headers
    // get 路徑, headers
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData);
      console.log(res);
      navigate("/auth/login"); // 當登入成功，轉址到登入頁，重新登入 (登入才有 token)
    } catch (error) {
      console.log(error.response.data.message);
      navigate("/"); // 當登入失敗，轉址到首頁
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center text-3xl font-mono font-bold mb-10 text-brown-dark">
          請先註冊
        </h1>
        <div className=" flex justify-center">
          <form action="">
            {/* {JSON.stringify(formData)} */}
            <div className="w-full md:w-[500px] border-2 rounded-2xl p-10 bg-brown-100">
              <input
                className="border p-2 rounded-lg w-full mt-4 "
                type="email"
                placeholder="Email"
                name="email" // 這裡的 name 要對應到 formData 的 key
                onChange={HandleChange}
              />

              <input
                className="border p-2 rounded-lg w-full mt-4 "
                type="password"
                placeholder="Password"
                name="password"
                onChange={HandleChange}
              />

              <input
                className="border p-2 rounded-lg w-full mt-4 "
                type="text"
                placeholder="nickname"
                name="nickname"
                onChange={HandleChange}
              />

              <button
                className="mt-4 border p-2 rounded-lg bg-primary text-white w-full hover:bg-brown-dark hover:transition-all duration-300"
                type="button"
                onClick={(e) => {
                  console.log(e);
                  signup();
                }}
              >
                註冊
              </button>
            </div>
            <div className="mt-10 text-right">
              已經有帳號了嗎？
              <NavLink to="/auth/login" className="underline">
                前往登入
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
