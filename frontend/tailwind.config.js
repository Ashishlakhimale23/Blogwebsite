/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.red[400]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.zinc[100]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-hr': theme('colors.zinc[700]'),
            '--tw-prose-th-borders': theme('colors.zinc[700]'),
            '--tw-prose-td-borders': theme('colors.zinc[800]'),
          },
        },
      }),
      screens: {
      'Header': '896px',
    },
        animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      keyframes: {
         shimmer: {
          '0%': {backgroundPosition: '100% 0'  },
          '100%': {backgroundPosition: '-100% 0'  },
        },
      },
boxShadow: {
        custom: '8px 8px rgba(0, 0, 0)', // Custom shadow
      },
     fontFamily:{
      display:["'Roboto'","sans-serif"]
     }, 
     colors:{
      "silver":"#c4c4c4"
     }}
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ]
  
}

