/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        // 绘本岛品牌色彩
        primary: {
          50: "#FFF5F0",
          100: "#FFE8D6",
          200: "#FFD4A3",
          300: "#FFB870",
          400: "#FF9C42",
          500: "#FF8C42", // 主色调 - 温暖橙色
          600: "#E67A3A",
          700: "#CC6A32",
          800: "#B35A2A",
          900: "#994A22",
        },
        secondary: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#87CEEB", // 天空蓝色
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        accent: {
          pink: "#FFB6C1", // 柔和粉色
          green: "#98FB98", // 清新绿色
          yellow: "#FFE4B5", // 温暖黄色
        },
      },
      fontFamily: {
        sans: ["PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "bounce-gentle": "bounce 2s infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
