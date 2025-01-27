// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradent-white": "linear-gradient(90deg, rgba(245, 246, 250, 0) 0%, #F5F6FA 58.67%)"
//       },
//       // colors
//       colors: {
//         app: {
//           blue: {
//             1: "#4D49F6"
//           },
//           grey: {
//             1: "#A2A2A2",
//             2: "#F5F6FA",
//             3: "#D5D5D5",
//             4: "#404040"
//           },
//           // orange: {
//           //   1: "#FE5E009C"
//           // }
//           black: {
//             1: "#202224"
//           }
//         }
//       },
      
//       // shadow
//       boxShadow: {
//         'custom': '-8px 0px 43.4px 0px #00000040', // Add your custom shadow,
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Background images
      backgroundImage: {
        "gradient-white": "linear-gradient(90deg, rgba(245, 246, 250, 0) 0%, #F5F6FA 58.67%)",
      },
      // Colors
      colors: {
        app: {
          blue: {
            1: "#4D49F6",
          },
          grey: {
            1: "#A2A2A2",
            2: "#F5F6FA",
            3: "#D5D5D5",
            4: "#404040",
          },
          black: {
            1: "#202224",
          },
        },
      },
      // Animations
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      // Shadows
      boxShadow: {
        custom: "-8px 0px 43.4px 0px #00000040", // Custom shadow
      },
    },
  },
  plugins: [],
};
