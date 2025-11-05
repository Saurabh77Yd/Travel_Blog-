import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  theme:{
    fontFamily:{
      display:["Poppins", "sans-serif"]
    },
    extend:{
      colors:{
        primary: "#05B6D3",
        secondary: "#EF863E"
      }
    }
  }
})
