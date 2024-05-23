import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom"; // hook

const { VITE_APP_HOST } = import.meta.env;

function Login() {
  const navigate = useNavigate(); // 把 hook 取出來做使用

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 讀取、狀態
  const [isLoading, setIsLoading] = useState(false);

  function HandleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function login() {
    // post 路徑, 資料, headers
    // get 路徑, headers

    // 避免連續點擊登入按鈕導致重複登入
    setIsLoading(true);

    const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData);
    const { token } = res.data;

    // 把 token 存到 cookie
    document.cookie = `token=${token};`;

    // 避免連續點擊登入按鈕導致重複登入
    setIsLoading(false);

    // navigate("/auth/login"); // 當登入成功，轉址到 todo 頁
    navigate("/");
  }

  return (
    <>
      <div className="container ">
        <h1 className="text-center text-3xl font-mono font-bold mb-10 text-brown-dark">
          請先登入
        </h1>
        <div className=" flex justify-center ">
          <form action="">
            {/* {JSON.stringify(formData)} */}
            <div className="w-full md:w-[500px] border-2 rounded-2xl p-10 bg-brown-100">
              <input
                className="border p-2 rounded-lg w-full mt-4 "
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                onChange={HandleChange}
              />

              <input
                className="border p-2 rounded-lg w-full mt-4 "
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                onChange={HandleChange}
              />
              <button
                className="mt-4 border p-2 rounded-lg bg-primary text-white w-full hover:bg-brown-dark hover:transition-all duration-300"
                type="button"
                disabled={isLoading}
                onClick={() => {
                  login();
                }}
              >
                登入
              </button>
            </div>
            <div className="mt-10 text-right">
              沒有帳號 ?
              <NavLink to="/auth/sign_up" className="underline">
                前往註冊
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
