import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // إضافة هذا السطر يضمن أن الموقع يبحث عن ملفاته في المسارات الصحيحة
  base: './', 
})
