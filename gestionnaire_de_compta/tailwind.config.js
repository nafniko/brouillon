// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["fantasy"], // 👈 ici tu choisis le thème que tu veux
    },
  }
  