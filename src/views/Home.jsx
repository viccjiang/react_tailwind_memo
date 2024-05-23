import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // hook
import axios from "axios";

const { VITE_APP_HOST } = import.meta.env;

function Home() {
  const navigate = useNavigate(); // 把 hook 取出來做使用
  // 登出
  const signOut = async () => {
    console.log("signOut");
    // 清除 cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const res = await axios.post(`${VITE_APP_HOST}/users/sign_out`);
    console.log(res);
    // 登出後轉址到首頁，重新登入
    navigate("/");
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
          navigate("/");
        }, 1000);
      });
  }, []);

  return (
    <>
      <div className="bg-[#F8F6F2] min-h-[calc(100vh-68px)] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4 ">
          <p className="text-6xl font-bold text-center">個人管理系統</p>

          {/* 判斷若是登入就隱藏註冊，反之顯示登出 */}
          {document.cookie.includes("token") ? (
            <button
              onClick={() => signOut()}
              className="mt-4 border py-2 px-3 rounded-lg bg-primary text-white w-full hover:bg-brown-dark hover:transition-all duration-300"
            >
              登出
            </button>
          ) : (
            <NavLink to="/auth/sign_up">
              <button className="mt-4 border py-2 px-3 rounded-lg bg-primary text-white w-full hover:bg-brown-dark hover:transition-all duration-300">
                立即前往註冊
              </button>
            </NavLink>
          )}

          {/* 前往登入 */}

          {/* 前往註冊 */}
          {/* <NavLink to="/auth/sign_up">
            <button className="mt-4 border py-2 px-3 rounded-lg bg-primary text-white w-full hover:bg-brown-dark hover:transition-all duration-300">
              立即前往註冊
            </button>
          </NavLink>
          <NavLink>
            <button className="mt-4 border py-2 px-3 rounded-lg bg-primary text-white w-full hover:bg-brown-dark hover:transition-all duration-300">
              登出
            </button>
          </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default Home;
