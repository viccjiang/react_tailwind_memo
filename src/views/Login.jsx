import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // hook

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
    console.log(token);
    // 把 token 存到 cookie
    document.cookie = `token=${token};`;

    // 避免連續點擊登入按鈕導致重複登入
    setIsLoading(false);

    // navigate("/auth/login"); // 當登入成功，轉址到 todo 頁
    navigate("/todo");
  }

  return (
    <>
      Login
      <form action="">
        {JSON.stringify(formData)} <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={HandleChange}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={HandleChange}
        />{" "}
        <br />
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            login();
          }}
        >
          登入
        </button>
      </form>
    </>
  );
}

export default Login;
