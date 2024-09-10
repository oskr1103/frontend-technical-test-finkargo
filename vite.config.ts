import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/tailwind.config.js',
        'src/.eslintrc.js',
        'src/setupTests.ts',
        '**/*.test.{ts,tsx}',
        'src/main.tsx'
      ],
    },
  },
});