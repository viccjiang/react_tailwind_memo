import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // hook

const { VITE_APP_HOST } = import.meta.env;

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
      ...formData,
      [name]: value,
    });
  }

  async function signup() {
    // post 路徑, 資料, headers
    // get 路徑, headers
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData);
      console.log(res);
      navigate("/auth/login"); // 當登入成功，轉址到登入頁
    } catch (error) {
      console.log(error.response.data.message);
      navigate("/"); // 當登入失敗，轉址到首頁
    }
  }

  return (
    <>
      註冊
      <form action="">
        {/* {JSON.stringify(formData)} */}
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
        <input
          type="text"
          placeholder="nickname"
          name="nickname"
          onChange={HandleChange}
        />{" "}
        <br />
        <button
          type="button"
          onClick={(e) => {
            console.log(e);
            signup();
          }}
        >
          註冊
        </button>
      </form>
    </>
  );
};

export default SignUp;
