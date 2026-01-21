// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     tailwindcss(),
//   ],
//   theme:{
//     fontFamily:{
//       display:["Poppins", "sans-serif"]
//     },
//     extend:{
//       colors:{
//         primary: "#05B6D3",
//         secondary: "#EF863E"
//       },
//       backgroundImage:{
//         'login-bg-img':"url('./src/assets/images/bg-image.png')",
//         'signup-bg-img':"url('./src/assets/images/signup-bg-img.png')",
//       }
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
