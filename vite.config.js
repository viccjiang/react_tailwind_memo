import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // 部署時須設定 : 開發中、產品路徑
  base: process.env.NODE_ENV === "production" ? "/react_tailwind_memo/" : "/",
  plugins: [react()],
});
