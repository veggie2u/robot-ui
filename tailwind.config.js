/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
    darkMode: 'class',
    theme: {
        extend: {
            // that is animation class
            animation: {
                fadeOut: 'fadeOut .5s ease-in-out forwards',
                fadeIn: 'fadeIn .5s ease-in-out forwards',
            },

            // that is actual animation
            keyframes: (theme) => ({
                fadeOut: {
                    '0%': { color: theme('colors.white') },
                    '100%': { color: theme('colors.transparent') },
                },
                fadeIn: {
                    '0%': { color: theme('colors.transparent') },
                    '100%': { color: theme('colors.white') },
                },
            }),
        },
    },
    plugins: [],
}
