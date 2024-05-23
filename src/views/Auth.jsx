import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div className="bg-[#F8F6F2] min-h-[calc(100vh-68px)] flex flex-col md:flex-col justify-center items-center">
        {/* 巢狀元件的指定渲染位置 */}
        <Outlet />
      </div>
    </>
  );
};

export default Auth;
