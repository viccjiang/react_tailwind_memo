import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Auth from "./views/Auth";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Todo from "./views/Todo";
import NotFound from "./views/NotFound";
import DrinkMenu from "./views/DrinkMenu";

function App() {
  // 設定 NavLink 的樣式
  const style = ({ isActive }) => {
    return {
      color: isActive ? "red" : null, // 如果 isActive 為 true，就設定為紅色，也可以寫成 isActive && "red"
    };
  };

  return (
    <>
      <nav>
        導覽列
        {/* a 連結 */}
        <NavLink to="/" style={style}>
          首頁
        </NavLink>{" "}
        |
        <NavLink to="/about" style={style}>
          About
        </NavLink>{" "}
        |
        <NavLink to="/auth/sign_up" style={style}>
          註冊
        </NavLink>{" "}
        |
        <NavLink to="/auth/login" style={style}>
          登入
        </NavLink>{" "}
        |
        <NavLink to="/todo" style={style}>
          Todo
        </NavLink>
        |
        <NavLink to="/drink" style={style}>
          餐點管理工具
        </NavLink>
      </nav>
      <Routes>
        {/* 路由表 */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* 巢狀路由 */}
        {/* /auth 共用版型 */}
        {/* /auth/sign_up */}
        {/* /auth/sign_in */}
        {/* 須注意這裡的 Route 是包頭尾的 ，不是自閉合 */}
        <Route path="/auth" element={<Auth />}>
          {/* 內層不用加斜線 ，必須要再去 Auth 元件加 oulet */}
          <Route path="sign_up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/todo" element={<Todo />} />
        <Route path="/drink" element={<DrinkMenu />} />
        {/* 404 not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
