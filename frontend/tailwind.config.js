/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
boxShadow: {
        custom: '8px 8px rgba(0, 0, 0)', // Custom shadow
      },
     fontFamily:{
      display:["'Baloo Thambi 2'","system-ui"]
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

