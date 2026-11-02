import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'rolldown-vite';

export default defineConfig({
  plugins: [react()],
});
