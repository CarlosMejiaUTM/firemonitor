import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'tailwindcss'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/firemonitor/',
  plugins: [react(),tailwindcss()],
});