import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Add a new entry here for each case study page you create under projects/
const pages = {
  main:    path.resolve(__dirname, 'index.html'),
  viverra: path.resolve(__dirname, 'projects/viverra.html'),
  'TCC_Presentation': path.resolve(__dirname, 'projects/TCC_Presentation.html'),
  'Behance_Olympus_Project_BoardGame': path.resolve(__dirname, 'projects/Behance_Olympus_Project_BoardGame.html'),
  'behance_2project_Ostatu4niObrazi': path.resolve(__dirname, 'projects/behance_2project_Ostatu4niObrazi.html'),
  'behance_3project_KrajmoriePristanishte': path.resolve(__dirname, 'projects/behance_3project_KrajmoriePristanishte.html'),
  'Behance_DSK_Project': path.resolve(__dirname, 'projects/Behance_DSK_Project.html'),
  'Smart_Collagene_FIRST_PRESENTATION': path.resolve(__dirname, 'projects/Smart_Collagene_FIRST_PRESENTATION.html'),
};

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: pages,
    },
  },
});
