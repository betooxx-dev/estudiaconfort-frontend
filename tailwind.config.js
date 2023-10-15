/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        entrada: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slide: {
          '0%': {
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
        rotacion: {
          '0%': {
            rotate: '0deg'
          },
          '100%': {
            rotate: '360deg'
          }
        },
        sombra:{
          '0%':{
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          },
          '40%':{
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
          },
          '100%':{
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }
        }
        
    },
      animation: {
        entrada: 'entrada 1s',
        slide: 'slide 2s',
        rotacion: 'rotacion 8s infinite linear',
        sombra: 'sombra 5s infinite ease'
      },
      colors: {
        rojo: '#d41935',
        azul: '#2780c4',
        'a-oscuro': '#041833',
      },
      backgroundImage: {
        degradado:
          'linear-gradient(90deg, rgba(20,88,145,1) 0%, rgba(0,134,173,1) 54%, rgba(0,160,232,1) 100%)',
        'dark-gradient': 'linear-gradient(215deg, rgba(69,69,69,1) 0%, rgba(47,47,47,1) 100%);',
        pattern:
          'linear-gradient(135deg, #444cf755 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #444cf7 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #444cf755 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #444cf7 25%, #e5e5f7 25%) 0px 0/ 20px 20px',
      },

    },
  },
  plugins: [],
}

