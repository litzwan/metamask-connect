/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#353535',
                    200: '#444444',
                    300: '#4F55AB',
                    400: '#FFFFFF',
                    500: '#9B9B9B',
                    600: '#BE3144',
                    700: '#2E2E2E',
                }
            }
        },
    },
    plugins: [],
}

