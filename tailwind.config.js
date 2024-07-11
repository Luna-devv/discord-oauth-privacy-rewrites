/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                blurple: "rgb(84, 98, 240)"
            }
        }
    },
    plugins: []
};
